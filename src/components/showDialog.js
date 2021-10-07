import React from 'react';
import { styled } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import yellow from "@material-ui/core/colors/yellow";

const useStyles = makeStyles({
    heading: {
        textAlign: "center",
    }
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    backgroundColor: yellow[50],
    color: theme.palette.text.primary
}));

export default function ShowDialog(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton className={props.iconClass} onClick={handleClickOpen}>
                <AspectRatioIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Poster Detail</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} alignItems="center" justifyContent="center">
                            <Typography variant="h4" className={classes.heading}> {props.poster.title} </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} align="center">
                            <img src={props.poster.images[0].url} width="500" height="auto" />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="button" display="block"> Resteruant Name: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>{props.poster.location}</Item>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="button" display="block"> Price: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>{props.poster.price} $</Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>
                                <Typography variant="body1" > {props.poster.description} </Typography>
                            </Item>
                        </Grid>


                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}
