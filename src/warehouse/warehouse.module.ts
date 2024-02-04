import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateOrderInteractor } from './domain/interactors/update-order.interactor';
import { UpdateOrderUseCase } from './domain/ports/in/update-order.use-case';
import { Module } from '@nestjs/common';
import { SaveWarehousePort } from './domain/ports/out/save-warehouse.port';
import { AddOrderUseCase } from './domain/ports/in/add-order.use-case';
import { AddOrderInteractor } from './domain/interactors/add-order.interactor';
import { CreateWarehouseUseCase } from './domain/ports/in/create-warehouse.use-case';
import { CreateWarehouseInteractor } from './domain/interactors/create-warehouse.interactor';
import { GetWarehouseWithOrdersPort } from './domain/ports/out/get-warehouse-with-orders.port';
import { GetWarehouseWithOrderPort } from './domain/ports/out/get-warehouse-with-order.port';
import { OrderOrmEntity } from './dal/orm-entities/order.orm-entity';
import { WarehouseController } from './warehouse.controller';
import { WarehouseOrmEntity } from './dal/orm-entities/warehouse.orm-entity';
import { WarehouseRepository } from './dal/warehouse.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseOrmEntity, OrderOrmEntity])],
  controllers: [WarehouseController],
  providers: [
    WarehouseRepository,
    {
      provide: UpdateOrderUseCase,
      useFactory: (a, b) => new UpdateOrderInteractor(a, b),
      inject: [SaveWarehousePort, GetWarehouseWithOrderPort],
    },
    {
      provide: CreateWarehouseUseCase,
      useFactory: (a) => new CreateWarehouseInteractor(a),
      inject: [SaveWarehousePort],
    },
    {
      provide: AddOrderUseCase,
      useFactory: (a, b) => new AddOrderInteractor(a, b),
      inject: [GetWarehouseWithOrdersPort, SaveWarehousePort],
    },
    {
      provide: GetWarehouseWithOrdersPort,
      useClass: WarehouseRepository,
    },
    {
      provide: GetWarehouseWithOrderPort,
      useClass: WarehouseRepository,
    },
    {
      provide: SaveWarehousePort,
      useClass: WarehouseRepository,
    },
  ],
})
export class WarehouseModule {}
