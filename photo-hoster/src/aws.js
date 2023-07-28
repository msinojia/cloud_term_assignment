import AWS from "aws-sdk";

const s3BucketName = "msinojia-images";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIAQWSBQAI3CSRQARWB",
  secretAccessKey: "rJnwbNlVjgoS87O7fzOOVEmLTTbgaIe30eF6NFwi",
  sessionToken:
    "FwoGZXIvYXdzEPb//////////wEaDF/zRPTSHdyiVJcbaiLAAQjYQhmiJQfmBW9nmCH7E1fIOizQw8W0UXiBG4dhtJ0Oy09/+7cY6M6dvyVJyYjMdzziQOI1Tm5WXgxX8hbOOuQW7BMXmr4TwS6YCPKvSyHCxkRNfNXZosohuX9UVJUlA5NmJkmvkTq6Tctlxco0fkH9I02Blb6be0R63vPqfLkqXKy7HNjEIpGHFEkf0cppZUiSbKwYkvmFrXmFL8uJ5r5u2jvML3ENWSyn6mps6EfdruBXgzqQ0+mNxkd9nakKAyiLxpCmBjItpfpAaObur+7lLCS0XCBaeQI1JG1ky+WENUZ+7PacvymGZNsWbOMZMTUJi2xd",
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export { s3, s3BucketName };
