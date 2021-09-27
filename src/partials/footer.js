import { Typography, AppBar, Toolbar, } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import useStyles from '../styles';

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Typography variant='h6' align='center' gutterButton>
                Foodiee
            </Typography>
            <Typography variant='subtitle1' align='center' color='textSecondary'>
                developed by Jiahao Liu
            </Typography>
        </footer>
    );
}

export default Footer;
