import AWS from "aws-sdk";

const s3BucketName = "photo-hoster-images";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIAQWSBQAI3MBMKKFJH",
  secretAccessKey: "mORsvBPBju1vgEwm1ps3eC3doYojJq+lfe1Ji5l+",
  sessionToken:
    "FwoGZXIvYXdzEEUaDM89NlBkF2I1JAZO7iLAAe0Pg6hG2g0G2xb+YpfTBrpVSjMHYudIfVfwaI8ofNhZVhvdv6XvFlvMwquVqbYKS1Nwu+8N1HCYXaPTZZc3CGd7K5XOB08D2LKRa+UXRETP07KREn2XSmF/5srPU/H1/RhwPAQpoh2GuffGtbQL0dsc4mTQZqky4uH31eBFgrAikAy1wfUm2Do3YZtSf1+oC74eWRpEtCfmmfioK13bcGtwhzGL0j73d3dpEU8FzMNtOu0RoJhZxEN/FWHW06ZPyijL9aGmBjItxDOGvru7RKJfaF9XoU9uRa+zkHP0FIQrMfuOzOo1D0116qsrEYzDtJ29IT5V",
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export { s3, s3BucketName };
