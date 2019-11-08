import fetch from 'isomorphic-unfetch';
import {
  Button,
  Container,
  FormHelperText,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
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
    <Paper className={classes.container} square>
      <Typography
        align="left"
        variant="h4"
      >
        Add Driver
      </Typography>

      <TextField
        data-testid="driver-input-wrap"
        fullWidth
        label="Select Driver"
        margin="normal"
        // onChange={resetErrorStateOnInputChange(setDriverEmail)}
        placeholder="Enter the driver's email address"
        required
        type="text"
        variant="outlined"
      />

      <TextField
        data-testid="depot-select-wrap"
        fullWidth
        label="Assign a Depot"
        margin="normal"
        // onChange={resetErrorStateOnInputChange(setSelectedDepot)}
        required
        select
        type="text"
        variant="outlined"
      >
        {depots.map(depot => (
          <MenuItem
            value={depot.id}
            key={depot.id}
          >
            {depot.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        color='primary'
        // onClick={handleAddDriver}
        fullWidth
        size='large'
        variant='contained'
      >
        Add Driver
      </Button>
    </Paper>
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
