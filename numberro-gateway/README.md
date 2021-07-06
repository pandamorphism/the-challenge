# Numberro Gateway

## Web

The Web Server is based on Akka HTTP. The Akka HTTP modules implement a full server- and client-side HTTP stack on top
of akka-actor and akka-stream.

## Persistence

Persistence layer of the app is based on Akka Persistence module. Akka Persistence enables stateful actors to persist
their state so that it can be recovered when an actor is either restarted, such as after a JVM crash, by a supervisor or
a manual stop-start, or migrated within a cluster. The key concept behind Akka Persistence is that only the events that
are persisted by the actor are stored, not the actual state of the actor (though actor state snapshot support is also
available). The events are persisted by appending to storage (nothing is ever mutated) which allows for very high
transaction rates and efficient replication. For Journal Postgres was chosen.

## Setup

- Postgres:
    - First option: install server manually, and override connection settings in 'resources/application.conf'. Then
      setup tables from `database/scripts/a.sql` script.
    - Or (preferred) option: run docker-compose.yml (Docker must be installed)

- Run Web server:
    - Postgres should be started
    - *[Java SDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)* must be installed
    - *[Scala Build Tool (sbt)](https://www.scala-sbt.org/download.html)* must be installed
    - from the root of the project execute `sbt run`
    - if everything went well,you should see
      `2021-07-05 00:22:55,283 INFO  [c.p.p.NumberroPersistence] akka://GatewayServer/user/numberro-persistence-actor - Recovery Done!`
      as the last line in the console log
    - that's it - http server is running ans serving requests  
