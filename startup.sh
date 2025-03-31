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

sleep 2



# Start OpenVSCode Server only if not already running
# Check if the OpenVSCode Server container is running
if docker ps --filter "name=vscode-server" --format '{{.Names}}' | grep -q "vscode-server"; then
    echo "VSCode Server is already running."
else
    # Check if a stopped container with the same name exists
    if docker ps -a --filter "name=vscode-server" --format '{{.Names}}' | grep -q "vscode-server"; then
        echo "Restarting existing VSCode Server container..."
        docker start vscode-server
    else
        echo "Starting a new OpenVSCode Server container..."
        docker run -d --init --name vscode-server -p 3000:3000 -v "$(pwd):/home/workspace" gitpod/openvscode-server
    fi
fi

sleep 2


# Define the ports to make public
PORTS=(80 3030 3031 3000)
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


# Check if the specified container is running before executing commands inside it
CONTAINER_ID="01453242c23f"
if docker ps -q -f id="$CONTAINER_ID" | grep -q "$CONTAINER_ID"; then
    echo "Starting Pimcore Studio UI dev server inside the container..."
    docker exec -it "$CONTAINER_ID" /bin/bash -c "cd bundles/Pimcore/Bundle/StudioUiDemoPluginBundle && npm run dev-server"
else
    echo "Error: Container $CONTAINER_ID is not running."
    exit 1
fi

Sleep 1

# Mount assets to WebDAV using rclone in the background
echo "Mounting assets to WebDAV..."
nohup rclone mount pimcore: ./assets -vv > rclone.log 2>&1 &

echo "Script execution complete."
