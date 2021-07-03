package com.plummtech
package persistence

import akka.actor.ActorLogging
import akka.persistence.{PersistentActor, RecoveryCompleted}

class NumberroPersistence extends PersistentActor with ActorLogging {
  override def receiveRecover: Receive = {
    case RecoveryCompleted => log.info("Recovery Done!")
  }

  override def receiveCommand: Receive = {
    case message =>
      persist(message) { _ =>
        log.info(s"Message persisted $message")
      }
  }

  override def persistenceId: String = "number-translations"
}
