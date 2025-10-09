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
