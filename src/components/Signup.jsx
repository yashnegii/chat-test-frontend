import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UseUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

export default function Signup() {
  const { email, setEmail, password, setPassword } = useUser();
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  function signUpHandler(e) {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Password Mismatch!!");
      setConfirmPassword("");
      return;
    }
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then((resp) => {
      console.log("here");
      if (resp.status == 200) {
        toast.success("Signup successfull");
        navigate("/");
      } else if (resp.status == 403) {
        // alert("User already exists");
        toast.error("User Already exists,TRY AGAIN");
      } else {
        toast.error("Server Error");
      }
    });
  }

  return (
    <StyledBox>
      <Typography variant="h4" component="h1" gutterBottom>
        Signup
      </Typography>
      <StyledForm onSubmit={signUpHandler}>
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
      </StyledForm>
      <Typography variant="body2" color="textSecondary" align="center">
        Already have an account?{" "}
        <Link to="/" style={{ color: '#3f51b5' }}>
          Login here
        </Link>
      </Typography>
    </StyledBox>
  );
}
