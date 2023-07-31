import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import Banner from "./Banner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function ModerationScreen() {
  const { id } = useParams(); // get the image_id from the URL
  const [imageData, setImageData] = useState(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const API_GATEWAY_KEY = process.env.REACT_APP_API_GATEWAY_KEY;
  const gatewayUrl = `https://${API_GATEWAY_KEY}.execute-api.us-east-1.amazonaws.com`;

  useEffect(() => {
    axios
      .get(`${gatewayUrl}/prod/moderate/${id}`)
      .then((response) => setImageData(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSafeClick = () => {
    axios
      .post(`${gatewayUrl}/prod/moderate/safe`, {
        image_id: id,
      })
      .then(() => {
        setBannerMessage("Marked as safe!");
        setBannerOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleUnsafeClick = () => {
    axios
      .post(`${gatewayUrl}/prod/moderate/unsafe`, {
        image_id: id,
      })
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F0F8FF",
      }}
    >
      <Card sx={{ border: "1px solid #3f51b5", minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              marginBottom: "1em",
              color: "#0d47a1",
              fontWeight: "bold",
              marginTop: "1em",
              padding: "0.5em", // add padding around the text
              backgroundColor: "#e3f2fd", // add a light grey background color
              border: "2px solid #3f51b5", // add a border around the text
              background: "linear-gradient(45deg, #e3f2fd 30%, #BBDEFB 90%)",
            }}
          >
            Image ID: {id}
          </Typography>
          {imageData && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  overflow: "hidden",
                  marginBottom: "1em",
                }}
              >
                <img
                  src={imageData.s3_url}
                  alt="To be moderated"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "#0d47a1",
                  fontWeight: "bold",
                  marginTop: "1em",
                  padding: "0.5em", // add padding around the text
                  backgroundColor: "#e3f2fd", // add a light grey background color
                  border: "2px solid #3f51b5", // add a border around the text
                  background:
                    "linear-gradient(45deg, #e3f2fd 30%, #BBDEFB 90%)",
                }}
              >
                Moderation Labels:
              </Typography>
              <Paper
                variant="outlined"
                sx={{ padding: "1em", marginBottom: "1em" }}
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          backgroundColor: "#f5f5f5", // Change the background color of the header row
                        }}
                      >
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            border: "1px solid #ddd",
                            padding: "10px",
                            fontSize: "20px",
                          }}
                        >
                          Confidence
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            border: "1px solid #ddd",
                            padding: "10px",
                            fontSize: "20px",
                          }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            border: "1px solid #ddd",
                            padding: "10px",
                            fontSize: "20px",
                          }}
                        >
                          Parent Name
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {JSON.parse(imageData.moderation_labels).map(
                        (item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              backgroundColor:
                                index % 2 !== 0 ? "#f2f2f2" : "white", // Alternate the background color of rows
                            }}
                          >
                            <TableCell
                              sx={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                fontSize: "20px",
                              }}
                            >
                              {item.Confidence}
                            </TableCell>
                            <TableCell
                              sx={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                fontSize: "20px",
                              }}
                            >
                              {item.Name}
                            </TableCell>
                            <TableCell
                              sx={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                fontSize: "20px",
                              }}
                            >
                              {item.ParentName}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "1em",
                }}
              >
                <ButtonGroup variant="outlined">
                  <Button
                    color="success"
                    sx={{ fontSize: "20px" }}
                    onClick={handleSafeClick}
                  >
                    Safe
                  </Button>
                  <Button
                    color="error"
                    sx={{ fontSize: "20px" }}
                    onClick={handleUnsafeClick}
                  >
                    Unsafe
                  </Button>
                </ButtonGroup>
              </Box>
              {bannerOpen && (
                <Banner
                  open={bannerOpen}
                  handleClose={handleBannerClose}
                  message={bannerMessage}
                />
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ModerationScreen;
