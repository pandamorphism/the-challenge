package com.plummtech
package domain
// todo: uuid for id? tagged unions for role and refinements for email
case class User(id: Int, email: String, role: String)

case class TranslationEvent(id: Long, userId: Int, number: Long, result: String)
