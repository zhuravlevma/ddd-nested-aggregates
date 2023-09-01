# Clean Architecture with DDD(without Domain Events)

This implementation is without domain events, instead of events there are nested aggregates.

If you are interested in the option with domain events, then follow the [link](https://github.com/zhuravlevma/nestjs-ddd-clean-architecture)

[Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) with a clean architecture with ports and adapters. It takes into account some tactical patterns from DDD.

## Architecture

![example-uml](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/zhuravlevma/nestjs-ddd-nested-aggregates/main/diagram.iuml)

### Module boundaries

If you have a large monolith that contains many [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html), then the service can be divided into modules by context.

If you have a micro service architecture and you prefer to allocate contexts to different services (which is preferable), then the service can be divided into modules by [aggregates](https://martinfowler.com/bliki/DDD_Aggregate.html).

In this example, there are more than one bounded contexts, you have a monolith in front of you. And this monolith is internally divided into modules according to bounded contexts.

### Event Storming schema

![image](https://github.com/zhuravlevma/nestjs-clean-architecture/assets/44276887/396d6ec0-bc43-4cf3-9dec-a77625f2fd11)

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ cp .env.example .env
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# arch tests
$ npm run test:arch

# test coverage
$ npm run test:cov
```
