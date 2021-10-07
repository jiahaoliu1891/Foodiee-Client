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

const useStyles = makeStyles((theme) => ({
    posterImage: {
        width: "500",
        height: "auto"
    }
}))

const Heading = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export default function ShowDialog(props) {
    const [open, setOpen] = React.useState(false);
    const styles = useStyles();

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
                            <Heading> Name </Heading>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                            <Item>xs=4</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>xs=4</Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item>xs=8</Item>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography color="primary">
                                {props.poster.title}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <img src={props.poster.images[0].url} width="500" height="auto" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Typography color="primary" >
                                Resteruant Name: {props.poster.location}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography color="primary" >
                                Price: {props.poster.price} $
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="primary" >
                                Description: {props.poster.description}
                            </Typography>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>
        </>
    );
}
