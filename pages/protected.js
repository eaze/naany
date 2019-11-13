import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { getUserSessionFromContext, withAuthSync } from './../utils/auth';

const useStyles = makeStyles(theme => ({
  container: {
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    maxWidth: theme.spacing(128),
    padding: theme.spacing(4, 6),
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 'auto',
  },
}));

function Protected(props) {
  const { xAuthToken = '' } = props;
  const classes = useStyles();
  const prompt = xAuthToken
    ? `You're authenticated! 🎉`
    : `You need to log in! 🛑`;
  return (
    <main className={classes.container}>
      <Typography variant="h4">{prompt}</Typography>
    </main>
  );
}

Protected.getInitialProps = async ctx => {
  const userSession = getUserSessionFromContext(ctx);
  return userSession;
};

export default withAuthSync(Protected);
