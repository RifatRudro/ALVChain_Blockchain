import { appConfig } from "@/config";
import { ProfileModule } from "@/modules/profile/profile.module";
import { UserModule } from "@/modules/user/user.module";
import { InMemoryCacheModule } from "@/providers/cache/in-memory/in-memory-cache.module";
import { RedisCacheModule } from "@/providers/cache/redis/redis-cache.module";
import { PostgresDatabaseProviderModule } from "@/providers/database/postgres/provider.module";
import { JobProcessorModule } from "@/providers/queue/bull/provider.module";
import { StorageModule } from "@/providers/storage/storage.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { LiabilityModule } from "./modules/liabilities/liabilities.module";
import { UserAssetMappingModule } from "./modules/user_asset_mapping/user_asset_mapping.module";
import { AssetTypeModule } from "./modules/asset_category/asset_category.module";


@Module({
  imports: [
    UserModule,
    ProfileModule,
    PostgresDatabaseProviderModule,
    RedisCacheModule,
    InMemoryCacheModule,
    StorageModule,
    LiabilityModule,
    UserAssetMappingModule,
    AssetTypeModule,
    BullModule.forRoot({
      redis: {
        host: appConfig.env.REDIS_HOST,
        port: appConfig.env.REDIS_PORT,
        password: appConfig.env.REDIS_PASSWORD,
      },
    }),

    MailerModule.forRoot({
      transport: {
        host: appConfig.env.MAILER_HOST,
        port: appConfig.env.MAILER_PORT,
        secure: appConfig.env.MAILER_SECURE,
        auth: {
          user: appConfig.env.MAILER_USER,
          pass: appConfig.env.MAILER_PASSWORD,
        },
      },
      defaults: {
        from: appConfig.env.MAILER_FROM,
      },
    }),
    ...(appConfig.IS_PRIMARY_CLUSTER ? [JobProcessorModule] : []),
  ],
})
export class AppModule {}
