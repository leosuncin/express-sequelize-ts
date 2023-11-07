FROM node:20-alpine AS dependencies

RUN --mount=type=cache,target=/root/.npm \
    corepack enable &&\
    corepack prepare pnpm@latest-8 --activate

WORKDIR /api

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm i --frozen-lockfile

FROM dependencies AS build

COPY --chown=node:node . .

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm build && pnpm build:openapi && pnpm prune --prod

FROM gcr.io/distroless/nodejs20-debian12:nonroot AS service

ENV PORT=3000 NODE_ENV=production

WORKDIR /api

COPY package.json .
COPY --from=build /api/node_modules ./node_modules
COPY --from=build /api/dist .

EXPOSE $PORT

HEALTHCHECK --interval=60s --timeout=10s --start-period=10s --retries=3 CMD [ "/nodejs/bin/node", "/api/health-check.js" ]

CMD ["/api/index.js"]
