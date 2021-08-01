# EXERCICE 1



## Configurations
- You have to be installed `yarn` or `npm` to run the service.
- Run the command `yarn` or `npm install` to intall all dependences.
- Run the command  `yarn migrate:run` or `npm run migrate:run` for the knex create the database with the migrates created.
- After database created run `yarn seed:run` ou `npm run seed:run` to execute the seed, and feed the database with somes datas.

## Start Service
- To start the service run `yarn dev` or `npm run dev`.

## Endpoints

This service has 3 endpoints:

- To create a new shortered url, create a `POST` with endpoint `/urlshortened` with the following boddy:

      {
        "url": "https://www.google.com"
      }

- To get all urls created, create a `GET` with endpoint `/urlshortened`.

- To renew a expired url, crate a `PUT` with endpoint `/urlshortened/${id}`.

- to Open a url just run `http://localhost/3000/urlshortened/${shorteredUrl}` to open the page.







