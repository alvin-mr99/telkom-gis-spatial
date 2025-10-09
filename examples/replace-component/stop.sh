#!/bin/bash
# filepath: /Users/sofwannuhaalfaruq/Documents/SST/kepler.gl/examples/replace-component/stop.sh

echo "🛑 Stopping Jakarta Population Visualization..."

docker-compose down

echo "🧹 Cleaning up..."
docker system prune -f

echo "✅ All services stopped and cleaned up!"