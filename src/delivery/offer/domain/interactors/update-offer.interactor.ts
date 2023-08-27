import { SaveOfferPort } from '../ports/out/save-offer.port';
import { OfferEntity } from '../entities/offer.entity';
import {
  UpdateOfferCommand,
  UpdateOfferUseCase,
} from '../ports/in/update-offer.use-case';
import { FindOfferByIdPort } from '../ports/out/find-offer-by-id.port';
import { FindDeliverymanByIdWithOrdersPort } from 'src/delivery/deliveryman/domain/ports/out/find-deliveryman-by-id-with-orders.port';
import { OrderEntity } from 'src/delivery/deliveryman/domain/entities/order.entity';
import { v4 as uuid } from 'uuid';

export class UpdateOfferInteractor implements UpdateOfferUseCase {
  constructor(
    private readonly findOfferByIdPort: FindOfferByIdPort,
    private readonly saveOfferPort: SaveOfferPort,

    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersPort,
  ) {}

  async execute(updateOfferCommand: UpdateOfferCommand): Promise<OfferEntity> {
    try {
      const offer = await this.findOfferByIdPort.findOfferByIdPort(
        updateOfferCommand.offerId,
      );

      const deliveryman =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          updateOfferCommand.deliverymanId,
        );

      if (updateOfferCommand.deliverymanId !== undefined) {
        deliveryman.addOrder(
          new OrderEntity({
            id: uuid(),
            name: 'test name',
            description: 'test descr',
            isActive: false,
            orderId: updateOfferCommand.offerId,
            deliverymanId: updateOfferCommand.deliverymanId,
          }),
        );
        offer.deliverymanTakeOffer(
          updateOfferCommand.deliverymanId,
          deliveryman,
        );
      }

      return this.saveOfferPort.saveOffer(offer);
    } catch (error) {
      return error.message;
    }
  }
}
