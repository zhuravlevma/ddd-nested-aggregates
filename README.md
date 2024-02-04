# Clean Architecture with DDD(without Domain Events)

This implementation is without domain events, instead of events there are nested aggregates.

## Example

```typescript
export class WarehouseEntity implements Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];
  report?: ReportEntity; // nested aggregate

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.orders = attributes.orders;
  }

  addOrder(order: OrderEntity) {
    this.orders.push(order);
  }

  changeOrderStatusToValid(orderId: string, report: ReportEntity) {
    const order = this.orders.find((el) => el.id === orderId);
    order.changeStatus(true);
    this.report = report;
  }
}
```

If you are interested in the option with domain events, then follow the [link](https://github.com/zhuravlevma/nestjs-ddd-clean-architecture)

[Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) with a clean architecture with ports and adapters. It takes into account some tactical patterns from DDD.

## Architecture

![image](https://github.com/zhuravlevma/ddd-nested-aggregates/assets/44276887/0b862b4e-6d1e-4882-bb29-1653f296cd56)

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
