import AWS from "aws-sdk";

const s3BucketName = "photo-hoster-images";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIAQWSBQAI3EJ6X5ZHK",
  secretAccessKey: "tU+P18aFFnF+F/CPP8FDfN5h4uWQaFt22Cu3A4uh",
  sessionToken:
    "FwoGZXIvYXdzEFkaDC2h38FBJYp9yzwOFCLAAbb22NM9x1ZYZveCh6ahfoH8J2Ll48fUeSViMVo41tDQgf5B5enpwnxjj0PfEyWhfiQ5xcPvR5oMDJhhysbQIyQ9BuG7kkXbuvUvngKAGH1zRmI+SKspzVZ3hnBKtMqfu4Cfi4pd5pzf1cpyyS4VLXUosWZHzQEWJH/OJiTtgOvNogzzkerlQKX50DZVZPXd4LcrdK3Hi4UZT+OMpE7sn3e4RJN14ux9n9zpt34MKyXIitTIHUXBnU4K2gjFUU9g4SiZsaamBjItvLlbqA9dmR431qQrpxj2E9HlC632XALiPHSDH8B29/PgWGBebRP1fM04rhQR",
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export { s3, s3BucketName };
