// import Roll from 'react-reveal/Roll';
import loginImage from '../assets/img/login.png'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import Logo from "../assets/img/foodies.gif"

import '../App.css'

function Posts(data) {
    console.log("-------------")
    const allData = data['allData'];
    const posts = allData['allPosts'];
    const users = allData['allUsers'];
    const [open, setOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState('');
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
          width: 800,
          height: 600,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2,4,3),
        }
      }));
      const classes = useStyles();
      const [modalStyle] = React.useState(getModalStyle);
    // const half = Math.ceil(Object.keys(post).length/2);
    // const col1Post = dict(list(post.items())[len(d)//2:])
    // for()
    // const row1 = post[len(post)/2:]
    // Object.keys(post).forEach(function(key) {
    //     if(post[key]['imageUrl'] && post[key]['userId']){
    //         console.log(key, dictionary[key]);
    //     }
    // });

    const openPost = (key) => {
        setCurrentPost(posts[key]);
        setOpen(true);
    }

    console.log(posts)
    return (
        <div className="login row mx-0">
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
              {currentPost && 
              <div className='row'>
                  <div className='col-6'>
                    {currentPost['caption']}
                    <img src={currentPost['imageUrl']} className='imagePost' width={100} height={100} alt='img'/>
                  </div>
                  <div className='col-6'>
                    <p>{currentPost['description']}</p>
                    <p>{currentPost['tags']}</p>
                  </div>
              </div>}
              {/* <Input
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
              <Button type="submit" onClick={signUp}>Sign up</Button> */}
              <div>
                {/* {error && (<p>{error}</p>)} */}
              </div>
          </form>
        </div>
      </Modal>
          {/* <div className="container h-100">
              <div className="row justify-content-center align-items-center h-100">
                  <div className="col-md-4">
                      <form>
                          <h4>Login</h4>
                          <label for="fname">First name:</label>
                          <input type="text" id="fname" name="fname"/>
                          <label for="lname">Last name:</label>
                          <input type="text" id="lname" name="lname"/>
                          <button type='submit'>Submit</button>
                      </form>
                  </div>
                  <div className="col-md-6">
                      <img src={loginImage} width={700} alt='img'/>
                  </div>
              </div>
          </div> */}
            {/* {finalData.map((finalD) => (
        <div>{finalD.name}</div>
        ))} */}
         {/* {
          posts.map(({id, post}) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageURL={post.imageURL}/>
          ))
        } */}
        {Object.keys(posts).map((key, index) => (
            
            <div className='col-6 p-2 my-2' style={{height:500}} >
                {posts[key]['imageUrl'] && posts[key]['userId'] ? 
                <a onClick={() => openPost(key)} >
                <div className='xxx border my-2'  style={{height:500, backgroundColor:'#000'}} >
                    {/* {post[key]['caption']} */}
                    {/* <div className='row m-0' style={{position:'relative', backgroundImage: `linear-gradient(to top, rgba(255,0,0,0), rgba(0,0,0,1)`}}>
                        <p style={{color:'#d0cbcb'}} className='py-2'>{post[key]['caption']}</p>
                    </div> */}
                    <img src={posts[key]['imageUrl']} className='imagePost' width={100} height={100} alt='img'/>
                    <div className='userInfo row m-0' style={{position:'relative', top:-40, backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(255,0,0,0)`}}>
                            <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d0cbcb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                            <p className='para col-6' style={{color: '#d0cbcb'}} >{users[posts[key]['userId']]['username']}</p>
                            <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d0cbcb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d0cbcb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
                    </div>
                </div> 
                </a>: <div></div>}
                
            </div>
            
            // <div className='col-6 px-0'>
            //     hiii
            //     <img src={loginImage} className='imagePost' alt='img'/>
            // </div>
        ))}
            
            {}
        </div>
        );
    }
    
export default Posts;