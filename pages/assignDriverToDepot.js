import {
  Button,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  assignDriverToDepot,
  getDepotsForDispensary,
  getUserId,
} from './../api';
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

function AssignDriverToDepot({ depots }) {
  const classes = useStyles();

  return (
    <Paper className={classes.container} square>
      <Typography align="left" variant="h4">
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
        value=""
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
        value=""
        variant="outlined"
      >
        {depots.map(depot => (
          <MenuItem value={depot.id} key={depot.id}>
            {depot.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        color="primary"
        // onClick={handleAddDriver}
        fullWidth
        size="large"
        variant="contained"
      >
        Add Driver
      </Button>
    </Paper>
  );
}

AssignDriverToDepot.getInitialProps = async ctx => {
  let { xAuthToken = '', dispensaryId } = getUserSessionFromContext(ctx);
  dispensaryId = 2; // I don't have a dispensary id
  let pageProps = { depots: [] };
  const depots = await getDepotsForDispensary(xAuthToken, dispensaryId);
  if (depots.length) pageProps.depots = depots;
  return pageProps;
};

export default withAuthSync(AssignDriverToDepot);
