import { ReportEntity } from 'src/accounting/report/domain/entities/report.entity';
import { WarehouseEntity } from '../entities/warehouse.entity';
import {
  UpdateOrderUseCase,
  UpdateOrderCommand,
} from '../ports/in/update-order.use-case';
import { GetWarehouseWithOrderPort } from '../ports/out/get-warehouse-with-order.port';
import { SaveWarehousePort } from '../ports/out/save-warehouse.port';
import { v4 as uuid } from 'uuid';

export class UpdateOrderInteractor implements UpdateOrderUseCase {
  constructor(
    private readonly getWarehouseWithOrderPort: GetWarehouseWithOrderPort,
    private readonly saveWhPort: SaveWarehousePort,
  ) {}
  async execute(
    updateOrderStatusCommand: UpdateOrderCommand,
  ): Promise<WarehouseEntity> {
    const warehouse =
      await this.getWarehouseWithOrderPort.getWarehouseWithOrderPort(
        updateOrderStatusCommand.warehouseId,
        updateOrderStatusCommand.orderId,
      );

    if (updateOrderStatusCommand.isValid) {
      warehouse.changeOrderStatusToValid(
        updateOrderStatusCommand.orderId,
        new ReportEntity({
          id: uuid(),
          orderId: updateOrderStatusCommand.orderId,
          isValid: false,
          positions: [],
        }),
      );
    }

    return this.saveWhPort.saveWarehouse(warehouse);
  }
}
