#!/bin/bash

echo "🚀 Starting Jakarta Population Visualization..."

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose not found. Please install Docker Compose."
    exit 1
fi

# Check if mbtiles file exists
if [ ! -f "./src/data/jakarta-population-mvt/jakarta-population.mbtiles" ]; then
    echo "❌ jakarta-population.mbtiles not found!"
    echo "📁 Current directory: $(pwd)"
    echo "📁 Files in data directory:"
    ls -la ./src/data/jakarta-population-mvt/ || echo "Directory not found"
    exit 1
fi

echo "📦 Stopping any existing containers..."
docker-compose down

echo "📦 Building and starting tileserver only first..."
docker-compose up --build -d tileserver

echo "⏳ Waiting for tileserver to be ready..."

# Wait for tileserver to be healthy
timeout=120
counter=0

while [ $counter -lt $timeout ]; do
    # Check if container is running
    if ! docker-compose ps tileserver | grep -q "Up"; then
        echo "❌ Tileserver container is not running!"
        echo "📋 Container status:"
        docker-compose ps tileserver
        echo "📋 Logs:"
        docker-compose logs tileserver
        exit 1
    fi
    
    # Check if service responds using wget (which should be available)
    if wget --spider -q http://localhost:8080/ 2>/dev/null; then
        echo "✅ Tileserver is ready!"
        break
    fi
    
    sleep 3
    counter=$((counter + 3))
    
    # Show progress every 15 seconds
    if [ $((counter % 15)) -eq 0 ]; then
        echo "⏳ Still waiting for tileserver... ($counter/$timeout seconds)"
        echo "📋 Recent logs:"
        docker-compose logs --tail=10 tileserver
    fi
done

if [ $counter -ge $timeout ]; then
    echo "❌ Tileserver failed to start within $timeout seconds"
    echo "📋 Final logs:"
    docker-compose logs tileserver
    exit 1
fi

echo "🗺️  Tileserver running at: http://localhost:8080"
echo "📊 Testing endpoints..."

# Test endpoints
endpoints=(
    "http://localhost:8080/"
    "http://localhost:8080/data/jakarta-population.json"
    "http://localhost:8080/styles/jakarta-population/style.json"
)

for endpoint in "${endpoints[@]}"; do
    if wget --spider -q "$endpoint" 2>/dev/null; then
        echo "✅ $endpoint - OK"
    else
        echo "❌ $endpoint - Failed"
    fi
done

echo "🚀 Starting kepler app..."
docker-compose up -d kepler-app

echo "🌍 Kepler.gl app will be available at: http://localhost:3000"
echo "✨ All services are ready!"