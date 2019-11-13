import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import makeStyles from '@material-ui/styles/makeStyles';
import sortOn from 'sort-on';

const noop = () => {};

const useStyles = makeStyles(theme => {
  const { pxToRem } = theme.typography;
  return {
    paper: {
      height: '100%',
      padding: `${pxToRem(24)} ${pxToRem(30)}`,
      width: `${pxToRem(666)}`, // hail satan
    },
    typography: {
      paddingBottom: pxToRem(24),
    },
    depotSelect: {
      marginBottom: pxToRem(48),
    },
    generalErrorWarning: {
      paddingLeft: pxToRem(16),
    },
  };
});

/**
 * Interface for promoting a user to a driver and assigning them to a depot.
 * Will not surface any issues related to the user already being a driver.
 */
function AddDriver(props) {
  const {
    addDriverToDepot = noop,
    closeDrawer = noop,
    depots = [],
    preselectedDepotId = '',
  } = props;
  const classes = useStyles(props);
  const [selectedDepot, setSelectedDepot] = React.useState(preselectedDepotId);
  const [driverEmail, setDriverEmail] = React.useState('');
  const [apiError, setApiError] = React.useState(null);
  const sortedDepots = React.useMemo(() => sortOn(depots, 'name'), [depots]);

  /**
   * Resets error state on interface and sets new state for input changed
   * @param {func} setInputStateFunc
   * @param {object} event
   * @returns null
   */
  const resetErrorStateOnInputChange = setInputStateFunc => event => {
    setApiError(null);
    setInputStateFunc(event.target.value);
  };

  const driverInputError =
    apiError === 'User not found.'
      ? 'You must enter a valid user email.'
      : false;

  const fieldsNotPopulated = [!selectedDepot, !driverEmail].some(Boolean);

  /**
   * Submit form to API via redux operation
   * then surface any errors or close the drawer
   */
  const handleAddDriver = async () => {
    const { success, message } = await addDriverToDepot(
      driverEmail,
      selectedDepot,
    );
    if (success) closeDrawer();
    else setApiError(message);
  };

  return (
    <Paper className={classes.paper} square>
      <Typography align="left" className={classes.typography} variant="h4">
        Add Driver
      </Typography>

      <TextField
        data-testid="driver-input-wrap"
        error={!!driverInputError}
        fullWidth
        helperText={driverInputError}
        inputProps={{
          'data-testid': 'driver-input',
        }}
        label="Select Driver"
        margin="normal"
        onChange={resetErrorStateOnInputChange(setDriverEmail)}
        placeholder="Enter the driver's email address"
        required
        variant="filled"
        value={driverEmail}
      />

      <TextField
        className={classes.depotSelect}
        data-testid="depot-select-wrap"
        fullWidth
        label="Assign a Depot"
        margin="normal"
        onChange={resetErrorStateOnInputChange(setSelectedDepot)}
        required
        select
        SelectProps={{
          SelectDisplayProps: {
            // must click this to create "focus" / open menu
            'data-testid': 'depot-select',
          },
        }}
        variant="filled"
        value={selectedDepot}
      >
        {sortedDepots.map(depot => (
          <MenuItem value={depot.id} key={depot.id}>
            {depot.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        color="primary"
        disabled={fieldsNotPopulated || !!driverInputError}
        onClick={handleAddDriver}
        fullWidth
        size="large"
        variant="contained"
      >
        Add Driver
      </Button>

      {apiError && !driverInputError && (
        <FormHelperText className={classes.generalErrorWarning} error>
          An error occurred. Please try again or seek additional help.
        </FormHelperText>
      )}
    </Paper>
  );
}

AddDriver.propTypes = {
  /**
   * @description Invokes redux operation that will perform API call(s)
   * @returns {Object} { success: boolean, message: string }
   */
  addDriverToDepot: PropTypes.func.isRequired,
  /**
   * @description Updates the parent component's state, which unmounts this component
   * @returns {null}
   */
  closeDrawer: PropTypes.func.isRequired,
  depots: PropTypes.array.isRequired,
  /**
   * @description id of depot to preselect in depots array
   * @returns {string} depot id
   */
  preselectedDepotId: PropTypes.number,
};

export default AddDriver;
