import AWS from "aws-sdk";

const s3BucketName = "photo-hoster-images";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIAQWSBQAI3M6GH7BRX",
  secretAccessKey: "nZfXJb7nrohWFUij1x1NNhGQNnklVYRPPZ0U+G7i",
  sessionToken:
    "FwoGZXIvYXdzEDwaDFtOLmqsPrL0pWSlmSLAARXBkjaHBgxqyTAkCtAvg2WT5H6BmgzfZY6FWE0CkWpii1IFFUw17OokeEt66BGd26sLBJB8kG8JTfEFamtRCLpfwKwhkSEjVE+KNReQsUinlJbLqY99RIeSOlmUB9Y5vgqPdrbqKrTpXEiy6VBXSVym62Q63y8qpltUHu8vyT/63Kg9ehOUwoWFhJu3M869Rz4jDD/+C2eBL70/YSj0z1b0b6cP7QLdB0FLvMtG2icsVwUQFBSDIFPa4tduiCkMryjX75+mBjItJqGywcu8L1Mp0yCOUPyKSqWXxgze/5Fe0qfW5NEn3AvaeVQqAtVMqn3w3NFr",
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export { s3, s3BucketName };
