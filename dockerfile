FROM node:latest

WORKDIR /myapp

#Copy package.json and package-lock.json on container
COPY package*.json ./

#Install the dependencies
RUN npm install

#Copy all other files to docker container
COPY . /myapp/

EXPOSE 8000

CMD [ "node", "src/index.js" ]
