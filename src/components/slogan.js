import useStyles from '../styles';
import { Typography, Button, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const PostButton = () => {
  return (<Button component={Link} to="/postReview" variant='contained' color='primary'>
    Make A Poster
  </Button>);
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (<Button variant='contained' color='secondary' onClick={() => loginWithRedirect()}>
    Login
  </Button>);
}

const Slogan = () => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      <div className={classes.container}>
        <Container maxWidth='sm' style={{ marginTop: '100px' }}>
          <Typography variant='h2' align='center' color='textPrimary' >
            Foodiee
          </Typography>
          <Typography variant='h5' align='center' color='textSecondary' paragraph>
            Welecome to Foodiee! Share restaurants you like!
          </Typography>
          <div className={classes.buttons}>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                { isAuthenticated? <PostButton /> : <LoginButton /> }
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      {/* <Container className={classes.cardGrid} maxWidth='md'>
            <Grid container spacing={4}>
              <RestaurantCard />
              {
                cards.map((card) => (<RestaurantCard />))
              }
            </Grid>
          </Container> */}
    </>
  );
}

export default Slogan;
