import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { ReportPositionOrmEntity } from './dal/orm-entities/report-position.orm-entity';
import { ReportOrmEntity } from './dal/orm-entities/report.orm-entity';
import { ReportRepository } from './dal/report.repository';
import { CreateReportInteractor } from './domain/interactors/create-report.interactor';
import { FindReportByIdInteractor } from './domain/interactors/find-report-by-id.interactor';
import { UpdateReportInteractor } from './domain/interactors/update-report.interactor';
import { CreateReportUseCase } from './domain/ports/in/create-report.use-case';
import { FindReportByIdUseCase } from './domain/ports/in/find-report-by-id.use-case';
import { UpdateReportUseCase } from './domain/ports/in/update-report.use-case';
import { FindPositionByIdPort } from './domain/ports/out/find-position-by-id.port';
import { FindReportByIdPort } from './domain/ports/out/find-report-by-id.port';
import { SaveReportPort } from './domain/ports/out/save-report.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportOrmEntity, ReportPositionOrmEntity]),
  ],
  controllers: [ReportController],
  providers: [
    {
      provide: UpdateReportUseCase,
      useFactory: (a, b) => new UpdateReportInteractor(a, b),
      inject: [FindReportByIdPort, SaveReportPort],
    },
    {
      provide: CreateReportUseCase,
      useFactory: (a) => new CreateReportInteractor(a),
      inject: [SaveReportPort],
    },
    {
      provide: FindReportByIdUseCase,
      useFactory: (a) => new FindReportByIdInteractor(a),
      inject: [FindReportByIdPort],
    },
    {
      provide: FindReportByIdPort,
      useClass: ReportRepository,
    },
    {
      provide: FindPositionByIdPort,
      useClass: ReportRepository,
    },
    {
      provide: SaveReportPort,
      useClass: ReportRepository,
    },
  ],
})
export class AccountingModule {}
