import { ReportEntity } from 'src/accounting/report/domain/entities/report.entity';
import { OrderEntity } from './order.entity';

interface Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];
}

export class WarehouseEntity implements Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];
  report?: ReportEntity;

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
