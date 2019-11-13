import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { withAuthSync } from './../utils/auth';

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
  loginButton: {
    margin: 'auto',
  },
}));

function Home({ userSession }) {
  const classes = useStyles();
  const { displayName, xAuthToken } = userSession;
  const greeting = xAuthToken ? `Hi, ${displayName}! 👋` : `Hi, stranger! 👽`;
  return (
    <main className={classes.container}>
      <Typography variant="h4">{greeting}</Typography>
    </main>
  );
}

export default withAuthSync(Home);
