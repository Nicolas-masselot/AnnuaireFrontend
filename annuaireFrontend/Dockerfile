FROM node:latest

WORKDIR /annuaireApp

#installation angular et dépendences
COPY package.json /annuaireApp/package.json
RUN npm install
RUN npm install -g @angular/cli

# copie app
COPY . /annuaireApp

# démarrage app
CMD ng serve --host 0.0.0.0

# docker run -d -it -p 4201:4200 --name annuaire annuaire-frontend:latest