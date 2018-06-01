FROM openjdk:8-jdk-alpine
COPY target/contact-app-*.jar /app.jar
EXPOSE 9000
ENTRYPOINT java -jar app.jar
