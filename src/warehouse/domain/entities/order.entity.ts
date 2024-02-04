import { ReportEntity } from 'src/accounting/domain/entities/report.entity';
import { v4 as uuid } from 'uuid';

interface Attributes {
  id: string;
  name: string;
  isValid: boolean;
  report?: ReportEntity | null;
}

export class OrderEntity implements Attributes {
  id: string;
  name: string;
  isValid: boolean;
  report: ReportEntity | null;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.isValid = attributes.isValid;
    this.report = attributes.report ?? null;
  }

  addReportToOrder() {
    this.report = new ReportEntity({
      id: uuid(),
      orderId: this.id,
      isValid: false,
      positions: [],
    });
  }

  changeStatus(isValid: boolean) {
    this.isValid = isValid;
  }
}
