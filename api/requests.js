import fetch from 'isomorphic-unfetch';

async function signIn(email, password) {
  console.group('AUTHENTICATING');
  let json = { message: 'API failed to provide a explaination.' };
  try {
    const endpoint = 'https://api.staging.eaze.tech/api/auth/signin';
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const response = await fetch(endpoint, requestOptions);
    const json = await response.json();

    if (!response.ok) throw json.message;
    console.log('SUCCESS');
  } catch (error) {
    console.error('Failed to authenticate:', error);
  } finally {
    console.groupEnd();
  }

  return json;
}

async function assignDriverToDepot() {
  return {};
}

async function getAllDispensaries(dispensaryId) {
  console.group('FETCHING DISPENSARIES');
  let json = { message: 'API failed to provide a explaination.' };
  const xAuthToken = 'REPLACE_WITH_AUTH_TOKEN';
  try {
    const endpoint = 'https://api.staging.eaze.tech/api/dispensaries';
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // TODOAH Make this read from cookies
        'X-Auth-Token': xAuthToken,
      },
    };
    const response = await fetch(endpoint, requestOptions);
    json = await response.json();

    if (!response.ok) throw json.message;
    console.log('SUCCESS');
  } catch (error) {
    console.error('Failed to fetch dispensaries:', error);
  } finally {
    console.groupEnd();
  }

  return json;
}

async function getDepotsForDispensary(dispensaryId) {
  const dispensaries = await getAllDispensaries();
  const depots = findDepotsForDispensary(dispensaryId, dispensaries);
  return depots.filter(depot => depot.isEnabled);
}

async function getUserId() {
  return {};
}

/**
 * Returns all depots for a given dispenary id
 * @private
 * @function
 * @param {Number} dispensaryId
 * @param {Array} dispensaries
 * @returns {Array} depots
 */
function findDepotsForDispensary(dispensaryId, dispensaries = []) {
  try {
    const { depots = [] } = dispensaries.find(disp => disp.id === dispensaryId);
    return depots;
  } catch (error) {
    console.error(
      `An error was encountered while searching for depots related to Dispensary ID: ${dispensaryId}`,
      error,
    );
    return [];
  }
}

export {
  assignDriverToDepot,
  getAllDispensaries,
  getDepotsForDispensary,
  getUserId,
  signIn,
};
