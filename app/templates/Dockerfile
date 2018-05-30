FROM node:8
WORKDIR /usr/src/app
COPY ["package.json",  "./"]
RUN npm install --quiet node-gyp -g &&\
  npm install --quiet 
#  apk del native-deps
COPY . /usr/src/app
CMD npm start
