FROM gcr.io/distroless/nodejs:16
WORKDIR /usr/app
COPY --chown=1000:1000 src/node_modules /usr/app/node_modules
COPY --chown=1000:1000 src/dist /usr/app/dist
COPY --chown=1000:1000 src/.env /usr/app/
USER 1000
CMD ["dist/index.js"]