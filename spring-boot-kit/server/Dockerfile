# Use Ubuntu as the base image
FROM openjdk:21-slim

# Install Maven, curl, and other dependencies
RUN apt-get update && \
    apt-get install -y maven curl software-properties-common build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev wget && \
    rm -rf /var/lib/apt/lists/*

# Print versions
RUN java -version && \
    mvn -version
