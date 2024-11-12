#!/bin/bash

# Variables
PROJECT_NAME=$1
GIT_URL=$2
PROJECT_FOLDER_NAME=$3
NGROK_AUTH_TOKEN=$4  # Optional: If you want to use ngrok instead of Serveo

# Function to clean up Docker container and image
cleanup() {
    echo "Cleaning up Docker resources..."
    docker rm -f $PROJECT_NAME >/dev/null 2>&1
    docker rmi $PROJECT_NAME >/dev/null 2>&1
}

# Ensure the script is running from the home directory
cd ~ || exit

# Record the start time
start_time=$(date +%s)

# Clean up any previous instance
cleanup

# Build the Docker image
echo "Building Docker image for $PROJECT_NAME..."
if ! docker build -t $PROJECT_NAME .; then
    echo "Error: Docker image build failed."
    cleanup
    exit 1
fi

# Run the Docker container
echo "Running Docker container for $PROJECT_NAME..."
CONTAINER_NAME="$PROJECT_NAME-container"
docker run -d --name $CONTAINER_NAME $PROJECT_NAME /bin/bash -c "while true; do sleep 1000; done"

# Clone the Git repository inside the container
echo "Cloning Git repository..."
if ! docker exec $CONTAINER_NAME git clone "$GIT_URL" "$PROJECT_FOLDER_NAME"; then
    echo "Error: Failed to clone Git repository."
    cleanup
    exit 1
fi

# Navigate to the project directory inside the container
docker exec $CONTAINER_NAME /bin/bash -c "cd $PROJECT_FOLDER_NAME && npm install"

# Detect project type and set build and start commands accordingly
docker exec $CONTAINER_NAME /bin/bash -c "
if [ -f 'vite.config.js' ]; then
    echo 'Detected Vite project. Building...';
    npm run build;
    pm2 serve dist 8080 --name $PROJECT_NAME;
elif [ -f 'next.config.js' ]; then
    echo 'Detected Next.js project. Building...';
    npm run build;
    pm2 start npm --name $PROJECT_NAME -- start;
else
    echo 'Detected standard React project. Using dev server...';
    pm2 start npm --name $PROJECT_NAME -- start;
fi
"

# Find an available port starting from 8080
PORT=8080
while netstat -tuln | grep ":$PORT " >/dev/null 2>&1; do
    ((PORT++))
done

# Start Serveo in a tmux session (or use ngrok if provided)
echo "Starting Serveo tunnel in a tmux session..."
docker exec $CONTAINER_NAME /bin/bash -c "tmux new-session -d -s serveo_session 'ssh -R 80:localhost:$PORT serveo.net'"

# Wait and retrieve Serveo tunnel URL from tmux logs
sleep 5
TUNNEL_URL=""
RETRY_COUNT=5

while [ -z "$TUNNEL_URL" ] && [ "$RETRY_COUNT" -gt 0 ]; do
    sleep 2  # Wait a bit before checking again
    TUNNEL_URL=$(docker exec $CONTAINER_NAME tmux capture-pane -t serveo_session -p | grep -o 'https://.*\.serveo.net' | head -n 1)
    ((RETRY_COUNT--))
done

if [ -n "$TUNNEL_URL" ]; then
    echo "Tunnel URL: $TUNNEL_URL"
else
    echo "Error: Failed to retrieve Serveo tunnel URL."
fi

# Record the end time and calculate the total build time
end_time=$(date +%s)
total_time=$((end_time - start_time))

# Display the total build time
echo "Setup completed successfully."
echo "Total build time: $total_time seconds."

# Optional: Cleanup the Docker container after completion
cleanup
