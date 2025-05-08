import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Outlet } from 'react-router-dom';
import { useUser } from "../contexts/UseUser.jsx";


const drawerWidth = 240;

export default function Chatbar() {
    const { email, setActiveChat , activeChat, socket} = useUser();
    const [user, setUser] = React.useState([]);

    React.useEffect(() => {

      if(socket){
        socket.emit('userConnected', email);

        socket.on('userList', (data) => {
          console.log("userList", data)
          setUser(data.map((user) => user.email));
        })
        console.log("testing user added socket evnet")

        socket.on('userAdded', (data)=>{
          console.log(data)
        })
        
      }   
      


      // // console.log('getting user data...');
      // fetch("http://localhost:3000/chat/getuser", {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.status === "ok") {
      //       // console.log(data.users.map((user) => user.email));
      //       setUser(data.users.map((user) => user.email));
      //       // setUser(data.);
      //     } else {
      //       console.log("error in getting user data");
      //     }
      //   });
    },[email, socket])



    function chatOpenHandler(e){
      const selectedUser = e.currentTarget.children[1].children[0].innerText;
      setActiveChat(selectedUser)
      if (socket) {
        const roomId = [email, selectedUser].sort().join("_");
        console.log("roomId", roomId);
        socket.emit("joinRoom", { roomId });
      }
    }

  // console.log(activeChat)

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}

       {/* top section */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My Chat App welcomes {activeChat?activeChat: ""}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>{email}'s Chats</Toolbar>
        <Divider />

        <List>
          {user.map((text) => (
            <Link to="/chat/personalchat"  key={text}>
              <ListItem disablePadding>
                <ListItemButton onClick={chatOpenHandler} >
                  <ListItemIcon>
                    <AccountCircleIcon/>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      <Toolbar/>
      <Outlet/> 
      </Box>
    </Box>
  );
}
