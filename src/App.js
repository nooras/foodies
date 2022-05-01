import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import axios from 'axios'
import React, {useState, useEffect} from 'react';
// import ImageUpload from './ImageUpload';
// import express from 'express';
// const webpack = require('webpack');
// module.exports = function override(config, env) {
//   //do stuff with the webpack config...

//   config.resolve.fallback = {
//       url: require.resolve('url'),
//       assert: require.resolve('assert'),
//       crypto: require.resolve('crypto-browserify'),
//       http: require.resolve('stream-http'),
//       https: require.resolve('https-browserify'),
//       os: require.resolve('os-browserify/browser'),
//       buffer: require.resolve('buffer'),
//       stream: require.resolve('stream-browserify'),
//   };
//   config.plugins.push(
//       new webpack.ProvidePlugin({
//           process: 'process/browser',
//           Buffer: ['buffer', 'Buffer'],
//       }),
//   );

//   return config;
// }
// const multer = require("multer")

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
// const BASE_URL = '/dsad';

function App() {

  // constructor(props) {
  //   super(props);
    // const state = {
    //   images: [],
    //   imageUrls: [],
    //   message: ''
    // }
// }
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  // const [uid, setUid] = useState('');
  const [uname, setUname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [user, setUser] = useState("");
  // const [users, setUsers] = useState("");
  const [error, setError] = useState("");
  // const [images, setImages] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);
  // const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  // const [state, setState] = useState({
  //   images: [],
  //     imageUrls: [],
  //     message: ''
  // })
  // let finalData;
  const fetchData = async () => {
    // fetchUserDetails()
    console.log("Hello")
  }

  useEffect(() => {
    fetchData()
  }, [])


  // console.log(user);
  // if(Object.keys(user).length === 1){
  //   console.log(user, "hiiii")
  //   // finalData = users.sort((a, b) => a.id < b.id ? 1 : -1)
  // } else{
  //   // finalData = null
  //   console.log("byeeeeee")
  // }
  // console.log("---------")
  // console.log(finalData , "finallllll")

  // setUser("Nooras");

  const signUp = async (event) =>{
    event.preventDefault();
    const body = {
      name: username,
      username: username,
      email:email,
      password:password,
      bio:"",
    }
    const results = await axios.post('.netlify/functions/searchUser',{ email: { $eq: email } })
    if(Object.keys(results.data).length === 1){
      setError("Email already present!! Try with another email")
    } else {
      await axios.post('.netlify/functions/addUser',body)
      .then((response) => {
        console.log(response)
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
    const results = await axios.post('.netlify/functions/searchUser',{ email: { $eq: email } })
    if(Object.keys(results.data).length === 1){
      const userDetails = results.data[Object.keys(results.data)];
      if(userDetails.password === password){
        // setUid(Object.keys(results.data));
        setUname(userDetails.name);
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setBio(userDetails.bio);
        setUser(userDetails);
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

  // const signOut =  (event) =>{
  //   event.preventDefault();
  // }

//  const selectFiles = (event) => {
//     let images = [];
//     for (var i = 0; i < event.target.files.length; i++) {
//           images[i] = event.target.files.item(i);
//       }
//       images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
//       let message = `${images.length} valid image(s) selected`
//       let imageUrls = []
//       console.log(images, message, imageUrls)
//       // setState({ images, message, imageUrls})
//       setImages(images);
//       setMessage(message);
//   }

  // const uploadImages = () => {
  
  //   console.log(images)
  //   const uploaders = images.map(image => {
  //     const data = new FormData();
  //     console.log(data)
  //     data.append("image", image, image.name);
  //     console.log(data, "dsadsd");
  //     var xhr = new XMLHttpRequest();
  //     xhr.open("POST", "./netlify/upload/" + image.name)
  //     xhr.send(data)
      // Make an AJAX upload request using Axios
      // return axios.post(BASE_URL + 'upload', data)
      // .then(response => {
      // setState({imageUrl: [response.data.imageUrls, ...state.imageUrls]});
      // setImageUrls([response.data.imageUrls, ...imageUrls])
    // })
    // const formData = new FormData();
    // console.log( images[0], images[0].name)
    // formData.append( 
    //   "myFile", 
    //   images[0], 
    //   images[0].name
    // ); 
    // console.log(formData);
  // });

   // Once all the files are uploaded 
  // axios.all(uploaders).then(() => {
  //   console.log('done');
  // }).catch(err => alert(err.message));

  // }

  // const upload = () => {
    // router.post('/upload', (req, res) => {
    //   return res.json({status: 'OK'})
    // })
    // const app = express();
    // app.use(express.static("public"));
    // app.listen(3000, function() { console.log('Server running on port 3000'); });
    // app.post('/upload', (req, res) => {
    //   return res.json({status: 'OK'})
    // })
  // }

  const changeHandler = (event) => {
    console.log(event.target.files[0])
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
  
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
         <div style={modalStyle} className={classes.paper}>
          {/* <h2>I am Modal modal modal</h2> */}
          <form className="app_signup">
              <center>
                <img className="logoImage" 
                  src={require("./assets/img/foodies.gif")}
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
          {/* <h2>I am Modal modal modal</h2> */}
          <form className="app_signup">
              <center>
                <img className="logoImage" 
                  src={require("./assets/img/foodies.gif")}
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
      <div className="navbar px-4">
        <img className="logoImage" 
        src={require("./assets/img/foodies.gif")}
        alt="logo_image" width={300}></img>

        {/* { user ? (
          <div className="loginContainer">
            <Button className="btn" onClick={() => signOut()}>Logout</Button>
          </div>
        ):( */}
          <div className="loginContainer">
            <Button className="btn" onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button className="btn" onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        {/* )
        } */}
      </div>
      hiiiii
      {/* <div>
        <Login finalData={finalData} />
        {finalData[0]}
      {finalData && finalData.map((finalD) => (
        <div>{finalD.name}</div>
      ))}
      </div> */}
      {
        user && <div>
          {bio}
          {email}
          {username}
          {uname}
          {/* <h1>{uid}</h1> */}
          </div>
      }
      <div className='p-2 m-2'>
        <div className='row'>
        <div className='col-8'>
          <Posts />
        </div>
        <div className='col-4'>
          {/* <ImageUpload username={uid}/> */}
          <div className="col-sm-12">
          <input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
        			{/* <h1>Image Uploader</h1><hr/>
              <input type="file" name="avatar" multiple/>
              <button onClick={upload}>Submit</button> */}
	        		{/* <div className="col-sm-4">
		        		<input className="form-control " type="file" onChange={selectFiles} multiple/>
		        	</div>
		        	{ message? <p className="text-info">{message}</p>: ''}
		        	<br/><br/><br/>
		        	<div className="col-sm-4">
		            	<button className="btn btn-primary" value="Submit" onClick={uploadImages}>Submit</button>
		        	</div>
	            </div>
	            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><hr/><br/>
	            <div className="row col-lg-12">
		        	{ 
			          	imageUrls.map((url, i) => (
				          		<div className="col-lg-2" key={i}>
				          			<img src={BASE_URL + url} className="img-rounded img-responsive" alt="not available"/><br/>
				          		</div>
				          	))
			        } */}
		        </div>
        </div>
        </div>
      </div>
      {/* {uid ? ( */}
        
      {/* ):(
        <div className="ImageUpload">
          <h3 className="need">You need to login to upload!</h3>
        </div>
      )} */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;


// curl --request POST \
//   --url https://$ASTRA_DB_ID-$ASTRA_DB_REGION.apps.astra.datastax.com/api/rest/v2/namespaces/$ASTRA_DB_KEYSPACE/collections/hello_docs \
//   -H "X-Cassandra-Token: $ASTRA_DB_APPLICATION_TOKEN" \
//   -H 'Content-Type: application/json' \
//   -d '{
//     "title": "Some Stuff",
//     "other": "This is nonsensical stuff."
//   }'
