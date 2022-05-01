// import Roll from 'react-reveal/Roll';
import loginImage from '../assets/img/login.png'

function Posts(finalData) {
    return (
        <div className="login row mx-0">
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
        {/* {finalData.map(home => <div>{home.name}</div>)} */}
            <div className='col-6 px-0'>
                hiii
                <img src={loginImage} className='imagePost' alt='img'/>
            </div>
            <div className='col-6 px-0'>
                hiii
                <img src={loginImage} className='imagePost' alt='img'/>
            </div>
            
        </div>
        );
    }
    
export default Posts;