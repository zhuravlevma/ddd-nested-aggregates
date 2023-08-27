import { ReportPositionEntity } from './report-position.entity';
import { OfferEntity } from 'src/delivery/offer/domain/entities/offer.entity';

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

  updateReportStatus(status: boolean, offer: OfferEntity) {
    if (status === true) {
      this.isValid = true;
      this.offer = offer;
    } else {
      this.isValid = false;
    }
  }
}
