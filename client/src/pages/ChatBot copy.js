import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
    CircularProgress,
} from "@mui/material";
import "./Paragraph.css"; // Import CSS file containing animation

const ChatBot = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const [loading, setLoading] = useState(false);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the request
    try {
      const { data } = await axios.post("/api/v1/openai/chatbot", { text });
      console.log(data);
      setResponse(data.chatbotResponse);
      setShowResponse(true);
      setLoading(false);
      
    } catch (err) {
      console.log(error);
      setLoading(false);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  // Function to reveal characters of the response one by one
  const revealText = () => {
    const characters = response.split("");
    let revealedText = "";
    characters.forEach((char, index) => {
      setTimeout(() => {
        revealedText += char;
        setResponse(revealedText);
      }, index * 10); // Adjust the delay (currently set to 10 milliseconds)
    });
  };

  useEffect(() => {
    if (showResponse) {
      revealText();
    }
  }, [showResponse]);

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Ask with Chatbot</Typography>

        <TextField
          placeholder="add your text"
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Chat
        </Button>
        <Typography mt={2}>
          not this tool ? <Link to="/">GO BACK</Link>
        </Typography>
      </form>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="500px"
        >
          <CircularProgress />
        </Box>
      ) : response && showResponse ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
            overflowY: "auto",
          }}
        >
          <Typography className="reveal-animation" p={2}>
            {response}
          </Typography>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "450px",
            }}
          >
            Bot Response
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default ChatBot;
