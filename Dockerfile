FROM node:16.4.2

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
