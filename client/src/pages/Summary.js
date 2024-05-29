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

const Summary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  useEffect(() => {
    // Check if user is authenticated by looking for authToken in local storage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // If authToken is not found, redirect to login page and display message
      navigate("/login");
      toast.error("Please login first");
    }
  }, [navigate]);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(false);

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/openai/summary", { text });
      console.log(data);
      setSummary(data.chatbotResponse);
      setShowSummary(true);
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

  // Function to reveal characters of the summary response one by one
  const revealText = () => {
    const characters = summary.split("");
    let revealedText = "";
    characters.forEach((char, index) => {
      setTimeout(() => {
        revealedText += char;
        setSummary(revealedText);
      }, index * 10); // Adjust the delay (currently set to 10 milliseconds)
    });
  };

  useEffect(() => {
    if (showSummary) {
      revealText();
    }
  }, [showSummary]);

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
        <Typography variant="h3">Summarize Text</Typography>

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
          Submit
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
      ) : summary && showSummary ? (
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
            {summary}
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
            Summary Will Appear Here
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default Summary;