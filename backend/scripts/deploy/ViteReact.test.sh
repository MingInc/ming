#!/bin/bash

# Variables
PROJECT_NAME=$1
GIT_URL=$2
PROJECT_FOLDER_NAME=$3

# Function to clean up previous builds
cleanup() {
    echo "Cleaning up previous builds..."
    pm2 delete "$PROJECT_NAME" >/dev/null 2>&1
    pkill -f "serveo.net" >/dev/null 2>&1
    rm -rf "$PROJECT_FOLDER_NAME" >/dev/null 2>&1
}

# Ensure the script is running from the home directory
cd ~ || exit

# Record the start time
start_time=$(date +%s)

# Clean up any previous instance
cleanup

# Clone the Git repository
echo "Cloning Git repository..."
if ! git clone "$GIT_URL" "$PROJECT_FOLDER_NAME"; then
    echo "Error: Failed to clone Git repository."
    exit 1
fi

# Navigate to the project directory
cd "./$PROJECT_FOLDER_NAME" || exit

# Install dependencies
echo "Installing dependencies..."
if ! npm install; then
    echo "Error: npm install failed."
    cleanup
    exit 1
fi

# Detect project type and set build and start commands accordingly
if [ -f "vite.config.js" ]; then
    echo "Detected Vite project. Building..."
    npm run build
    START_CMD="pm2 serve dist $PORT --name $PROJECT_NAME"
elif [ -f "next.config.js" ]; then
    echo "Detected Next.js project. Building..."
    npm run build
    START_CMD="pm2 start npm --name $PROJECT_NAME -- start"
else
    echo "Detected standard React project. Using dev server..."
    START_CMD="pm2 start npm --name $PROJECT_NAME -- start"
fi

# Find an available port starting from 8080
PORT=8080
while netstat -tuln | grep ":$PORT " >/dev/null 2>&1; do
    ((PORT++))
done

# Start the server
echo "Starting the server on port $PORT..."
if ! eval $START_CMD; then
    echo "Error: Failed to start the server."
    cleanup
    exit 1
fi

# Start Serveo in a tmux session
echo "Starting Serveo tunnel on serveo.net in a tmux session..."
tmux new-session -d -s serveo_session "ssh -R 80:localhost:$PORT serveo.net"

# Wait and retrieve Serveo tunnel URL from tmux logs
sleep 5
TUNNEL_URL=""
RETRY_COUNT=5

while [ -z "$TUNNEL_URL" ] && [ "$RETRY_COUNT" -gt 0 ]; do
    sleep 2  # Wait a bit before checking again
    TUNNEL_URL=$(tmux capture-pane -t serveo_session -p | grep -o 'https://.*\.serveo\.net' | head -n 1)
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
