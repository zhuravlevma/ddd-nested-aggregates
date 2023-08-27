import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BillOfLadingMapper as ReportMapper } from './report.mapper';
import { FindReportByIdPort } from '../domain/ports/out/find-report-by-id.port';
import { SaveReportPort } from '../domain/ports/out/save-report.port';
import { ReportEntity } from '../domain/entities/report.entity';
import { ReportOrmEntity } from './orm-entities/report.orm-entity';
import { OfferMapper } from 'src/delivery/offer/dal/offer.mapper';

@Injectable()
export class ReportRepository implements FindReportByIdPort, SaveReportPort {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(ReportOrmEntity)
    private reportRepository: Repository<ReportOrmEntity>,
  ) {}
  async findReportById(reportId: string): Promise<ReportEntity> {
    const [order] = await this.reportRepository.find({
      where: { id: reportId },
      relations: {
        positions: true,
      },
    });
    return ReportMapper.mapToDomain(order);
  }

  async save(report: ReportEntity): Promise<ReportEntity> {
    const reportOrm = ReportMapper.mapToOrm(report);
    const savedReport = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        if (report.offer) {
          await transactionalEntityManager.save(
            OfferMapper.mapToOrm(report.offer),
          );
        }
        return await transactionalEntityManager.save(reportOrm);
      },
    );
    return ReportMapper.mapToDomain(savedReport);
  }
}
