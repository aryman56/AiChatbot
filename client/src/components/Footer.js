import React from "react";
import { Box, Typography, Link, IconButton, useTheme } from "@mui/material";
import { GitHub, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      width="100%"
      backgroundColor={theme.palette.background.alt}
      p="2rem"
      textAlign="center"
      mt={"15rem"}
    >
      <Typography variant="h4" color="primary" mb={2}>
        Connect with us
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <IconButton
          component={Link}
          href="https://github.com/aryman56"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/aryman-gupta-3bb671238"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.instagram.com/aryman_gupta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary">
        Made with ❤️ by Aryman Gupta with the help of Pradyumna & Aishwarya.
      </Typography>
      <br/>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} AI GPT3 Clone. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
