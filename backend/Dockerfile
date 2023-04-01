FROM node:18.12.1
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 5010
CMD npm start
# ENTRYPOINT [ "npm","start" ]
