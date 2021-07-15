package com.plummtech
package service

import akka.actor.{ActorSystem, Props}
import akka.testkit.{ImplicitSender, TestKit}
import org.scalatest.BeforeAndAfterAll
import org.scalatest.matchers.should.Matchers
import org.scalatest.wordspec.AnyWordSpecLike

class EnglishTranslationEngineSpec()
  extends TestKit(ActorSystem("EnglishTranslationEngineSpec"))
    with ImplicitSender
    with AnyWordSpecLike
    with Matchers
    with BeforeAndAfterAll {
  override def afterAll(): Unit = {
    TestKit.shutdownActorSystem(system)
  }

  "An EnglishTranslationEngine" should {
    "translate simple number" in {
      val englishTranslationEngine = system.actorOf(Props[EnglishTranslationEngine])
      englishTranslationEngine ! "1"
      expectMsg[String]("One")
    }

    "translate number with multiple zeros in the middle" in {
      val englishTranslationEngine = system.actorOf(Props[EnglishTranslationEngine])
      englishTranslationEngine ! "1000001"
      expectMsg[String]("One million one")
      englishTranslationEngine ! "1000042001"
      expectMsg[String]("One billion forty two thousand one")
    }
  }

}

object EnglishTranslationEngineSpec {

}
