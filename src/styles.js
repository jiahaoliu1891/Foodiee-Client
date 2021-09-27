import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        padding: '20px 20px 20px 20px',
      },
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    icon: {
        marginRight: '20px',
    },
    buttons: {
        marginTop: '40px'
    },
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
    }
}));

export default useStyles;