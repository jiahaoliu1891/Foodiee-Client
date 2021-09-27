import useStyles from '../styles';
import { Collapse, IconButton, Avatar, CardHeader, Container, Grid, Typography, Button, Card, CardActions, CardContent, CardMedia, } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { red } from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';


const cardStyles = makeStyles((theme) => ({
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
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const PosterCard = function (props) {
  const cardClass = cardStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={cardClass.card} >
        <CardHeader
          avatar={
            <Avatar className={cardClass.avatar} aria-label="recipe">
              {props.userName ? props.userName.charAt(0).toLocaleUpperCase() : "S"}
            </Avatar>
          }
          title={props.userName ? props.userName : "Shawn Liu"}
          subheader="September 14, 2016"
        />
        <CardMedia
          className={cardClass.cardMedia}
          image={props.img}
        />
        <CardContent className={cardClass.cardContent}>
          <Typography variant='h5' >
            {props.title}
            <hr />
            {expanded ? "Expand!" : "Not Expand"}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" style={{ marginTop: "15px" }} >
            {props.description}
          </Typography> */}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(cardClass.expand, {
              [cardClass.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and
              set aside for 10 minutes.
            </Typography>

          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}


function RestaurantList(props) {
  const classes = useStyles();

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data) // new
      })
  }, [])

  posts = posts.reverse()
  console.log(posts);

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth='md' style={{ height: '100%' }}>
        <Grid container spacing={4} >
          {
            // allRestaurantsPosters.map((poster) => (<RestaurantCard img='https://source.unsplash.com/random'/>))
            posts.map((post) => (
              <PosterCard
                img={post.images[0].url}
                key={post._id}
                title={post.title}
                description={post.description}
                userName={post.userName}
              />)
            )
          }
          {
            // allRestaurantsPosters.map((poster) => (<RestaurantCard img='https://source.unsplash.com/random'/>))
            posts.map((post) => (
              <PosterCard
                img={post.images[0].url}
                key={post._id}
                title={post.title}
                description={post.description}
                userName={post.userName}
              />)
            )
          }
        </Grid>
      </Container>
    </div>
  );
}

export default RestaurantList;

