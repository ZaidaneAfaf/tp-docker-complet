FROM openjdk:17-jdk-slim

WORKDIR /app

# Copie le JAR (ton projet s'appelle SpringDataRest)
COPY target/SpringDataRest-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "app.jar"]