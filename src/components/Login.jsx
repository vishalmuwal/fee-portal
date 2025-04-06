import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { loginUsers } from "./utils/mockData.jsx";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogged, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = loginUsers.find(
      (user) => user.userId === userId && user.password === password
    );
    if (!user) {
      alert("Invalid credentials");
      return;
    }

    // Set logged-in state and admin role
    console.log("Logging in user:", user);
    setIsLogged(true);
    setIsAdmin(user.isAdmin);

    // Redirect based on role
    if (user.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="User ID (University ID)"
          variant="outlined"
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
