# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:16 as base
WORKDIR /app
COPY ./package.json ./
RUN yarn
COPY ./lerna.json ./
# Package client
FROM base as client-build
WORKDIR /app/packages/client
# Here the dependencies will be installed and the local required packages bootstrapped.
COPY  packages/client/package.json ./
RUN yarn
# Package contracts
FROM base as contracts-build
WORKDIR /app/packages/contracts
# Here the dependencies will be installed and the local required packages bootstrapped.
COPY  packages/contracts/package.json ./
RUN yarn
# Package server
FROM base as server-build
WORKDIR /app/packages/server
# Here the dependencies will be installed and the local required packages bootstrapped.
COPY  packages/server/package.json ./
RUN yarn
# final stage
FROM base
COPY --from=client-build /app/packages/client /app/packages/client
COPY --from=contracts-build /app/packages/contracts /app/packages/contracts
COPY --from=server-build /app/packages/server /app/packages/server