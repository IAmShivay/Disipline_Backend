"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.uploadToMinIO = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = require("crypto");
const dotenv_1 = require("dotenv");
// Configure Cloudinary
(0, dotenv_1.configDotenv)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);
// Configure S3 client for MinIO
const s3Client = new client_s3_1.S3Client({
    endpoint: process.env.MINIO_ENDPOINT,
    region: process.env.MINIO_REGION,
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
    },
    forcePathStyle: true, // Needed for MinIO
});
const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: "discipline_backend" }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result.secure_url);
        });
        const readableStream = new stream_1.Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const uploadToMinIO = async (file) => {
    const key = `${(0, crypto_1.randomUUID)()}-${file.originalname}`;
    await s3Client.send(new client_s3_1.PutObjectCommand({
        Bucket: process.env.MINIO_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    }));
    return `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/${key}`;
};
exports.uploadToMinIO = uploadToMinIO;
const uploadFile = async (file) => {
    if (process.env.STORAGE_SERVICE === "MINIO") {
        return (0, exports.uploadToMinIO)(file);
    }
    else {
        return (0, exports.uploadToCloudinary)(file);
    }
};
exports.uploadFile = uploadFile;
