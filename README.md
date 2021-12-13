# Ultra-test

How to run
Make sure you have docker and docker-compose installed on your machine
### Run 
$ docker-compose up

### Entrypoint
* API - localhost:8080/api/
* Swagger - localhost:8080/swagger/

## Information
* To speed up the demo, the env variables were added directly to the repository.
* Records are updated  through a cron task once a day (apply discount and remove old game).
* Records for test will be seeded at startup. This seeder is idempotent.
