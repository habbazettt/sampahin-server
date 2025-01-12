const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    credentials: {
        type: "service_account",
        project_id: "sampahin-446009",
        private_key_id: "25a5d6cc04be1c7a3b17a9cf26332d7177559d15",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNG2C5+PEHk4OD\nRXGCAUjoGgPJtDL9Pt7ZJPGAFxCcu0CfviwVmZ4RYGeleIUK2+sCXdY5ksALV1sf\njTYxagsZKOhLIKboDEz1argHLkpVKtf4KgxM7gXSwTYbU6FnsgQzjdQKlwVbbu1+\nOVY9UpKd+RHyehlBDGYSGMgux0/phsQwtPQPxOIKKkBDvjn5YnwkFX/JlnE4fbjX\nepdAnDtEliBZoWLYE5o5QZH/xasgB60R+O/7ufc1Ll1nifeSS8ZWjaRPo/id+Bkt\nfKHpsJS8XWjD5E0UEgbIWZalvHlUxqKaaN6MKv4fbBbA+NVLQfa+H2XqvCoJJh9M\nyQ9Q2PhLAgMBAAECggEAMDt9cg5QA/OVDCQi7qsFrYsck+y7xuDnf9HXtsL1xZ2l\nM0uBy2yOBtEQXpGqW6TerXZKn8xaO/CFfbRz54fj5z0+7xfVGCF4YYgAkbO5iDCk\ni/e7X8Xjea203xU6EgwDP+pc0Ea2XEuILtQl6xLFZr/BEC/VS34ybJQGUzXMnYIH\nKx7A73u0e8dWsM9KZEK3CyAHDCemu1ZzASZdiJWZnX9TlA0XjRjkBPxn92CJKCXF\nbwPEh+ntnJRKU4i7su4haKnJsyPT7TaKTZuAu/QL4tYWzB0Qcz4M/q/zKbFHjTcl\nrmSGzA+hDaMbGNfa8FpnibDhPm7/cE2orGV1OvwA1QKBgQDxWXw9xdS3oz6Ch2G3\n7PDCaUspgGZup0bVh3+I8tF1DQuiWMUAft7Snv6P8Ajjz77ZI/jVqQT/hLMzM2CM\nddz+3fUqJ6HkyugVq5ehp7Ihj4i2G0+KeGtb8koXjyjnynhddA8uWNqPP3grs7TC\nCA+qF7EhLEddmN0xoT6wcP83dQKBgQDZjrDmW2b55fTLbddzZZoTqgMaKNFYkhu/\njB90rZoZz1/iQKtJ6zv0JZ7ot3u4nB+Bt5zcHKnt2wYAPTJ5zx6qyZACAqQqjC8g\nM02Nl80zdzcXPA48NBtFvOM0rU4sEFx9pr/s+GEzMgqlekSV40ENQLTdwlB0tghg\n6GSDGHk4vwKBgHmq0NUbO+bvZn3K3doomh6Hkhpz3i9+KFlQm1xgfHLzhp/q/DUJ\nwC6RdGb/bJvbiKxSVAjx0dE2BliTV+K3MBdTsVn07Mo399Ok0yXtMgF1KEgVcH2v\nwv9xHyTNSKPBD/icn2KP7G42YtA1IbSG986ZbvP4LGnku+1fCglMjXxZAoGAYRXa\nP5I+a/qAuV91LBwFHA1cgQoCEiJxm5MuXmUyRZ5TTaZKShxdjuBS/8sRvRp+vOZx\na5CnDGwXS3gD1HPnXZPBXgRLumkAhsAeNbeubO8geI/mUlt2aDKYueM05VkPzUri\njx9wUOZd9eaQQMs/NmjPzb5vJQYuywAqCo6bWgUCgYEAsZZRj6Vr25H2etWnMJTo\nl0Sh7A1kgSY7uMSfya9HG8O08Rv3pRo2zLmLbVkIUOK9e1H6YDTWc4OQFFFDBAXy\n96PO9OmI4qKco00zpSJLXhsXuqHg+JPvIyPg4O/6g/6w2ghe6/XQU4xhhikOpCRl\nOPkzXRYnCaIjzY6MgBxwIMo=\n-----END PRIVATE KEY-----\n",
        client_email: "sampahin-service@sampahin-446009.iam.gserviceaccount.com",
        client_id: "108470377024734410635",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/sampahin-service%40sampahin-446009.iam.gserviceaccount.com",
        universe_domain: "googleapis.com"
    }
})

const bucketName = "sampahin-image"
const bucket = storage.bucket(bucketName);

const multerStorage = multer.memoryStorage();

const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File hanya mendukung PNG, JPG, dan JPEG'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 2 }
});

const uploadFile = async (file) => {
    const filename = Date.now() + '-sampahin';
    const filePath = `${filename}`;
    const blob = bucket.file(filePath);

    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype,
        },
    });

    return new Promise((resolve, reject) => {
        blobStream
            .on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
                resolve(publicUrl);
            })
            .on('error', (err) => {
                reject('Gagal upload gambar, ulangi upload gambar');
            })
            .end(file.buffer);
    });
}



module.exports = { uploadFile, upload };