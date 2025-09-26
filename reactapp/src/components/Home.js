import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box textAlign="center" sx={{ mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Pet Adoption App
      </Typography>
      <Typography variant="h6" gutterBottom>
        Browse, Add, and Adopt pets easily
      </Typography>
      <Button
        component={Link}
        to="/pets"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        View Pets
      </Button>
    </Box>
  );
};

export default Home;
