import React, { Component } from "react";
import { Grid, Container, Typography, Button, MenuItem, Select, TextField, FormControl } from "@material-ui/core";
import { withAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router'
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

const env = {
    cloudinary_cloud_name: 'shawn1891',
    cloudinary_url: "https://api.cloudinary.com/v1_1/shawn1891/image/upload",
    cloudinary_upload_preset: "foodiee"
}

class PostReview extends Component {
    constructor(prop) {
        super(prop)
    }

    state = {
        selectedFile: null,
        imageUrls: null,
        fireRedirect: false
    }

    fileSelectedHandler = (e) => {
        this.setState({
            selectedFile: e.target.files,
            imageUrls: []
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Upload image to cloudinary
        if (this.state.selectedFile != null) {
            const imageData = new FormData();
            imageData.append("cloud_name", env.cloudinary_cloud_name)
            // Post Image to cloudinary
            const files = this.state.selectedFile;
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                imageData.append("file", file);
                imageData.append("upload_preset", env.cloudinary_upload_preset);
                const response = await fetch(env.cloudinary_url, { method: "POST", body: imageData });
                const data = await response.json();
                this.setState({
                    imageUrls: [...this.state.imageUrls, data.url]
                })
            }
        }
        // Make a poster data
        const { user } = this.props.auth0;
        const posterData = {
            title: data.get('title'),
            location: data.get('location'),
            description: data.get('description'),
            price: data.get('price'),
            image: this.state.imageUrls,
            userName: user.name,
            userEmail: user.email
        };
        console.log(posterData)
        // POST to express server
        const res = await fetch("https://foodiee.online:4000/api/v1/restaurants", {
            method: 'POST',
            body: JSON.stringify(posterData),
            headers: { "Content-Type": "application/json" },
        });

        const resData = await res.json();
        console.log(resData);
        this.setState({ fireRedirect: true })


    };

    render() {
        const { fireRedirect } = this.state
        return (
            <>
                {fireRedirect && (
                    <Redirect to={'/'} />
                )}
                <Container style={{ marginTop: "30px" }} maxWidth='xs'>
                    
                        
                        <form id="posterForm" style={{width: '100%'}} onSubmit={this.handleSubmit}>
                        <Typography variant='h4' align='center' color='textPrimary' style={{ marginTop: "100px" }}>
                            Make a poster !
                        </Typography>
                                    <TextField
                                        id="title-input"
                                        name="title"
                                        label="Title"
                                        type="text"
                                        required
                                        fullWidth
                                        style={{ marginTop: "40px" }}
                                    />

                                    <TextField
                                        id="price-input"
                                        name="price"
                                        label="Price $"
                                        type="number"
                                        fullWidth
                                        required
                                        style={{ marginTop: "20px" }}
                                    />
                                    <TextField
                                        id="location-input"
                                        name="location"
                                        label="Resteruant Name"
                                        type="text"
                                        fullWidth
                                        required
                                        style={{ marginTop: "20px" }}
                                    />

                                    <TextField
                                        id="description-input"
                                        name="description"
                                        label="Description"
                                        type="text"
                                        multiline
                                        fullWidth
                                        rows={5}
                                        style={{ marginTop: "20px" }}
                                    />

                                    <div style={{ left: '0px', marginTop: "20px"}}>
                                    <Button component="label"  >
                                        Upload image
                                        <input
                                            type="file"
                                            name="image"
                                            // multiple 
                                            hidden
                                            required
                                            onChange={this.fileSelectedHandler} />
                                    </Button>
                                    <Button variant="contained" color="primary" type="submit" >
                                        Submit
                                    </Button>
                                    </div>
                        </form>
                </Container>
            </>
        );
    }
}

export default withAuth0(PostReview);








/**
 *
function PostReview() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const posterData = {
            title: data.get('title'),
            location: data.get('location'),
            description: data.get('description'),
            price: data.get('price'),
            image: data.getAll('image')
        };

        console.log(posterData)

        fetch("http://localhost:4000/api/v1/restaurants", {
            method: 'POST',
            body: JSON.stringify(posterData),
            headers: { "Content-Type": "application/json" },
        })
            .then(r => r.json())
            .then(d => console.log(d))
            .catch(e => console.log(e));
    };

    return (
        <>
            <Typography variant='h4' align='center' color='textPrimary' style={{ marginTop: "20px" }}>
                Make a poster !
            </Typography>
            <Container style={{ marginTop: "20px" }} maxWidth='md'>
                <form onSubmit={handleSubmit}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Grid item style={{ marginTop: "20px" }}>
                            <TextField
                                id="title-input"
                                name="title"
                                label="Title"
                                type="text"
                                
                                required
                            />
                        </Grid>

                        <Grid item style={{ marginTop: "20px" }}>
                            <TextField
                                id="price-input"
                                name="price"
                                label="Price"
                                type="text"
                                
                                // required
                            />
                        </Grid>
                        <Grid container alignItems="center" justify="center" direction="row" style={{ marginTop: "20px" }} >
                            <Grid item style={{ marginRight: "20px" }}>
                                <TextField
                                    id="location-input"
                                    name="location"
                                    label="Location"
                                    type="text"
                                    
                                    // required
                                />
                            </Grid>

                            <Grid item >
                                <FormControl>
                                    <Select name="city" >
                                        <MenuItem key="mac" value="mac">
                                            Mac
                                        </MenuItem>
                                        <MenuItem key="windows" value="windows">
                                            Windows
                                        </MenuItem>
                                        <MenuItem key="linux " value="linux">
                                            Linux
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item style={{ marginTop: "20px" }}>
                            <TextField
                                id="description-input"
                                name="description"
                                label="Description"
                                type="text"
                                multiline
                                
                                rows={10}
                            />
                        </Grid>
                        <Grid container alignItems="center" justify="center" direction="row" style={{ marginTop: "20px" }} >
                            <Button variant="contained" component="label" style={{ marginRight: "20px" }}>
                                Upload image
                                <input type="file" name="image" multiple hidden />
                            </Button>
                            <Button variant="contained" color="primary" type="submit" >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>


                </form>
            </Container>
        </>
    );
}

export default PostReview;

 */
