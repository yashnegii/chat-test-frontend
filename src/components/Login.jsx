import { React } from "react";
import { useUser } from "../contexts/UseUser.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connectSocket, getSocket } from "../socket.js";
import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '400px',
  gap: theme.spacing(2),
}));

export default function Login() {
  const { email, setEmail, password, setPassword, setSocketInstance } = useUser();
  const navigate = useNavigate();

  function loginHandler(e) {
    e.preventDefault();
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(async (resp) => {
      if (resp.status == 404) {
        toast.info("Account Not Found!!,SignUp Now ");
        navigate("/signup");
      } else if (resp.status == 401) {
        toast.error("Wrong Password!!");
        setPassword("");
      } else {
        let data = await resp.json();
        localStorage.setItem('authToken', JSON.stringify({ token: data.token, userId: data.userId }));
        connectSocket(data.token);
        setSocketInstance(getSocket());
        toast.success("login successful");
        navigate('/chat');
        setPassword("");
      }
    });
  }

  return (
    <StyledBox>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <StyledForm onSubmit={loginHandler}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </StyledForm>
      <Typography variant="body2" color="textSecondary" align="center">
        Don’t have an account yet?{" "}
        <Link to="/signup" style={{ color: '#3f51b5' }}>
          Sign up
        </Link>
      </Typography>
    </StyledBox>
  );
}
