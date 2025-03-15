#!/bin/bash

# Check if Docker Compose is already running with all services
if [ -f bundles/docker-compose.yaml ]; then
    cd bundles
    total_services=$(docker compose config --services | wc -l)
    running_services=$(docker compose ps --services --filter "status=running" | wc -l)

    if [ "$running_services" -eq "$total_services" ]; then
        echo "All Docker Compose services are already running."
    else
        echo "Starting missing Docker Compose services..."
        docker compose up -d
    fi
    cd ..
else
    echo "Error: docker-compose.yaml not found in bundles/. Aborting."
    exit 1
fi

# Start OpenVSCode Server only if not already running
if docker ps | grep -q "gitpod/openvscode-server"; then
    echo "VSCode Server is already running."
else
    echo "Starting OpenVSCode Server..."
    docker run -d --init -p 3000:3000 -v "$(pwd):/home/workspace:consistent" gitpod/openvscode-server
fi

# Define the ports to make public
PORTS=(80 3030 3031)
VISIBILITY="public"
MAX_ATTEMPTS=10
BACKOFF_SECONDS=10  # Initial backoff time

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

# Mount assets to WebDAV using rclone in the background
echo "Mounting assets to WebDAV..."
nohup rclone mount pimcore: ./assets -vv > rclone.log 2>&1 &

# Check if the specified container is running before executing commands inside it
CONTAINER_ID="e7bd1f88fe0c380500bb7a7d1853953d0abb3eb61eef45a703d69d9deaeb7417"
if docker ps -q -f id="$CONTAINER_ID" | grep -q "$CONTAINER_ID"; then
    echo "Starting Pimcore Studio UI dev server inside the container..."
    docker exec -it "$CONTAINER_ID" /bin/bash -c "cd vendor/pimcore/studio-ui-bundle/assets && npm run dev-server"
else
    echo "Error: Container $CONTAINER_ID is not running."
    exit 1
fi

echo "Script execution complete."
