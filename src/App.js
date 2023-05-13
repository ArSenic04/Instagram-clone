import React, { useEffect, useState } from 'react'
import './App.css';
import Post from './Post'
import Modal from '@mui/material/Modal';
import { db, auth } from './firebase';
import ImageUpload from './ImageUpload';
import { Button, Box, Typography, Input } from '@mui/material';
import InstagramEmbed from 'react-instagram-embed';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function App() {

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([])
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [password, setPassword] = useState('');
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser)
        setUser(authUser)
      }
      else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        post: doc.data(),
        id: doc.id
      })

      ))
    })
  }, []);

  const signup = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }
  return (
    <>
      <div className="app">
        {/* <Button onClick={handleOpen}>Open modal</Button> */}


        <div className='app__header'>
          <img
            className='app__headerimage'
            alt=''
            src='https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.svg'
          ></img>
          {
            user ? (
              <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
              <div className="app__loginContainer">
                <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={() => setOpen(true)}>SignUp</Button>
              </div>
            )}
        </div>
        <div className="app__posts">
          {
            posts.map(({ id, post }) => (
              <Post key={id} postId={id} user={user} username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl} />
            ))
          }
        </div>

        <InstagramEmbed
          url='https://www.instagram.com/reel/CrQ58vWtOxs/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=='
          // clientAccessToken='123|456'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => { }}
          onSuccess={() => { }}
          onAfterRender={() => { }}
          onFailure={() => { }}
        />
        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign Up
          </Typography> */}
            <center>
              <img
                className='app__headerimage'
                style={{ width: '40%' }}
                alt=''
                src='https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.svg'
              ></img>
            </center>
            <div>
              <Typography>

                <form className='app__signup'>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Input>
                  <Input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Input>
                  <Button type='submit' onClick={signIn}>SignIn</Button>
                </form>

              </Typography>
            </div>
          </Box>
        </Modal>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign Up
          </Typography> */}
            <center>
              <img
                className='app__headerimage'
                style={{ width: '40%' }}
                alt=''
                src='https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.svg'
              ></img>
            </center>
            <div>
              <Typography component={'div'}>

                <form className='app__signup'>

                  <Input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></Input>
                  <Input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Input>
                  <Input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Input>
                  <Button type='submit' onClick={signup}>SignUp</Button>
                </form>

              </Typography>
            </div>
          </Box>
        </Modal>
        {user?.displayName ? (
          <ImageUpload username={user.displayName}></ImageUpload>
        ) :
          (<h3>Please Login to Upload</h3>)
        }


      </div>

    </>
  );
}

export default App;
