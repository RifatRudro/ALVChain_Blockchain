import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAssetMapping } from './entities/user_asset_mapping.entity';
import { CreateUserAssetMappingDto } from './dto/user_asset_mapping.dto';
import { AssetTypeService } from '../asset_category/asset_category.service';
import { LiabilityService } from '../liabilities/liabilities.service';

@Injectable()
export class UserAssetMappingService {
  constructor(
    @InjectRepository(UserAssetMapping)
    private userAssetMappingRepository: Repository<UserAssetMapping>,
    @Inject(forwardRef(() => AssetTypeService))
    private assetTypeService: AssetTypeService, 
    @Inject(forwardRef(() => LiabilityService))
    private liabilityService: LiabilityService

  ) { }

  async getMaximumLoanAmountByProperty(asset_type_id: number, number_of_unit: number,document_id:number) {
    try {
      const assetType = await this.assetTypeService.findOne(asset_type_id);
      if (!assetType) {
        throw new NotFoundException('Asset Type not found');
      }
      if (!number_of_unit) {
        throw new NotFoundException('Loan unit not found');
      }

      const userLoanMapping = await this.userAssetMappingRepository.findOne({where:{document_id:document_id, asset_type:asset_type_id}});
      if(userLoanMapping){
        const activeLiability = await this.liabilityService.findOneByFindOptions({where:{user_asset_mapping_id:userLoanMapping.id, status:true}});
        if(activeLiability){
          return "You have an active loan with this document. Please clear the loan to get another loan";
        }
      }
      //!assuing the current price for that property 
      const currentPropertyPrice = 1000000;
      const loanAmount = +assetType.cf * number_of_unit * currentPropertyPrice;
      return "You will get maximum loan amount of " + loanAmount.toFixed(0) + " BDT for " + number_of_unit + " unit " + assetType.title+" asset";
    } catch (error) {
      throw error;
    }
  }

  async create(createUserAssetMappingDto: CreateUserAssetMappingDto){
   try {
    const userLoanMapping = await this.userAssetMappingRepository.find({where:{user_id:createUserAssetMappingDto.user_id, document_id:createUserAssetMappingDto.document_id, asset_type:createUserAssetMappingDto.asset_type}});
    if(userLoanMapping){
      for await(const obj of userLoanMapping){
        const activeLiability = await this.liabilityService.findOneByFindOptions({where:{user_asset_mapping_id:obj.id, status:true}});
      if(activeLiability){
        return "You have an active loan with this document. Please clear the loan to get another loan";
      }
      }
    }
    const userAssetMapping = this.userAssetMappingRepository.create(createUserAssetMappingDto);
    const res =  await this.userAssetMappingRepository.save(userAssetMapping);

   if(res){
    await this.liabilityService.create({user_asset_mapping_id:res.id});
   }
    return res;
   } catch (error) {
    throw error;
   }
  }

  async clearLoan(document_id: number): Promise<any> {
    try {
      const userLoanMapping = await this.userAssetMappingRepository.findOne({where:{document_id:document_id}});
      if(userLoanMapping){
        const activeLiability = await this.liabilityService.findOneByFindOptions({where:{user_asset_mapping_id:userLoanMapping.id, status:true}});
        if(activeLiability){
          await this.liabilityService.update(activeLiability.id,{status:false});
          return "Loan cleared successfully";
        }
        return "No active loan found";
      }
      return "No loan found with this document";
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<UserAssetMapping[]> {
    return this.userAssetMappingRepository.find();
  }

  async findOne(id: number): Promise<UserAssetMapping | any> {
    return this.userAssetMappingRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserAssetMappingDto: CreateUserAssetMappingDto): Promise<UserAssetMapping | any> {
    await this.userAssetMappingRepository.update(id, updateUserAssetMappingDto);
    return this.userAssetMappingRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.userAssetMappingRepository.delete(id);
  }
}
