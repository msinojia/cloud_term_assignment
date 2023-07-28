import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";

import { s3, s3BucketName } from "./aws";
import Banner from "./Banner";

const UploadForm = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadSuccess(false);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async () => {
    const filename = uuidv4() + "_" + selectedFile.name;
    const uploadParams = {
      Bucket: s3BucketName,
      Key: filename,
      Body: selectedFile,
    };

    try {
      await s3.upload(uploadParams).promise();
      setUploadSuccess(true); // Change this line
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Box component="form" sx={{ "& > :not(style)": { m: 1 } }}>
        <input type="file" onChange={onFileChange} />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Upload
        </Button>
      </Box>
      {uploadSuccess && (
        <Banner
          open={uploadSuccess}
          handleClose={handleClose}
          message={"Photo uploaded successfully!"}
        />
      )}
    </div>
  );
};

export default UploadForm;
