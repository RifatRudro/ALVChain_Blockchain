import { appConfig } from "@/config/app.config";
import { RedisCacheService } from "@/providers/cache/redis/redis-cache.service";
import { Injectable } from "@nestjs/common";
import { StorageClient } from "./StorageClient";

@Injectable()
export class StorageService extends StorageClient {
  // constructor(storageOptions: ClientOptions, bucket_name:string,private readonly rs: RedisCacheService) {
  //   super(storageOptions,bucket_name,rs);
  // }
  constructor(private readonly rs: RedisCacheService) {
    super(
      {
        endPoint: appConfig.STORAGE_SERVICE_ENDPOINT,
        // port: appConfig.STORAGE_SERVICE_PORT,
        useSSL: appConfig.STORAGE_SERVICE_USE_SSL,
        accessKey: appConfig.STORAGE_SERVICE_ACCESS_KEY,
        secretKey: appConfig.STORAGE_SERVICE_SECRET_KEY,
      },
      appConfig.STORAGE_SERVICE_BUCKET_NAME,
      rs,
    );
    // console.log({
    //   endPoint: appConfig.STORAGE_SERVICE_ENDPOINT,
    //   // port: appConfig.STORAGE_SERVICE_PORT,
    //   useSSL: appConfig.STORAGE_SERVICE_USE_SSL,
    //   accessKey: appConfig.STORAGE_SERVICE_ACCESS_KEY,
    //   secretKey: appConfig.STORAGE_SERVICE_SECRET_KEY,
    // });
  }
}
