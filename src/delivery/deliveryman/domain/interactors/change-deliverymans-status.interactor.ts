import {
  ChangeDeliverymansStatusCommand,
  ChangeDeliverymansStatusUseCase,
} from 'src/delivery/deliveryman/domain/ports/in/change-deliverymans-status.use-case';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';
import { FindDeliverymanByIdWithOrdersPort } from '../ports/out/find-deliveryman-by-id-with-orders.port';
import { DeliverymanEntity } from '../entities/deliveryman.entity';

export class ChangeDeliverymansStatusInteractor
  implements ChangeDeliverymansStatusUseCase
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
  ) {}

  async execute(
    changeDeliverymansStatusCommand: ChangeDeliverymansStatusCommand,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          changeDeliverymansStatusCommand.deliverymanId,
        );

      deliverymanWithOrders.changeStatus(
        changeDeliverymansStatusCommand.isActive,
      );

      return await this.saveDeliverymanPort.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
