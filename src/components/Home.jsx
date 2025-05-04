import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

function Home() {
  const [input, setInput] = useState("");
  const navigate= useNavigate();
  function addHandler() {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ text: input }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
          toast.error("You are not authorized to do this action!");
          navigate("/")
        }
      });
  }
  return (
    <StyledBox>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Chat App
      </Typography>
      <Typography variant="body1">
        Please login or signup to continue.
      </Typography>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addHandler}>add</button>
    </StyledBox>
  );
}

export default Home;
