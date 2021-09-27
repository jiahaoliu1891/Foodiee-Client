import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

const env = {
    cloudinary_cloud_name: 'shawn1891',
    cloudinary_url: "https://api.cloudinary.com/v1_1/shawn1891/image/upload",
    cloudinary_upload_preset: "foodiee"
}

export default function EditDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [images, setImages] = React.useState(null);
    // imageUrls no use
    const [imageUrls, setImageUrls] = React.useState(null);
    const [price, setPrice] = React.useState(props.poster.price);
    const [title, setTitle] = React.useState(props.poster.title);
    const [description, setDescription] = React.useState(props.poster.description);
    const [restaruantName, setRestaruantName] = React.useState(props.poster.location);


    const priceChangeHandler = (e) => {
        setPrice(e.target.value)
    }
    const titleChangeHandler = (e) => {
        setTitle(e.target.value)
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value)
    }   
    const restaruantNameChangeHandler = (e) => {
        setRestaruantName(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setImages(null);
        setImageUrls(null);
        setPrice(props.poster.price);
        setTitle(props.poster.title);
        setDescription(props.poster.description);
        setRestaruantName(props.poster.location);
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        const notChange = (images === null) 
                            && (imageUrls === null)
                            && (price === props.poster.price)
                            && (title === props.poster.title)
                            && (description === props.poster.description)
                            && (restaruantName === props.poster.location);
        if (notChange) {
            alert("Nothing has changed!")
        }

        // Upload image to cloudinary
        const imgUrls = []
        
        if (images != null) {
            const imageData = new FormData();
            imageData.append("cloud_name", env.cloudinary_cloud_name)
            // Post Image to cloudinary
            for (let i = 0; i < images.length; i++) {
                let img = images[i];
                imageData.append("file", img);
                imageData.append("upload_preset", env.cloudinary_upload_preset);
                const res = await fetch(env.cloudinary_url, { method: "POST", body: imageData });
                if (!res.ok) {
                    console.log(res)
                    return
                }
                const data = await res.json();
                console.log(data.url)
                imgUrls.push({
                    url: data.url,
                    filename: img.name
                })
            }
        }

        const editedData = {
            title: title,
            location: restaruantName,
            description: description,
            price: price,
            images: imgUrls
        };

        const res = await fetch(`https://foodiee.online:4000/api/v1/restaurants/${props.posterId}`, {
            method: 'PUT',
            body: JSON.stringify(editedData),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            console.log(res)
            return
        }
        const resData = await res.json();
        console.log(resData);
        window.location.reload();
    };

    const handleFileSelect = (e) => {
        console.log(e.target.files)
        setImages(e.target.files)
        setImageUrls([])
    }


    return (
        <>

            <IconButton className={props.iconClass} onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Your Poster</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        defaultValue={props.poster.title}
                        onChange={titleChangeHandler}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="location"
                        label="Restaruant name"
                        type="text"
                        fullWidth
                        onChange={restaruantNameChangeHandler}
                        defaultValue={props.poster.location}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="price $"
                        type="number"
                        fullWidth
                        onChange={priceChangeHandler}
                        defaultValue={props.poster.price}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="location"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={1}
                        onChange={descriptionChangeHandler}
                        defaultValue={props.poster.description}
                    />
                    <Button component="label" >
                        Change image
                        <input type="file" name="image" multiple hidden onChange={handleFileSelect} />
                    </Button>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>



            </Dialog>
        </>
    );
}
