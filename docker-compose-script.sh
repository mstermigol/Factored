#!/bin/bash

# Default API URL
DEFAULT_API_URL="http://127.0.0.1:8000/api/"

# Check if URL is provided
if [ $# -eq 0 ]; then
    echo "No API URL provided. Using default API URL: $DEFAULT_API_URL"
    API_URL=$DEFAULT_API_URL
else
    API_URL=$1
fi

# Function to determine the correct Docker Compose command
get_docker_compose_cmd() {
    if command -v docker-compose &> /dev/null; then
        echo "docker-compose"
    elif docker compose version &> /dev/null; then
        echo "docker compose"
    else
        echo "Error: Neither docker-compose nor docker compose is available."
        exit 1
    fi
}

# Get the appropriate Docker Compose command
DOCKER_COMPOSE_CMD=$(get_docker_compose_cmd)

# Update .env file in the frontend directory
echo "Updating .env file..."
echo "VITE_API_URL=$API_URL" > frontend/.env

# Rebuild Docker images without using cache
echo "Rebuilding Docker images..."
sudo $DOCKER_COMPOSE_CMD build --no-cache

# Start the containers in detached mode
echo "Starting containers..."
sudo $DOCKER_COMPOSE_CMD up -d

echo "Script completed successfully!"
