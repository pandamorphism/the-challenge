import com.typesafe.sbt.packager.docker.Cmd

enablePlugins(JavaAppPackaging, DockerPlugin)
name := "numberro-gateway"

version := "0.1"

scalaVersion := "2.13.6"
//mappings in Universal := {
//  (mappings in Universal).value :+
//    (file(s"${baseDirectory.value}/database/scripts/a.sql") -> "scripts/a.sql")
//}
//dockerCommands := Seq(
//  Cmd("FROM", "postgres:latest"),
//  Cmd("EXPOSE", "5432"),
//  Cmd("COPY", "/opt/docker/scripts/a.sql", "/docker-entrypoint-initdb.d")
//)
packageName in Docker := "plammtech/numberro-gateway"
dockerBaseImage := "adoptopenjdk:11-jre-hotspot"
dockerUpdateLatest := true

idePackagePrefix := Some("com.plummtech")
val AkkaVersion = "2.6.8"
val AkkaHttpVersion = "10.2.4"
val SlickVersion = "3.3.3"
val postgresVersion = "42.2.2"
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-stream" % AkkaVersion,
  "com.typesafe.akka" %% "akka-persistence-typed" % AkkaVersion,
  "com.typesafe.akka" %% "akka-http" % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % AkkaHttpVersion,
  "ch.qos.logback" % "logback-classic" % "1.2.3",
  "org.postgresql" % "postgresql" % postgresVersion,
  "com.typesafe.akka" %% "akka-persistence" % AkkaVersion,
  "com.typesafe.akka" %% "akka-persistence-query" % AkkaVersion,
  "com.typesafe.akka" %% "akka-cluster-tools" % AkkaVersion,
  "com.lightbend.akka" %% "akka-persistence-jdbc" % "4.0.0",
  "com.typesafe.slick" %% "slick" % SlickVersion,
  "com.typesafe.slick" %% "slick-hikaricp" % SlickVersion
)