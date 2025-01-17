import { Client, ClientOptions, RemoveOptions } from "minio";

// import mime from "mime";
import { RedisCacheService } from "@/providers/cache/redis/redis-cache.service";

export class StorageClient extends Client {
  constructor(
    options: ClientOptions,
    private readonly bucketName: string,
    private readonly redisService: RedisCacheService,
  ) {
    super(options);
  }

  async upload(path: string, file: Express.Multer.File) {
    return await this.putObject(this.bucketName, path, file.buffer, file.size, {
      mime: file.mimetype,
    });
  }
  deleteFile(
    filePath: string,
    removeOpts?: RemoveOptions | undefined,
  ): Promise<void> {
    return this.removeObject(this.bucketName, filePath, removeOpts);
  }

  async uploadPublic(path: string, file: Express.Multer.File) {
    await this.upload(`__public__/${path}`, file);
    return this.getPublicFileUrl(path);
  }

  getPublicFileStream(path: string) {
    return this.getObject(this.bucketName, `__public__/${path}`).catch(
      (err) => {
        console.error("Error accessing file : ", err);
        return null;
      },
    );
  }

  getPublicFileUrl(path: string) {
    return `/api/public-file/${path}`;
  }

  async getFileUrl(path: string, expiresInSeconds = 300) {
    const key = `storage-presigned-url:${this.bucketName}:${path}:${expiresInSeconds}`;
    const cacheUrl = await this.redisService.getClient().get(key);
    if (cacheUrl) return cacheUrl;
    // const ext = extname(path);
    // const type = mime.getType(ext);
    const url = await this.presignedGetObject(
      this.bucketName,
      path,
      expiresInSeconds,
      {
        // "Content-Type": type,
        "Content-Disposition": `inline; filename="${path}"`,
        "Cache-Control": `public, max-age=${expiresInSeconds}, immutable`,
      },
    );
    await this.redisService.getClient().set(key, url, { EX: expiresInSeconds });
    return url;
  }

  async getFileUrls(paths: string[], expiresInSeconds = 300) {
    const urls = await Promise.all(
      paths.map(async (path) => ({
        url: await this.getFileUrl(path, expiresInSeconds),
        path,
      })),
    );

    return urls.reduce((acc: Record<string, string>, { url, path }) => {
      acc[path] = url;
      return acc;
    }, {});
  }
}
