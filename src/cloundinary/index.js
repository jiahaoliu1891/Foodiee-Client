import React, { useState } from "react";
import { Grid, Container, Typography, Button, MenuItem, Select, TextField, FormControl } from "@material-ui/core";

const env = {
    cloudinary_cloud_name: 'shawn1891',
    cloudinary_url: "https://api.cloudinary.com/v1_1/shawn1891/image/upload",
    cloudinary_upload_preset: "foodiee"
}

class Uploader extends React.Component {
    constructor(prop) {
        super(prop)
    }

    state = {
        selectedFile: null,
        imageUrls: null
    }

    fileSelectedHandler = (e) => {
        this.setState({
            selectedFile: e.target.files,
            imageUrls: []
        })
    }

    uploadHandler = async (e) => {
        e.preventDefault();
        // const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
        const imageData = new FormData();
        imageData.append("cloud_name", env.cloudinary_cloud_name)
        
        const files = this.state.selectedFile;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            imageData.append("file", file);
            imageData.append("upload_preset", env.cloudinary_upload_preset);

            const response = await fetch(env.cloudinary_url, {method: "POST", body: imageData});
            const data = await response.json();
            this.setState({
                imageUrls: [...this.state.imageUrls, data.url]
            })
        }
    }

    render() {
        return (
            <div>
                <form method="post" enctype="multipart/form-data" onChange={this.fileSelectedHandler} >
                    <input type="file" name="files[]" multiple />
                    <button type="submit" onClick={this.uploadHandler}> Submit </button>
                </form>
            </div>

        );
    }
}

export default Uploader;