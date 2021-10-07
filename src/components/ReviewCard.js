import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container"
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from '@material-ui/icons/Delete';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from '@material-ui/core/styles';
import { red, yellow, green, blue, blueGrey } from "@material-ui/core/colors";
import { useAuth0 } from "@auth0/auth0-react";
import { useAlert } from "react-alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditDialog from "./editDialog";
import ShowDialog from "./showDialog";
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    padding: '20px 20px 20px 20px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: blueGrey[500],
  },
  expandIcon: {
    marginLeft: 'auto',
  },
  showDialogIcon: {
    marginLeft: '0',
  },
  deleteIcon: {
    marginRight: 'auto',
    color: red[300],
    padding: '5px'
  },
  editIcon: {
    marginRight: 'auto',
    color: blue[300],
    padding: '5px'
  }
}));

function DeleteButton(props) {
  const [deleteDialog, setDeleteDialog] = useState(false)
  const handleTrigerDeleteDialog = () => {
    setDeleteDialog(!deleteDialog);
  }

  const handleConfirmDelete = (posterId) => {
    console.log(`Confirm Delete ${posterId}`);
    // POST Delet request to backend 
    fetch(`https://foodiee.online:4000/api/v1/restaurants/${posterId}`, {
      method: 'DELETE',
      // headers: { "Content-Type": "application/json" },
    }).then(r => r.json())
      .then(d => {
        console.log(d);
        setDeleteDialog(!deleteDialog);
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
        setDeleteDialog(!deleteDialog);
      })
  }

  const handleNotDelete = async (id) => {
    console.log("Not Delete");
    setDeleteDialog(!deleteDialog);
  }

  return (
    <>
      {/* Button to trigger the opening of the dialog */}
      <IconButton onClick={handleTrigerDeleteDialog} className={props.classes}><DeleteIcon /></IconButton>
      {/* Dialog that is displayed if the state open is true */}
      <Dialog
        open={deleteDialog}
        onClose={handleTrigerDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are deleteing your poster!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleNotDelete} color="primary" >
            Cancel
          </IconButton>
          <IconButton onClick={() => handleConfirmDelete(props.posterId)} color="primary" autoFocus>
            Confirm
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );

}

function ReviewCard(props) {
  const [expend, setExpend] = useState(false)
  const handleExpandClick = () => {
    setExpend(!expend);
  };

  return (
    <Card >
      <CardHeader
        avatar={
          <Avatar className={props.classes.avatar} aria-label="recipe" >
            {props.postAuthor ? props.postAuthor.charAt(0).toLocaleUpperCase() : "S"}
          </Avatar>
        }
        title={props.postAuthor ? props.postAuthor : "Shawn Liu"}
        subheader={props.date}
      />
      <CardMedia
        className={props.classes.cardMedia}
        image={props.img}
      />
      <CardContent>
        <Typography noWrap variant="h6" color="textSecondary" component="p">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
          props.isAuthor && (
            <div>
              <DeleteButton
                classes={props.classes.deleteIcon}
                posterId={props.posterId}
              />
              {/* <IconButton className={props.classes.deleteIcon} >
                <DeleteIcon />
              </IconButton> */}
              <EditDialog
                iconClass={props.classes.editIcon}
                poster={props.poster}
                posterId={props.posterId}
              />
            </div>
          )
        }
        <IconButton onClick={handleExpandClick} className={props.classes.expandIcon}>
          <ExpandMoreIcon />
        </IconButton>

        <ShowDialog
          iconClass={props.classes.showDialogIcon}
          poster={props.poster}
          posterId={props.posterId}
        />
      </CardActions>
      <Collapse in={expend} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{
            fontWeight: 'bold',
            display: 'flex',
            fontSize: 18,
            alignItems: 'right',
          }}
          >
            {props.poster.location}
          </Box>

          <Box component="span" style={{ color: 'gray', fontSize: 15 }}>
            $ {props.poster.price}
          </Box>
          {/* <Box sx={{
            mt: 1.5,
            p: 0.5,
            backgroundColor: "#839b5c",
            borderRadius: '5px',
            color: 'white',
            display: 'flex',
            fontSize: 18,
            alignItems: 'center',
          }}
          >
            {props.description}
          </Box> */}
        </CardContent>
      </Collapse>
    </Card>
  );

}


function ReviewCardGrid() {
  const [posts, setPosts] = useState([])
  const styles = useStyles();
  useEffect(() => {
    fetch("https://foodiee.online:4000/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.reverse()) // new
      })
      .catch(e => console.log(e))
  }, [])
  // console.log(posts);
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <Container maxWidth='md' className={styles.cardGrid}>
        <Grid container spacing={4}>
          {
            posts.map((post, idx) => (
              <Grid item xs={12} sm={6} md={4}>
                <ReviewCard
                  img={post.images[0].url}
                  key={idx}
                  posterId={post._id}
                  title={post.title}
                  description={post.description}
                  postAuthor={post.userName}
                  isAuthor={isAuthenticated && (user.name === post.userName)}
                  date={new Date().toISOString().split('T')[0]}
                  classes={styles}
                  poster={post}
                />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </div>
  )
}

export default ReviewCardGrid;
