# Creates Docker Container
# docker run -it -p 80:80 -e URL_prefix="/test" --name test versadesk/mindmap:0.12.2
# docker build -t versadesk/mindmap:0.12.2 .

# Stage 1 - build
FROM node:14 as build

## Install build toolchain, install node deps and compile native add-ons
RUN apt update && \
    apt install -y \
    python3 make g++ git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

WORKDIR /app/simple-mind-map

RUN npm install --save && \
    npm link

WORKDIR /app/web

RUN npm install --save && \
    npm link simple-mind-map && \
    npm run build

WORKDIR /app

# Stage 2 - make final image
FROM nginx:stable

RUN mkdir /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/index.html /app/index.html
COPY --from=build /app/versadesk.conf /etc/nginx/versadesk.conf.template
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

ENV NODE_ENV=production

CMD ["sh", "-c", "rm -f /etc/nginx/conf.d/default.conf && envsubst '${URL_prefix}' < /etc/nginx/versadesk.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]


