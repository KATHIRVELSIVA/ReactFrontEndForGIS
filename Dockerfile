FROM node:18 
WORKDIR /app/reactapp
COPY package.json /app/reactapp
RUN npm install
COPY . /app/reactapp
EXPOSE 8001
CMD [ "npm" , "start" ]