package com.plummtech

import domain.Account.User
import domain.Interpretation._
import persistence.NumberroPersistence
import service.EnglishTranslationEngine

import akka.actor.{ActorSystem, Props}
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.pattern.ask
import akka.util.Timeout
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

import scala.concurrent.Future
import scala.concurrent.duration.DurationInt
import scala.language.postfixOps

trait InterpretationJsonProtocol extends DefaultJsonProtocol {

  import com.plummtech.misc.DateMarshalling._

  implicit val storedInterpretationFormat: RootJsonFormat[InterpretedEvent] = jsonFormat5(InterpretedEvent)
}

object Server extends App with InterpretationJsonProtocol with SprayJsonSupport {
  implicit val actorSystem: ActorSystem = ActorSystem("GatewayServer")
  implicit val timeout: Timeout = Timeout(2 seconds)

  import actorSystem.dispatcher

  // TODO: authorization module
  val defaultUser = User(id = 27, email = "guest@gmail.com", role = "guest")

  val persistentActor = actorSystem.actorOf(Props[NumberroPersistence], "numberro-persistence-actor")
  val translationEngine = actorSystem.actorOf(Props[EnglishTranslationEngine], "interpreter-actor")
  val port = 8080

  val routes: Route = pathPrefix("api" / "interpreter") {
    get {
      (parameter(Symbol("number").as[String])) { number =>
        complete(for {
          interpretation <- (translationEngine ? number).mapTo[String]
          storedEvent <- (
            persistentActor ? StoreInterpretation(userId = defaultUser.id, number = number, interpretation = interpretation)
            ).mapTo[InterpretedEvent]
        } yield storedEvent)
      } ~
        path("history") {
          pathEndOrSingleSlash {
            complete(for {
              history <- (persistentActor ? GetHistory).mapTo[List[InterpretedEvent]]
            } yield history)
          }
        }
    }
  }
  val bindingFuture: Future[Http.ServerBinding] = Http().newServerAt("localhost", port).bind(routes)

  def toHttpEntity(payload: String): HttpEntity.Strict = HttpEntity(ContentTypes.`application/json`, payload)

  println(s"Server online at http://localhost:$port")
}
