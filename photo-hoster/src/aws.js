import AWS from "aws-sdk";

const s3BucketName = "msinojia-images";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIAQWSBQAI3OBX3KOHQ",
  secretAccessKey: "A7UyTfBmf2iLFP5m4wobZLh6n1W0Bvj5gqEgGi8S",
  sessionToken:
    "FwoGZXIvYXdzEFcaDFgDRNnawAcYqhzP0CLAAc9ApvXrNaVtE8kQUyHFBe5PcCBlfTOUHgESOz9dv0gRHxPXpTbWudWCrqEgXrNkflHpe9pkPj+2kEOByRHPJUhZ86p/uTiOWukG9IOVbdhXLLUNIle3dpl8kL+Z7GNoqSiJ6VtrbaS17diWKte5C8fOKqNBWxsV/IzbhcXjCvYDSsLPGsHJo2gCnReeG/ghTVXsyJkwsab3qpg88ZgXek2gNL2L3KftLkbmUV5kxsHqsinGkn63HQ0TZJdgrwYvASjPye2lBjIt1JjNV4xt7BSYHhYI2pL9eMTFea1Ky0tYmwzDlbBMP56xUSxaHhQexVc96p5U",
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export { s3, s3BucketName };
