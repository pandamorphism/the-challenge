package com.plummtech
package domain

import java.util.Date

object Interpretation {
  // domain (also dto for now)
  case class InterpretedEvent(id: Long, userId: Int, number: Long, interpretation: String, timestamp: Date)

  // commands
  case class StoreInterpretation(userId: Int, number: Long, interpretation: String)

  object GetHistory
}
