import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import TypingEffect from "../components/TypingEffect";
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
 const navigate = useNavigate();
  useEffect(() => {
    // Check if user is authenticated by looking for authToken in local storage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // If authToken is not found, redirect to login page and display message
      navigate("/login");
      toast.error("Please login first");
    }
  }, [navigate]);

  const theme = useTheme();
 
  // Media queries
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // States
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the request
    setInputDisabled(true); // Disable the input field
    try {
      const { data } = await axios.post("/api/v1/openai/chatbot", { text });
      console.log(data);
      setConversation([...conversation, { user: text }, { bot: data.chatbotResponse }]);
      setLoading(false);
      setText(""); // Clear the input field after submitting
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
    } finally {
      setInputDisabled(false); // Enable the input field regardless of success or failure
    }
  };

  // Render conversation
  const renderConversation = () => {
    return conversation.map((item, index) => {
      if (item.user) {
        return (
          <div key={index} className="message-container user">
          
            <div className="message user-message">
              {item.user}
              </div>
     
          </div>
        );
      } else if (item.bot) {
        return (
          <div key={index} className="message-container bot">
            <div className="message bot-message">
            <TypingEffect text={item.bot} delay={10} />
              </div>
          </div>
        );
      }
    });
  };

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

        <div className="chat-container">
          {renderConversation()}
          {loading && (
          <div className="loader">
            <CircularProgress />
          </div>
        )}
        </div>

        <TextField
          placeholder="Ask Your Query Here"
          type="text"
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={inputDisabled}
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

    </Box>
  );
};

export default ChatBot;
