import { Typography, AppBar, Toolbar, } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import useStyles from '../styles';
import LoginButton from './login'
import LogoutButton from './logout'
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = (props)=>{
    const classes = useStyles();
    const { user, isAuthenticated, isLoading } = useAuth0();
    return(
      <AppBar position='fixed'>
        <Toolbar>
          <Link to='/' style={{color: 'white', marginLeft: 'auto'}}><HomeIcon className={classes.icon}/></Link>
          { isAuthenticated && <LogoutButton /> }
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;
