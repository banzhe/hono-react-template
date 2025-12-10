# Stage 1: Build frontend with Deno
FROM denoland/deno:latest AS builder

WORKDIR /app

# Copy workspace configuration
COPY deno.json deno.lock ./

# Copy server config first (needed for workspace)
COPY packages/server/deno.json ./packages/server/

# Copy web package files for dependency installation
COPY packages/web/package*.json ./packages/web/

# Copy web source (Deno will auto-install npm packages on first run)
COPY packages/web ./packages/web

# Create output directory structure
RUN mkdir -p packages/server/dist

# Build frontend with Deno
WORKDIR /app/packages/web
RUN deno run -A npm:typescript/tsc -b && deno run -A npm:vite build

# Stage 2: Runtime with minimal Deno image
FROM denoland/deno:alpine

WORKDIR /app

# Copy server configuration
COPY packages/server/deno.json ./
COPY deno.lock ./

# Copy server source
COPY packages/server/main.ts ./

# Copy built frontend from builder stage
COPY --from=builder /app/packages/server/dist ./dist

# Cache server dependencies
RUN deno cache main.ts

# Expose port
EXPOSE 8000

# Run server
CMD ["deno", "run", "--allow-net", "--allow-read", "main.ts"]
