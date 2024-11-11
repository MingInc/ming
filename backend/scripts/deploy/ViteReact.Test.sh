#!/bin/bash

# Set variables
CONTAINER_NAME=$1
IMAGE_NAME=$1
GIT_URL=$2
PROJECT_FOLDER_NAME=$3

# Record the start time
start_time=$(date +%s)

git clone $GIT_URL; then
    echo "Error: Failed to clone Git repository."
    cleanup
    exit 1
fi

# Navigate to the project directory and build the project
echo "Building the project..."
cd $PROJECT_FOLDER_NAME && npm install && npm run build; then
    echo "Error: Project build failed."
    cleanup
    exit 1
fi

# Start the server using pm2
echo "Starting the server with PM2..."
cd $PROJECT_FOLDER_NAME && pm2 serve dist 8080; then
    echo "Error: Failed to start the server with PM2."
    cleanup
    exit 1
fi

# Start ngrok with a wildcard subdomain for the project
echo "Starting ngrok with subdomain..."
ssh -R 80:localhost:8080 serveo.net > /dev/null 2>&1 & # PORT Should be dynamic

# Output logs here
sleep 10

# Print the content of the log file
echo "Printing log..."

# Record the end time and calculate the total build time
end_time=$(date +%s)
total_time=$((end_time - start_time))

# Display the total build time
echo "Setup completed successfully."
echo "Total build time: $total_time seconds."
