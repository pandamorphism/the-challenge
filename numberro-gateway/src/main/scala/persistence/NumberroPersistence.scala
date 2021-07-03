package com.plummtech
package persistence

import domain.Interpretation.{GetHistory, InterpretedEvent, StoreInterpretation}

import akka.actor.ActorLogging
import akka.persistence.{PersistentActor, RecoveryCompleted}

import java.util.Date

class NumberroPersistence extends PersistentActor with ActorLogging {
  var history: List[InterpretedEvent] = List()
  var latestInterpretationEventId = 0

  override def receiveRecover: Receive = {
    case (event: InterpretedEvent) =>
      log.info(s"Recovered: $event")
      history = event :: history
      latestInterpretationEventId = latestInterpretationEventId + 1
    case RecoveryCompleted => log.info("Recovery Done!")
  }

  override def receiveCommand: Receive = {
    case GetHistory =>
      sender() ! history
    case (command: StoreInterpretation) =>
      val event = InterpretedEvent(
        id = latestInterpretationEventId,
        userId = command.userId,
        number = command.number,
        interpretation = command.interpretation,
        timestamp = new Date()
      )
      persist(event) { persisted =>
        latestInterpretationEventId = latestInterpretationEventId + 1
        history = persisted :: history
        log.info(s"persisted: $persisted")
        sender() ! persisted
      }
  }

  override def persistenceId: String = "number-translations"
}
