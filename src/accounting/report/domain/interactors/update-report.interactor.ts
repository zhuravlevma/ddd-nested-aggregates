import { OfferEntity } from 'src/delivery/offer/domain/entities/offer.entity';
import { ReportEntity } from '../entities/report.entity';
import {
  UpdateReprotCommand as UpdateReportDto,
  UpdateReportUseCase,
} from '../ports/in/update-report.use-case';
import { FindReportByIdPort } from '../ports/out/find-report-by-id.port';
import { SaveReportPort } from '../ports/out/save-report.port';
import { v4 as uuid } from 'uuid';

export class UpdateReportInteractor implements UpdateReportUseCase {
  constructor(
    private readonly findReportById: FindReportByIdPort,
    private readonly saveReportPort: SaveReportPort,
  ) {}

  async execute(updatePositionDto: UpdateReportDto): Promise<ReportEntity> {
    const report = await this.findReportById.findReportById(
      updatePositionDto.reportId,
    );

    if (updatePositionDto.isValid === true) {
      const offer = new OfferEntity({
        id: uuid(),
        name: 'test',
        orderId: 'test',
        deliverymanId: null,
      });
      report.updateReportStatus(updatePositionDto.isValid, offer);
    }

    return this.saveReportPort.save(report);
  }
}
