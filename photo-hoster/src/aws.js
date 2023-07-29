import AWS from "aws-sdk";

const s3BucketName = "photo-hoster-images";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "ASIAQWSBQAI3NI4ARWET",
  secretAccessKey: "W9x1Qw9kE8/5aln6kkbwrAABuSLLxAF90GO/gcVz",
  sessionToken:
    "FwoGZXIvYXdzEAwaDKxrJD5o9NT1Movv9CLAAaACGTPkG8ZiPp6gNYPYkAvRNmiac2VomLeH29+0V1XKX4ShQBPV9kSIMi9NYqEXO/OexfIPDQwS4QNGsfrTOXgQvmsySUKUAtnTwNZVM7AsYR8Uv8XcwBkjp9KywR7mQbJ7zhWlEpjz7K9UCWQnrl9CXIbQL4oVZ+yJhk7qW9dCas2dkp8imz6UcheHcrAXqX1VbKkkgT7I7gqsTYNzYDE1h6d4HdLaRuj7J3wkTh80pVuR81+VuQxZ0Ryxxp12xij9r5WmBjItNCuTQRj+0ffRoxAqZZknUYF0y6oSOtjsrC/Ljg2rXBQFr1ikODYF5BeR04Bg",
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export { s3, s3BucketName };
