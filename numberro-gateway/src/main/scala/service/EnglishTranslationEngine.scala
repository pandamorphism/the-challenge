package com.plummtech
package service

import akka.actor.{Actor, ActorLogging}

import scala.annotation.tailrec

object EnglishTranslationEngine {
  val dictionary: Map[String, List[String]] = Map(
    "single" -> List("zero", "one", "two", "three", "four", "five", "six",
      "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
      "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"),
    "tens" -> List("", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"),
    "tokens" -> List("", "thousand", "million", "billion", "trillion", "quadrillion",
      "quintillion", "sextillion", "septillion", "octillion", "nonillion",
      "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion",
      "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion"),
  )

  /**
   *
   * @param numberParts - number splatted by size of 3
   * @param iteration   - initial iteration
   * @param result      - accumulator
   * @return - tokens in form of: Example: 1 345 089 => List((million,1), (thousand,345), (,089))
   */
  @tailrec
  def tokenize(numberParts: List[String], iteration: Int = 0, result: List[(String, String)]): List[(String, String)] =
    numberParts match {
      case Nil => result
      case (head: String) :: (tail: List[String]) =>
        val entry = dictionary("tokens")(iteration)
        tokenize(tail, iteration + 1, (entry -> interpret_LT_Thousand(head)) :: result)
    }

  def interpret_LT_Thousand(group: String, skipZero: Boolean = false): String = {
    println()
    group.length match {
      case 1 =>
        if (skipZero && group.toInt == 0) "" else dictionary("single")(group.toInt) // from 0 to 9
      case 2 =>
        val num = group.toInt;
        if (num < 20 && num > 0) dictionary("single")(group.toInt)
        else dictionary("tens")((num - num % 10) / 10) + " " + interpret_LT_Thousand(group.tail, skipZero = true)
      case 3 =>
        val head = group.head
        if (group.head == '0') interpret_LT_Thousand(group.tail)
        else interpret_LT_Thousand(head.toString) + s" ${pluralize(head, "hundred")} " + interpret_LT_Thousand(group.tail)

    }
  }

  def pluralize(num: Char, token: String): String = if (num == '1') token else s"${token}s"

  def pluralizeToken(num: String, token: String): String =
    if (token.isEmpty || dictionary("single")(1) == num) token else s"${token}s"
}


class EnglishTranslationEngine extends Actor with ActorLogging {

  import EnglishTranslationEngine._

  override def receive: Receive = {
    case (num: Long) =>
      log.info(s"translating... $num")
      val tokens = tokenize(num.toString.reverse.split("(?<=\\G...)").toList.map(_.reverse), 0, List())
      sender() ! (tokens.foldLeft("") { (acc, pair) => acc + " " + pair._2 + " " + pluralizeToken(pair._2, pair._1) }).trim
  }
}

/**
 * million(5 (thousand(123 hundred(3(ten(4(single(5))))) =>
 *
 *
 * ...
 * |
 * Millions (5)
 * |
 * Thousand(123)
 * |
 * Hundred(3) -> ten(4) -> single(5)
 */
