#!/bin/bash

# Set variables
CONTAINER_NAME=$1
IMAGE_NAME=$1
GIT_URL=$2
PROJECT_FOLDER_NAME=$3
NGROK_API_KEY=$4
NGROK_AUTH_TOKEN=$5

# Function to clean up Docker container and image
cleanup() {
    echo "Cleaning up..."
    docker rm -f $CONTAINER_NAME >/dev/null 2>&1
    docker rmi $IMAGE_NAME >/dev/null 2>&1
}

# Record the start time
start_time=$(date +%s)

# Build the Docker image
echo "Building Docker image..."
if ! docker build -t $IMAGE_NAME .; then
    echo "Error: Docker image build failed."
    cleanup
    exit 1
fi

# Run the container
echo "Running Docker container..."
if ! docker run -d --name $CONTAINER_NAME $IMAGE_NAME /bin/bash -c "while true; do sleep 1000; done"; then
    echo "Error: Failed to start Docker container."
    cleanup
    exit 1
fi

# Clone the Git repository
echo "Cloning Git repository..."
if ! docker exec $CONTAINER_NAME git clone $GIT_URL; then
    echo "Error: Failed to clone Git repository."
    cleanup
    exit 1
fi

# Navigate to the project directory and build the project
echo "Building the project..."
if ! docker exec $CONTAINER_NAME /bin/bash -c "cd $PROJECT_FOLDER_NAME && npm install && npm run build"; then
    echo "Error: Project build failed."
    cleanup
    exit 1
fi

# Start the server using pm2
echo "Starting the server with PM2..."
if ! docker exec $CONTAINER_NAME /bin/bash -c "cd $PROJECT_FOLDER_NAME && pm2 serve dist 8080"; then
    echo "Error: Failed to start the server with PM2."
    cleanup
    exit 1
fi

# Configure ngrok API key and start ngrok with the wildcard subdomain
# docker exec $CONTAINER_NAME /bin/bash -c "ngrok config add-api-key $NGROK_API_KEY"

# Start ngrok with a wildcard subdomain for the project
echo "Starting ngrok with subdomain..."
docker exec $CONTAINER_NAME /bin/bash -c "ngrok http 8080 > /dev/null 2>&1 &" # PORT Should be dynamic

# Output ngrok logs
docker exec $CONTAINER_NAME /bin/bash -c "cat ngrok.log"

sleep 10

# Print the content of the log file
echo "Printing ngrok log..."
docker exec $CONTAINER_NAME /bin/bash -c "ngrok api endpoints list"

# Record the end time and calculate the total build time
end_time=$(date +%s)
total_time=$((end_time - start_time))

# Display the total build time
echo "Setup completed successfully."
echo "Total build time: $total_time seconds."
