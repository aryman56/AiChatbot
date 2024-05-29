import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import { LogoutIcon, HomeIcon, SignInIcon, SignUpIcon } from "./Icons"; // Import icons as needed

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      boxShadow={3}
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        AI GPT3 Clone
      </Typography>
      <Box display="flex" alignItems="center">
          {/* <img src="chatgpt.svg" alt="ChatGPT Icon" style={{ height: "30px", marginRight: "8px" }} />   */}
        <NavLink to="/" p={1} sx={styles.link}>
         
          <Typography variant="body1">Home</Typography>
        </NavLink>
        {loggedIn ? (
          <NavLink to="/login" onClick={handleLogout} p={1} sx={styles.link}>
          
            <Typography variant="body1">Logout</Typography>
          </NavLink>
        ) : (
          <>
            <NavLink to="/register" p={1} sx={styles.link}>
         
              <Typography variant="body1">Sign Up</Typography>
            </NavLink>
            <NavLink to="/login" p={1} sx={styles.link}>
            
              <Typography variant="body1">Sign In</Typography>
            </NavLink>
          </>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
};

export default Navbar;
