# Description
this mono repo contains "web" and "api" projects(packages are managed by lerna).

## Tech stack
client: js/ vuejs/ vuetify
server: nodejs/ js/ express/ mongoose/ YAML(for public api definition)
server testing: integrated testing using jest, supertest and mongodb-memory-server
deployment: herokus/ mongodb atlas

## Deploy
web-address: https://sample-reservation-web.herokuapp.com/
api-address: https://sample-reservation-api.herokuapp.com/

## Improvements
these are list of improvement I did not have enough time to fix
1. Add integration test(component testing) to the client code - [using vue utils and jest]
2. Add e2e test - [using cypress]
3. Create deployment pipeline [using github actions or heroku pipeline]
4. find a better way to introduce * into requied fields. currently I have to duplicate slot for each component

## Open questions on db design
1. what does make user unique?
2. are city and postalcCode part of billing information or reservation information?

## Known issues
these are list of issues I did not have enough time to fix

1. after selecting check-in/out dates, the cursor should be focus on next field
2. cleaning form after submit