import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Banner from "./Banner";

function ModerationScreen() {
  const { id } = useParams(); // get the image_id from the URL
  const [imageData, setImageData] = useState(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const API_GATEWAY_KEY = process.env.REACT_APP_API_GATEWAY_KEY;
  const gatewayUrl = `https://${API_GATEWAY_KEY}.execute-api.us-east-1.amazonaws.com`

  useEffect(() => {
    axios
      .get(
        `${gatewayUrl}/prod/moderate/${id}`
      )
      .then((response) => setImageData(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSafeClick = () => {
    axios
      .post(
        `${gatewayUrl}/prod/moderate/safe`,
        {
          image_id: id,
        }
      )
      .then(() => {
        setBannerMessage("Marked as safe!");
        setBannerOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleUnsafeClick = () => {
    axios
      .post(
        `${gatewayUrl}/prod/moderate/unsafe`,
        {
          image_id: id,
        }
      )
      .then(() => {
        setBannerMessage("Marked as unsafe!");
        setBannerOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleBannerClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBannerOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2">
        Image ID: {id}
      </Typography>
      {imageData && (
        <Box>
          {console.log(imageData.s3_url)}
          <img src={imageData.s3_url} alt="To be moderated" />
          <Typography variant="h6" component="h3">
            Moderation Labels: {imageData.moderation_labels}
          </Typography>
          <Button variant="contained" onClick={handleSafeClick}>
            Safe
          </Button>
          <Button variant="contained" onClick={handleUnsafeClick}>
            Unsafe
          </Button>
          <Banner
            open={bannerOpen}
            handleClose={handleBannerClose}
            message={bannerMessage}
          />
        </Box>
      )}
    </Box>
  );
}

export default ModerationScreen;
