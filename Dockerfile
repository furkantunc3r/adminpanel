FROM node:18

WORKDIR /usr/src/caseapp

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
ENV DBUSER="user123"
ENV DB="adminpanel"
ENV DBPASS="password123"
ENV DBPORT="5432"
ENV DBHOST="db"

EXPOSE 8080

CMD bash './tools/start.sh'; 'bash'