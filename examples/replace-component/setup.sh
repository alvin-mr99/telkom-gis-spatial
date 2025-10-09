#!/bin/bash

echo "🛠️  Setting up Jakarta Population Visualization..."

# Create directories
mkdir -p docker/tileserver/styles

echo "📝 Creating Dockerfile..."
cat > docker/tileserver/Dockerfile << 'EOF'
FROM maptiler/tileserver-gl:latest

# Create necessary directories
USER root
RUN mkdir -p /data/fonts /data/sprites /data/styles

# Copy configuration files
COPY config.json /data/config.json
COPY styles/ /data/styles/

# Set permissions
RUN chown -R node:node /data

# Switch back to node user
USER node

# Expose port
EXPOSE 8080

# Start tileserver
CMD ["tileserver-gl", "--config", "/data/config.json", "--port", "8080", "--verbose"]
EOF

echo "📝 Creating tileserver config..."
cat > docker/tileserver/config.json << 'EOF'
{
  "options": {
    "paths": {
      "root": "/data",
      "fonts": "fonts",
      "sprites": "sprites", 
      "styles": "styles",
      "mbtiles": "/data"
    },
    "serveAllFonts": true,
    "serveStaticMaps": true,
    "domains": ["localhost:8080", "127.0.0.1:8080"],
    "maxzoom": 14,
    "maxsize": 2048
  },
  "styles": {
    "jakarta-population": {
      "style": "jakarta-population.json",
      "tilejson": {
        "bounds": [106.7698, -6.3087, 106.8984, -6.1575],
        "center": [106.8341, -6.2331, 11],
        "format": "pbf",
        "maxzoom": 14,
        "minzoom": 8
      }
    }
  },
  "data": {
    "jakarta-population": {
      "mbtiles": "jakarta-population.mbtiles"
    }
  }
}
EOF

echo "📝 Creating style JSON..."
cat > docker/tileserver/styles/jakarta-population.json << 'EOF'
{
  "version": 8,
  "name": "Jakarta Population Simple",
  "center": [106.8341, -6.2331],
  "zoom": 11,
  "sources": {
    "jakarta-population": {
      "type": "vector",
      "url": "http://localhost:8080/data/jakarta-population.json"
    }
  },
  "sprite": "https://openmaptiles.github.io/osm-bright-gl-style/sprite",
  "glyphs": "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#f8f4f0"
      }
    },
    {
      "id": "jakarta-population-circles",
      "type": "circle",
      "source": "jakarta-population",
      "source-layer": "jakarta-population",
      "paint": {
        "circle-radius": 8,
        "circle-color": [
          "interpolate",
          ["linear"],
          ["get", "populasi"],
          23400, "#0198BD",
          28000, "#42C1BC", 
          32000, "#9CE3B1",
          36000, "#F5B272",
          40000, "#EB7053",
          41500, "#D50255"
        ],
        "circle-opacity": 0.8,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#ffffff"
      }
    }
  ]
}
EOF

# Check if files were created
if [ -f "docker/tileserver/config.json" ] && [ -f "docker/tileserver/Dockerfile" ] && [ -f "docker/tileserver/styles/jakarta-population.json" ]; then
    echo "✅ All configuration files created!"
else
    echo "❌ Some files are missing. Please create them manually."
    exit 1
fi

echo "🚀 Setup complete! Run './start.sh' to start the services."