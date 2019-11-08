import { makeStyles } from '@material-ui/styles';
import { LoginForm } from './../components';

const useStyles = makeStyles(theme => ({
  container: {
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    maxWidth: theme.spacing(128),
    padding: theme.spacing(4, 6),
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    margin: 'auto',
  },
  welcomeTitle: {},
  paragraphs: {
    marginBottom: theme.spacing(8),
  },
}));

function Login() {
  const classes = useStyles();

  return (
    <main className={classes.container}>
      <LoginForm />
    </main>
  );
}

export default Login;
