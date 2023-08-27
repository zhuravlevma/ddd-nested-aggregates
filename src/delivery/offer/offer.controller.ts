import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { UpdateOfferUseCase } from './domain/ports/in/update-offer.use-case';
import { OfferEntity } from './domain/entities/offer.entity';
import { CreateOfferUseCase } from './domain/ports/in/create-offer.use-case';

@ApiTags('delivery')
@Controller('/delivery/offers')
export class OfferController {
  constructor(
    private readonly updateOfferUseCase: UpdateOfferUseCase,
    private readonly createOfferUseCase: CreateOfferUseCase,
  ) {}

  @ApiOkResponse({
    description: 'Saved offer with orders',
  })
  @Patch('/:offerId')
  async updateOrderStatus(
    @Param('offerId') offerId: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<OfferEntity> {
    return this.updateOfferUseCase.execute({
      offerId,
      deliverymanId: updateOfferDto.deliverymanId,
    });
  }
}
