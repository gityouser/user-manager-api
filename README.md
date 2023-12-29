# User Management API
## Description
This NestJS application provides a user management system with a RESTful API. It includes features for creating, retrieving, updating, and deleting users. The application is built with TypeScript and utilizes NestJS framework best practices.

## Features
* CRUD operations for user management
* In-memory data storage
* Role-based access control
* Swagger API documentation (on the [swagger feature branch](https://github.com/gityouser/user-manager-api/tree/feat/add-swagger-api-docs))


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
# users will get seeded here, when NODE_ENV="development"

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
