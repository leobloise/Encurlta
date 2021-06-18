FROM node:12-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000:5000
CMD ["npm", "start"]