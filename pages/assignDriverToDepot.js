import fetch from 'isomorphic-unfetch';
import { Container, makeStyles } from '@material-ui/core';
import { useUserSessionContext } from './../contextes';
import {
  assignDriverToDepot,
  getDepotsForDispensary,
  getUserId,
} from './../api';

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

function AssignDriverToDepot({ depots }) {
  const classes = useStyles();
  const { userSession } = useUserSessionContext();
  console.log(depots);
  return (
    <Container className={classes.container} component="main">
      Check the console
    </Container>
  );
}

AssignDriverToDepot.getInitialProps = async () => {
  // Check if session exists, otherwise reroute
  // Pull the dispensaryId from the user session object
  // -> We won't have access to context objects here since this is a static
  //    method, so we need to access such via localStorage/cookie
  const dispensaryId = 2; // workaround to above problem for now
  let pageProps = { depots: [] };
  const depots = await getDepotsForDispensary(dispensaryId);
  if (depots.length) pageProps.depots = depots;
  return pageProps;
};

export default AssignDriverToDepot;
