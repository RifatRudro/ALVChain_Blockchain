import { StorageService } from "@/providers/storage/storage.service";
import { DynamicModule, Global, Module } from "@nestjs/common";
import type { ClientOptions } from "minio";
@Global()
@Module({providers:[StorageService],exports:[StorageService]})
export class StorageModule {
  // constructor(private readonly redisCacheService:RedisCacheService){}
  // static register(storageOptions: ClientOptions, bucket_name:string): DynamicModule {
  //   const service = new StorageService(storageOptions,);
  //   return {
  //     module: StorageModule,
  //     providers: [
  //       {
  //         provide: StorageService,
  //         useValue: service,
  //       },
  //     ],
  //     exports: [StorageService],
  //     global: true,
  //   };
  // }
}
