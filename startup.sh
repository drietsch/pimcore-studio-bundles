#!/bin/bash

# Ensure GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "Error: 'gh' command not found. Please install GitHub CLI."
    exit 1
fi

# Get the current Codespace name
CODESPACE_NAME=$(gh codespace list --json name --jq '.[0].name' 2>/dev/null)
if [ -z "$CODESPACE_NAME" ]; then
    echo "Error: Unable to fetch the Codespace name."
    exit 1
fi
echo "Using Codespace: $CODESPACE_NAME"

# Update .env file with the correct Codespace URL
if [ -f .env ]; then
    sed -i "s|NEXT_PUBLIC_API_HOSTNAME=http://localhost:8000|NEXT_PUBLIC_API_HOSTNAME=https://$CODESPACE_NAME-8000.app.github.dev|g" .env
else
    echo "Warning: .env file not found. Skipping API hostname update."
fi

# Define the ports to make public
PORTS=(80 3030 3031)
VISIBILITY="public"
MAX_ATTEMPTS=5
BACKOFF_SECONDS=2  # Initial backoff time

# Function to update port visibility with retry logic
update_port_visibility() {
    local port=$1
    local attempt=1

    echo "Updating port $port visibility to $VISIBILITY (attempt $attempt/$MAX_ATTEMPTS)"
    while true; do
        if gh codespace ports visibility $port:$VISIBILITY -c "$CODESPACE_NAME"; then
            echo "Port $port is now publicly accessible."
            break  # Exit loop if successful
        fi

        echo "Retrying in $BACKOFF_SECONDS seconds..."
        sleep $BACKOFF_SECONDS
        BACKOFF_SECONDS=$((BACKOFF_SECONDS * 2))  # Exponential backoff
        attempt=$((attempt + 1))

        if [ $attempt -gt $MAX_ATTEMPTS ]; then
            echo "Error: Exceeded maximum attempts. Failed to update port $port visibility."
            exit 1
        fi
    done
}

# Loop through ports and update their visibility
for PORT in "${PORTS[@]}"; do
    update_port_visibility "$PORT"
done

echo "All ports are now publicly accessible."

# Start Docker Compose
if [ -f bundles/docker-compose.yaml ]; then
    echo "Starting Docker Compose..."
    cd bundles
    docker compose up -d
    cd ..
else
    echo "Error: docker-compose.yaml not found in bundles/. Aborting."
    exit 1
fi

# Wait for Docker Compose services to be fully up
echo "Waiting for Docker Compose services to be fully up..."
while ! docker compose -f bundles/docker-compose.yaml ps | grep -q "Up"; do
    sleep 2
done
echo "Docker Compose services are up."

# Start OpenVSCode Server in detached mode
echo "Starting OpenVSCode Server..."
docker run -d --init -p 3000:3000 -v "$(pwd):/home/workspace:consistent" gitpod/openvscode-server

# Mount assets to WebDAV using rclone in the background
echo "Mounting assets to WebDAV..."
nohup rclone mount pimcore: ./assets -vv > rclone.log 2>&1 &

# Change to the Pimcore Studio UI assets directory and start the npm dev server
echo "Starting Pimcore Studio UI dev server inside the container..."
docker exec -it "e7bd1f88fe0c380500bb7a7d1853953d0abb3eb61eef45a703d69d9deaeb7417" /bin/bash -c "cd vendor/pimcore/studio-ui-bundle/assets && npm run dev-server"

echo "Script execution complete."
