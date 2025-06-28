import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

const Profile = ({ user }) => {
  if (!user) return <Typography sx={{ mt: 5, textAlign: "center" }}>Please login to view your profile.</Typography>;

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 5 }}>
      <Box display="flex" justifyContent="center" mb={3}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }}>
          {user.email.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {user.email}
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          User ID: {user.uid}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Profile;
