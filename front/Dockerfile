FROM node:14.15.1-alpine3.12

#RUN npm install -g yarn

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY . /app

RUN npm install
RUN npm install -g @angular/cli

RUN ng build
CMD ["ng","serve","--host","0.0.0.0"]

#https://stackoverflow.com/a/60814428/14002450