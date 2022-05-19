// import Roll from 'react-reveal/Roll';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';

import '../App.css'

function Posts(data) {
    const posts = data['allPosts'];
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
          border: '1px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2),
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

    // console.log(posts)
    return (
        <div className="login row mx-0">
            <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
         <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
              {/* <center>
                <img className="logoImage" 
                  src={Logo}
                  alt="logo_image" width={300}></img>
              </center> */}
              {currentPost && 
              <div className='row p-0 m-0'>
                  <div className='col-6'>
                    {/* {currentPost['caption']} */}
                    <div className='border'>
                      <div className='border mx-0 px-0' style={{height:500, backgroundColor:'#000'}}> 
                        <img src={currentPost['imageUrl']} className='imagePost' width={100} height={100} alt='img'/>
                      </div>
                      <div className='userInfo row my-1' style={{position:'relative'}}>
                              <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                              <p className='para col-6' style={{color: '#000'}} >{currentPost['username']}</p>
                              <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                              <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='border p-2' style={{height:'550px', overflow:'auto'}}>
                    <p style={{fontWeight:'bold'}}>{currentPost['caption']}</p>
                    <p>{currentPost['description']}</p>
                    <p>{currentPost['tags']}</p>
                    </div>
                  </div>
              </div>} 
              <div>
                {/* {error && (<p>{error}</p>)} */}
              </div>
          </form>
        </div>
      </Modal>        
        {Object.keys(posts).map((key, index) => (
            
            <div  key={key} className='col-6 p-2 my-2' style={{height:500}} >
              {/* {users[posts[key]['userId']]['email']} */}
                {posts[key]['imageUrl'] && posts[key]['userId'] ? 
                <a onClick={() => openPost(key)} >
                <div className='xxx border my-2'  style={{height:500, backgroundColor:'#000', borderRadius:'10px'}} >
                    <img src={posts[key]['imageUrl']} className='imagePost' width={100} height={100} alt='img'/>
                    <div className='userInfo row m-0' style={{position:'relative', top:-40, backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(255,0,0,0)`, borderRadius:'inherit'}}>
                            <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d0cbcb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                            <p className='para col-6' style={{color: '#d0cbcb'}} >{posts[key]['username']}</p>
                            <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d0cbcb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <svg className='col-2' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d0cbcb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
                    </div>
                </div> 
                </a>: <div></div>}
                
            </div>
        ))}
            
            {}
        </div>
        );
    }
    
export default Posts;