// import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import axios from 'axios';
 
import React,{Component} from 'react';
 
// import { storage, db } from "./firebase";
// import firebase from 'firebase';
// import "./ImageUpload.css"

class ImageUpload extends Component{

    // const [caption, setCaption] = useState("");
    // //const [url, setUrl] = useState('');
    // const [progress, setProgress] = useState(0);
    // const [image, setImage] = useState(null);

    // const handleChange = (e) => {
    //     if(e.target.files[0]){
    //         setImage(e.target.files[0]);
    //     }
    // }

    // const handleUpload = () => {
    //     const uploadTask = ""
    //     //  storage.ref(`images/${image.name}`).put(image);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             // progress function
    //             const progress = Math.round(
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             );
    //             setProgress(progress);
    //         },
    //         (error) => {
    //             //error
    //             console.log(error);
    //             alert(error.message);
    //         },
    //         () => {
    //             // For firebase storage
    //             // storage
    //             // .ref("images")
    //             // .child(image.name)
    //             // .getDownloadURL()
    //             // .then(url => {
    //             //     //post image in db
    //             //     db.collection("posts").add({
    //             //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //             //         caption: caption,
    //             //         imageURL: url,
    //             //         username: username
    //             //     });

    //             //     setProgress(0);
    //             //     setCaption("");
    //             //     setImage(null);
    //             // })
    //         }

    //     )
    // }

    // return (
    //     <div className="ImageUpload">
    //         {/* <progress className="imageupload_progress" value={progress} max="100" /> */}
    //         {/* <div className="img_up">
    //             <input type="text" className="input_caption" placeholder="Enter a caption" onChange={event => setCaption(event.target.value)} value={caption} />
    //             <input type="file" className="file_up" onChange={handleChange} />
    //         </div>
    //         <Button className="btn_up" onClick={handleUpload}>
    //                 Upload
    //         </Button> */}
    //     </div>
    // )

    state = {
 
        // Initially, no file is selected
        selectedFile: null
      };
      
      // On file select (from the pop up)
      onFileChange = event => {
      
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };
      
      // On file upload (click the upload button)
      onFileUpload = () => {
      
        // Create an object of formData
        let body = new FormData();
      
        // Update the formData object
        body.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        // body = {
        //     'name': "mmmm"
        // }
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        axios.post(".netlify/functions/addPost", body);
      };
      
      // File content to be displayed after
      // file upload is complete
      fileData = () => {
      
        if (this.state.selectedFile) {
           
          return (
            <div>
              <h2>File Details:</h2>
               
  <p>File Name: {this.state.selectedFile.name}</p>
   
               
  <p>File Type: {this.state.selectedFile.type}</p>
   
               
  <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
              </p>
   
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };
      
      render() {
      
        return (
          <div className="col">
              <h3>
                File Upload using React!
              </h3>
              <h3>
                File Upload using React!
              </h3>
              <h3>
                File Upload using React!
              </h3>
              <h3>
                File Upload using React!
              </h3>
              <div>
                  <input type="file" onChange={this.onFileChange} />
                  <button onClick={this.onFileUpload}>
                    Upload!
                  </button>
              </div>
            {this.fileData()}
          </div>
        );
      }
    }
// }

export default ImageUpload;