// src/components/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile display name with username
      await updateProfile(userCredential.user, {
        displayName: username.trim(),
      });
      // Optional: Save user info in Firestore users collection
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: username.trim(),
        email: email.trim(),
        createdAt: new Date(),
      });
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Sign Up
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
          Log In
        </Link>
      </Typography>
    </Container>
  );
}
