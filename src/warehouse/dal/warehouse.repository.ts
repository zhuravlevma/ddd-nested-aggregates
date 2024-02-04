import { WarehouseEntity } from '../domain/entities/warehouse.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { WarehouseMapper } from './warehouse.mapper';
import { SaveWarehousePort } from '../domain/ports/out/save-warehouse.port';
import { Injectable } from '@nestjs/common';
import { GetWarehouseWithOrderPort } from '../domain/ports/out/get-warehouse-with-order.port';
import { GetWarehouseWithOrdersPort } from '../domain/ports/out/get-warehouse-with-orders.port';
import { WarehouseOrmEntity } from './orm-entities/warehouse.orm-entity';
import { BillOfLadingMapper } from 'src/accounting/dal/report.mapper';

@Injectable()
export class WarehouseRepository
  implements
    SaveWarehousePort,
    GetWarehouseWithOrdersPort,
    GetWarehouseWithOrderPort
{
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(WarehouseOrmEntity)
    private whRepository: Repository<WarehouseOrmEntity>,
  ) {}

  async getWarehouseWithOrderPort(
    warehouseId: string,
    orderId: string,
  ): Promise<WarehouseEntity> {
    const whOrm = await this.whRepository
      .createQueryBuilder('warehouses')
      .leftJoinAndSelect('warehouses.orders', 'orders')
      .where('warehouses.id = :warehouseId', { warehouseId })
      .andWhere('orders.id = :orderId', { orderId })
      .getOne();
    return WarehouseMapper.mapToDomain(whOrm);
  }

  async getWarehouseWithOrdersPort(
    warehouseId: string,
  ): Promise<WarehouseEntity> {
    const whOrm = await this.whRepository.findOne({
      where: {
        id: warehouseId,
      },
      relations: {
        orders: true,
      },
    });
    return WarehouseMapper.mapToDomain(whOrm);
  }

  async saveWarehouse(warehouse: WarehouseEntity): Promise<WarehouseEntity> {
    const warehouseORM = WarehouseMapper.mapToORM(warehouse);

    const whOrm = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        if (warehouse.report) {
          await transactionalEntityManager.save(
            BillOfLadingMapper.mapToOrm(warehouse.report),
          );
        }
        return await transactionalEntityManager.save(warehouseORM);
      },
    );
    return WarehouseMapper.mapToDomain(whOrm);
  }
}
