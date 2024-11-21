import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { configDotenv } from "dotenv";

// Configure Cloudinary
configDotenv();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

// Configure S3 client for MinIO
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  region: process.env.MINIO_REGION,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true, // Needed for MinIO
});

export const uploadToCloudinary = async (
  file: Express.Multer.File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "discipline_backend" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      }
    );

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

export const uploadToMinIO = async (
  file: Express.Multer.File
): Promise<string> => {
  const key = `${randomUUID()}-${file.originalname}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.MINIO_BUCKET_NAME!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/${key}`;
};

export const uploadFile = async (
  file: Express.Multer.File
): Promise<string> => {
  if (process.env.STORAGE_SERVICE === "MINIO") {
    return uploadToMinIO(file);
  } else {
    return uploadToCloudinary(file);
  }
};
