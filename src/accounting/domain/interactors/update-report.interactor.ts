import { ReportEntity } from '../entities/report.entity';
import {
  UpdateReprotCommand as UpdateReportDto,
  UpdateReportUseCase,
} from '../ports/in/update-report.use-case';
import { FindReportByIdPort } from '../ports/out/find-report-by-id.port';
import { SaveReportPort } from '../ports/out/save-report.port';

export class UpdateReportInteractor implements UpdateReportUseCase {
  constructor(
    private readonly findReportById: FindReportByIdPort,
    private readonly saveReportPort: SaveReportPort,
  ) {}

  async execute(updatePositionDto: UpdateReportDto): Promise<ReportEntity> {
    const report = await this.findReportById.findReportById(
      updatePositionDto.reportId,
    );

    return this.saveReportPort.save(report);
  }
}
