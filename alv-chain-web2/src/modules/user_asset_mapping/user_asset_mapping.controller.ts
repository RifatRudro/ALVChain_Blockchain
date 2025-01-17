import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserAssetMapping } from './entities/user_asset_mapping.entity';
import { UserAssetMappingService } from './user_asset_mapping.service';
import { CreateUserAssetMappingDto } from './dto/user_asset_mapping.dto';

@Controller('user-asset-mapping')
export class UserAssetMappingController {
  constructor(private readonly userAssetMappingService: UserAssetMappingService) {}

  @Post()
 async create(@Body() createUserAssetMappingDto: CreateUserAssetMappingDto) {
    return await this.userAssetMappingService.create(createUserAssetMappingDto);
  }

  @Get()
  findAll(): Promise<UserAssetMapping[]> {
    return this.userAssetMappingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserAssetMapping> {
    return this.userAssetMappingService.findOne(+id);
  }
  @Get('get-maximum-loan-amount/:asset_type_id/:number_of_unit/:document_id')
  getMaximumLoanAmountByProperty(@Param('asset_type_id') asset_type_id: number, @Param('number_of_unit') number_of_unit: number, @Param('document_id') document_id: number) {
    return this.userAssetMappingService.getMaximumLoanAmountByProperty(asset_type_id, number_of_unit,document_id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserAssetMappingDto: CreateUserAssetMappingDto): Promise<UserAssetMapping> {
    return this.userAssetMappingService.update(+id, updateUserAssetMappingDto);
  }

  @Put('clear-loan/:id')
  clearLoan(@Param('id') id: string, ){
    return this.userAssetMappingService.clearLoan(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userAssetMappingService.remove(id);
  }
}