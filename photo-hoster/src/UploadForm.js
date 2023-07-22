import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import { s3, s3BucketName } from "./aws";

const UploadForm = ({ setUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState();

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
    <Box component="form" sx={{ "& > :not(style)": { m: 1 } }}>
      <input type="file" onChange={onFileChange} />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Upload
      </Button>
    </Box>
  );
};

export default UploadForm;
