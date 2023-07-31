import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { v4 as uuidv4 } from "uuid";

import { s3, s3BucketName } from "./aws";
import Banner from "./Banner";

const UploadForm = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [previewSrc, setPreviewSrc] = useState();

  const fileInputRef = React.useRef();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadSuccess(false);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewSrc(URL.createObjectURL(event.target.files[0]));
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
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Card
        variant="outlined"
        sx={{
          padding: 2,
          maxWidth: 400,
          margin: "auto",
          border: "1px solid #3f51b5",
          backgroundColor: "#F0F8FF",
        }}
      >
        <CardContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            {!selectedFile && (
              <>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Choose File
                  </Button>
                </label>
              </>
            )}
            {selectedFile && (
              <>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                  Upload
                </Button>
                <Box sx={{ height: 300, width: "100%", marginTop: 2 }}>
                  <img
                    src={previewSrc}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              </>
            )}
          </Box>
        </CardContent>
        {uploadSuccess && (
          <Banner
            open={uploadSuccess}
            handleClose={handleClose}
            message={"Photo uploaded successfully!"}
          />
        )}
      </Card>
    </div>
  );
};

export default UploadForm;
