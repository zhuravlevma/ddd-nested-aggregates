import { ReportPositionEntity } from './report-position.entity';
import { OfferEntity } from 'src/delivery/offer/domain/entities/offer.entity';
import { v4 as uuid } from 'uuid';

interface Attributes {
  id: string;
  isValid: boolean;
  orderId: string;
  positions: ReportPositionEntity[];
}

export class ReportEntity implements Attributes {
  id: string;
  isValid: boolean;
  orderId: string;
  positions: ReportPositionEntity[];
  offer?: OfferEntity;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.isValid = attributes.isValid;
    this.orderId = attributes.orderId;
    this.positions = attributes.positions;
  }

  updateReportStatus(status: boolean) {
    if (status === true) {
      this.isValid = true;
      this.offer = new OfferEntity({
        id: uuid(),
        name: 'test',
        orderId: 'test',
        deliverymanId: null,
      });
    } else {
      this.isValid = false;
    }
  }
}
