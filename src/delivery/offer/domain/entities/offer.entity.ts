import { DeliverymanEntity } from 'src/delivery/deliveryman/domain/entities/deliveryman.entity';

interface Attributes {
  id: string;
  name: string;
  orderId: string;
  deliverymanId: string | null;
  deliveryman?: DeliverymanEntity;
}

export class OfferEntity implements Attributes {
  id: string;
  name: string;
  orderId: string;
  deliverymanId: string | null;
  deliveryman?: DeliverymanEntity;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.orderId = attributes.orderId;
    this.deliverymanId = attributes.deliverymanId;
    this.deliveryman = attributes.deliveryman;
  }

  deliverymanTakeOffer(deliverymanId: string, deliveryman: DeliverymanEntity) {
    this.deliverymanId = deliverymanId;
    this.deliveryman = deliveryman;
  }
}
