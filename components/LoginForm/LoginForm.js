import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useUserSessionContext } from './../../contextes';
import { signIn } from './../../api';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    maxWidth: theme.typography.pxToRem(320),
    margin: 'auto',
  },
  title: {
    letterSpacing: theme.typography.pxToRem(1),
  },
  passwordInput: {
    marginBottom: theme.spacing(4),
  },
}));

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { setUserSession } = useUserSessionContext() || {};

  const classes = useStyles();

  const processSignInAttempt = React.useCallback(async () => {
    const userSession = await signIn(email, password);
    setUserSession({ userSession });
    Router.push('/assignDriverToDepot');
  }, [signIn, email, password]);

  return (
    <Paper className={classes.container} elevation={3}>
      <Typography className={classes.title} variant="h5" gutterBottom>
        New Phone, Who Dis?
      </Typography>
      <TextField
        autoComplete="email"
        autoFocus
        label="Email"
        margin="normal"
        onChange={({ target: { value } }) => setEmail(value)}
        required
        type="text"
        variant="outlined"
      />
      <TextField
        required
        label="Password"
        className={classes.passwordInput}
        type="password"
        margin="normal"
        variant="outlined"
        autoComplete="password"
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <Button
        color="primary"
        size="large"
        variant="contained"
        onClick={processSignInAttempt}
      >
        Login
      </Button>
    </Paper>
  );
}

export default LoginForm;
