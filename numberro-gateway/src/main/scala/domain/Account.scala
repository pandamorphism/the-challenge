package com.plummtech
package domain

object Account {
  // todo: uuid for id? tagged unions for role and refinements for email
  case class User(id: Int, email: String, role: String)
}
