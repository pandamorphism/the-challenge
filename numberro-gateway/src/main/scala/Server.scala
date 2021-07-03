package com.plummtech

import persistence.NumberroPersistence
import service.EnglishTranslationEngine

import akka.actor.{ActorSystem, Props}
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.pattern.ask
import akka.util.Timeout

import scala.concurrent.Future
import scala.concurrent.duration.DurationInt
import scala.language.postfixOps

object Server extends App {
  implicit val actorSystem: ActorSystem = ActorSystem("GatewayServer")
  implicit val timeout: Timeout = Timeout(2 seconds)

  import actorSystem.dispatcher

  val persistentActor = actorSystem.actorOf(Props[NumberroPersistence], "numberro-persistence-actor")
  val translationEngine = actorSystem.actorOf(Props[EnglishTranslationEngine], "interpreter-actor")
  val port = 8083

  val routes: Route = pathPrefix("api" / "interpreter") {
    get {
      (path(LongNumber) | parameter(Symbol("number").as[Long])) { number =>
        complete(for {
          result <- (translationEngine ? number).mapTo[String]
        } yield {
          toHttpEntity(result)
        }
        )
      }
    }
  }
  val bindingFuture: Future[Http.ServerBinding] = Http().newServerAt("localhost", port).bind(routes)

  def toHttpEntity(payload: String): HttpEntity.Strict = HttpEntity(ContentTypes.`application/json`, payload)

  println(s"Server online at http://localhost:$port")
  //  StdIn.readLine()
  //  bindingFuture.flatMap(_.unbind())
  //    .onComplete(_ => actorSystem.terminate())
}
