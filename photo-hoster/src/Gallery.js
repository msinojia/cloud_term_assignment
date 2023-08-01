import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

const Gallery = () => {
  const [images, setImages] = useState([]);

  const API_GATEWAY_KEY = process.env.REACT_APP_API_GATEWAY_KEY;
  const gatewayUrl = `https://${API_GATEWAY_KEY}.execute-api.us-east-1.amazonaws.com`;

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(`${gatewayUrl}/prod/view`);
      setImages(response.data);
    };
    fetchImages();
  }, []);

  return (
    <Card style={{ padding: "2rem", marginTop: "2rem", marginBottom: "2rem" }}>
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper
              elevation={5}
              style={{ height: "20rem", overflow: "hidden" }}
            >
              <Box
                component="img"
                sx={{
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  transition: "0.3s",
                }}
                src={image.url}
                alt={`Image ${index}`}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default Gallery;
