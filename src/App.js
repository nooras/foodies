import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, TextareaAutosize } from '@material-ui/core';
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import cloudinary from "cloudinary/lib/cloudinary";
import Logo from "./assets/img/foodies.gif"
import { ReactSession } from 'react-client-session';

cloudinary.config({
  cloud_name: 'noorfa',
  api_key: '332851398966561',
  api_secret: 'wbfBla4KNqLNO-eOPjTEUXBRPt0'
});

ReactSession.setStoreType("localStorage");

function getModalStyle(){
  const top = 50;
  const left = 50;

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper:{
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  }
}));

const postUseStyles = makeStyles((theme) => ({
  paper:{
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  }
}));
// const BASE_URL = '/dsad';

function App() {

  const classes = useStyles();
  const postClasses = postUseStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  // const [uid, setUid] = useState('');
  const [uname, setUname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [user, setUser] = useState("");
  // const [users, setUsers] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const[img,setImg] = useState("");
  const[imgProfile,setImgProfile] = useState("");
  const[allPosts,setAllPosts] = useState("");
  const[allUsers,setAllUsers] = useState("");
  // const[allData,setAllData] = useState("");
  const[openProgress,setOpenProgress] = useState(false);
  const[progressValue, setProgressValue] = useState("");
  // const[imageData,setimageData] = useState({url: "", public_id: ""});
  // const [images, setImages] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);
  // const [message, setMessage] = useState("");
  // const [selectedFile, setSelectedFile] = useState();
	// const [isSelected, setIsSelected] = useState(false);


  const pageSize = 6;
  const [pageState, setPageState] = useState(null)

  const fetchUser = async () => {
     await axios.get('/.netlify/functions/getUsers')
      .then((response) => {
        // console.log(response)
        setAllUsers(response.data);
        })
      .catch((err) => {
        console.error(err)
      })
  }

  const fetchData = async () => {
      const body =  {
        pageState: pageState, 
        pageSize: pageSize
      }
      await axios.post('/.netlify/functions/getPostsPageSize',body)
      .then((responseBody) => {
        setPageState(responseBody.data.pageState)
        setAllPosts({...allPosts, ...responseBody.data.data});
        })
      .catch((err) => {
        console.error(err)
      })

    // let allPosts ;
    // let allUsers ;
    // console.log("Hello")
    // await axios.get('.netlify/functions/getPosts')
    //   .then((response) => {
    //     // console.log(response)
    //     allPosts = response.data;
    //     })
    //   .catch((err) => {
    //     console.error(err)
    // })
    // await axios.get('.netlify/functions/getUsers')
    //   .then((response) => {
    //     // console.log(response)
    //     allUsers = response.data;
    //     })
    //   .catch((err) => {
    //     console.error(err)
    //   })
    // if(allPosts && allUsers){
    //       const data = {
    //         allPosts: allPosts,
    //         allUsers: allUsers
    //       }
    //       setAllData(data);
    // }
  }

  const fetchUpdatedUser = async () => {
    await axios.post('/.netlify/functions/searchUser',{ email: { $eq: email } })
    .then((results) => {
    if(Object.keys(results.data).length === 1){
      const userDetails = results.data[Object.keys(results.data)];
      setUname(userDetails.name);
      setUsername(userDetails.username);
      setEmail(userDetails.email);
      setBio(userDetails.bio);
      setUser(results.data);
      setImg(userDetails.profilePicUrl)
      ReactSession.set("user", results.data)
      console.log("fetching...")
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    fetchUser();
    fetchData();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const signUp = async (event) =>{
    event.preventDefault();
    const body = {
      name: username,
      username: username,
      email:email,
      password:password,
      bio:"",
    }
    const results = await axios.post('/.netlify/functions/searchUser',{ email: { $eq: email } })
    if(Object.keys(results.data).length === 1){
      setError("Email already present!! Try with another email")
    } else {
      await axios.post('.netlify/functions/addUser',body)
      .then((response) => {
        console.log(response)
        ReactSession.set("user", response.data)
        })
      .catch((err) => {
        console.error(err)
      })
      setOpen(false);
    }
  }

  const signIn = async (event) =>{
    event.preventDefault();
    console.log("SIGN IN")
    const results = await axios.post('/.netlify/functions/searchUser',{ email: { $eq: email } })
    if(Object.keys(results.data).length === 1){
      // console.log(Object.keys(results.data))
      const userDetails = results.data[Object.keys(results.data)];
      if(userDetails.password === password){
        // setUid(Object.keys(results.data));
        setUname(userDetails.name);
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setBio(userDetails.bio);
        setUser(results.data);
        setImg(userDetails.profilePicUrl)
        ReactSession.set("user", results.data)
        setOpenSignIn(false);
      } else {
        setError("Invalid Password")
        console.log("Invalid Password")
      }
    } else{
      setError("Invalid Credentials")
      console.log("byeeeeee")
    }
  }

  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  }
 
  const updateImage = (e)=>{
      setImg(e.target.files[0]);
  }

  const updateProfileImage = (e) => {
    setImgProfile(e.target.files[0])
  }

  const newPost =  async (event) =>{
    event.preventDefault();
    setOpenPost(false);
    setOpenProgress(true);
    setProgressValue(25);
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset","foodies");
    data.append("cloud_name","noorfa" );
    data.append("folder","foodies");
    try{
      const foodies = "noorfa";
      const resp = await axios.post(`https://api.cloudinary.com/v1_1/${foodies}/image/upload/`,data);  
      // setimageData({url: resp.data.url, public_id: resp.data.public_id});
      // console.log(resp.data.url);
      setProgressValue(50);
      if(resp.data.url){
        const d = new Date();
        let time = d.toLocaleString();
        const body = {
          userId: Object.keys(user),
          username: username,
          caption: caption,
          description: description,
          tags: tags,
          imageUrl: resp.data.url,
          created_at: time,
        }
        setProgressValue(75);
        await axios.post('/.netlify/functions/addPost', body)
        .then((response) => {
          console.log(response)
          setProgressValue(100);
          setOpenProgress(false);
          })
        .catch((err) => {
          console.error(err)
        })
      }
      
    }catch(err){
      console.log("errr : ",err);
    }
  }

  const profile = async(event) => {
    event.preventDefault();
    setOpenHome(false);
    setOpenProgress(true);
    setProgressValue(50);
    try{
      let url;
      if(imgProfile !== ""){
        const data = new FormData();
        data.append("file", imgProfile);
        data.append("upload_preset","foodies");
        data.append("cloud_name","noorfa" );
        data.append("folder","profile");
        const foodies = "noorfa";
        const resp = await axios.post(`https://api.cloudinary.com/v1_1/${foodies}/image/upload/`,data);  
        // setimageData({url: resp.data.url, public_id: resp.data.public_id});
        url = resp.data.url;
      } else {
        url = img;
      }
      setProgressValue(75);
        const d = new Date();
        let time = d.toLocaleString();
        console.log(url, 'URRLLL')
        const data = {
          bio: bio,
          profilePicUrl: url,
          created_at: time,
        }
        const body = {
          id: Object.keys(user),
          data: data
        }
        await axios.post('/.netlify/functions/updateProfile', body)
        .then((response) => {
            console.log(response, "In await")
            //Retrieving updated data
            if(response.status === 200){
              console.log("In IFFF")
              fetchUpdatedUser();
            }
            setImgProfile("");
          })
        .catch((err) => {
          console.error(err)
        })
      setOpenProgress(false);
    }catch(err){
      console.log("errr : ",err);
    }
  }

  const deleteProfilePic = async() => {
    // event.preventDefault();
    const body = {
      id: Object.keys(user),
    }
    await axios.post('/.netlify/functions/deleteProfilePic', body)
    .then((response) => {
        console.log(response, "In delete")
        if(response.status === 200){
          fetchUpdatedUser();
        }
      })
    .catch((err) => {
      console.error(err)
    })
  }

  // if(imageData){
  //   console.log(imageData['url']);
  // }

  // if(imgProfile){
  //   console.log(imgProfile.name, "ImagggeeProfilllee")
  // }

  if(ReactSession.get('user') !== undefined && Object.keys(ReactSession.get('user')).length !== 0 && user === ""){
    const user = ReactSession.get('user');
    const userDetails = user[Object.keys(user)]
    setUser(user)
    setUname(userDetails.name);
    setUsername(userDetails.username);
    setEmail(userDetails.email);
    setBio(userDetails.bio);
    setImg(userDetails.profilePicUrl);
    ;
  }
  // if(user){
  //   console.log(user, "USERRRRRRRR");
  // }

  // const signOut =  (event) =>{
  //   event.preventDefault();
  // }

  return (
    <div className="App">
      <Modal
        open={openProgress}
      >
         <div style={modalStyle} className={classes.paper}>
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
            </div>
        </div>
      </Modal>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
         <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
              <center>
                <img className="logoImage" 
                  src={Logo}
                  alt="logo_image" width={300}></img>
              </center>
              <Input
                placeholder="username" 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email" 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign up</Button>
              <div>
                {error && (<p>{error}</p>)}
              </div>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
         <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
              <center>
                <img className="logoImage" 
                  src={Logo}
                  alt="logo_image" width={300}>
                </img>
              </center>
              <Input
                placeholder="email" 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
              <div>
                {error && (<p>{error}</p>)}
              </div>
          </form>
        </div>
      </Modal>

      <Modal
        open={openPost}
        onClose={() => setOpenPost(false)}
      >
         <div style={modalStyle} className={postClasses.paper}>
          <form className="app_signup">
              <center>
                NEW POST
              </center>
              <Input
                fullWidth={true}
                placeholder="Food Name / Caption" 
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="my-2"
                style={{border: '3px solid #fff', backgroundColor:'#fff'}}
              />
              <TextareaAutosize
                placeholder="Recepie Instructions" 
                minRows={4}
                maxRows={8}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="my-2"
                style={{width: "100%", overflow:'auto', border: '3px solid #fff', backgroundColor:'#fff'}}
              />
              <Input
                fullWidth={true}
                placeholder="Tags" 
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="my-2"
                style={{border: '3px solid #fff', backgroundColor:'#fff'}}
              />
              <input type="file" onChange={updateImage} className="form-control shadow-sm my-2" id="image" name="image" accept="image/*"/>
              <center>
                <Button type="submit" onClick={newPost} style={{border: '3px solid #fff'}}>Post</Button>
              </center>
              <div>
                {error && (<p>{error}</p>)}
              </div>
          </form>
        </div>
      </Modal>

      {/* Home */}
      <Modal
        open={openHome}
        onClose={() => setOpenHome(false)}
      >
         <div style={modalStyle} className={postClasses.paper}>
          <form className="app_profile">
              <center>
                PROFILE
              </center>
              {/* <center> */}
              <div className='profileDiv p-2 my-2'>
                <div className=''>
                  <center>
                    <div>
                      {img ? 
                      <img src={img} className='imageProfile' width={200} height={200} alt='img'/>
                      : <img src='https://res.cloudinary.com/noorfa/image/upload/v1652959919/profile/a62w0bch8hk6bupvhbax.png' className='imageProfile' width={200} height={200} alt='img'/>}
                    </div>
                    <div>
                      <div class="button-wrap">
                          <label className='button' onClick={deleteProfilePic}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3 mx-2" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                          </svg>
                          </label>
                          {/* <input id="delete" type="none" onChange={deleteProfilePic} className="form-control" style={{display: 'none'}}/> */}
                          <label class="button" for="upload">
                            <svg xmlns="http://www.w3.org/2000/svg" for="file-input" width="25" height="25" fill="currentColor" className="bi bi-pencil-square mx-2" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                          </label>
                          <input id="upload" type="file" onChange={updateProfileImage} className="form-control" name="image" accept="image/*" style={{display: 'none'}}/>
                      </div>
                      <p className='profileEditFileName'> {imgProfile && imgProfile.name}</p>
                    </div>
                  </center>
                </div>
                <div className=' my-auto'>
                  <center>
                  <h3>{uname} | {username}</h3>
                  <p> {email}</p>
                  </center>
                </div>
              </div>
              <div className='profileDiv p-2'>
                <div className='row'>
                <div className='col-1 p-2'>
                  Bio:
                </div>
                <div className='col-11'>
                <TextareaAutosize
                  style={{ width: "100%", borderColor: '#dad6d6' }}
                  placeholder="Bio" 
                  minRows={4}
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="my-2"
                />
                </div>
                </div>
              </div>
              <center>
              <Button className='ProfileButton p-2 my-2' type="submit" onClick={profile} style={{border: '3px solid #fff'}}>Update Profile</Button>
              </center>
              <div>
                {error && (<p>{error}</p>)}
              </div>
          </form>
        </div>
      </Modal>

      <div className="navbar px-4">
        <img className="logoImage" 
        src={Logo}
        alt="logo_image" width={300}></img>
        { user ? (
          <div className="loginContainer">
            <Button className="btn" onClick={() => setOpenHome(true)}>Home</Button>
            <Button className="btn" onClick={() => signOut()}>Logout</Button>
          </div>
        ):(
          <div className="loginContainer">
            <Button className="btn" onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button className="btn" onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
         )
        } 
      </div>
      {/* {
        user && <div>Hii
          {bio}
          {email}
          {username}
          {uname}
          </div>
      } */}
      <div className='p-2 m-2'>
        <div className='row'>
        <div className='col-8'>
         {/* { allData ? <Posts allData={allData} /> : <div>No Post</div>} */}
         { allPosts && allUsers ? <Posts allPosts={allPosts} allUsers={allUsers} /> : <div>No Post</div>}
         <div
        className="page-end"
        onMouseOver={() => {
          fetchData()
        }}
      />
        </div>
        <div className='col-4'>
          <div className="col-sm-12">
            <Button className="btn" onClick={() => setOpenPost(true)}>NEW POST</Button>	
		        </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
