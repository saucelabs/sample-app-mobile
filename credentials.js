import { AsyncStorage } from "react-native"

export class Credentials {

  static verifyCredentials(username, password) {
	if (password !== Credentials.VALID_PASSWORD) {
	  return false;
	}
	
	if (Credentials.VALID_USERNAMES.indexOf(username) < 0) {
	  return false;
	}

	// If we're here, we had a valid username and password.
	// Store the username in our session storage.
	storeValue = async () => { await AsyncStorage.setItem('session-username', username) };
	storeValue();

	return true;
  }

  static async isLockedOutUser() {
    const curUser = await AsyncStorage.getItem('session-username');
    return await (curUser === "locked_out_user");
  }

  static async isProblemUser() {
    const curUser = await AsyncStorage.getItem('session-username');
    return await (curUser === "problem_user");
  }
}

Credentials.VALID_USERNAMES = [
  "standard_user",
  "locked_out_user",
  "problem_user"
];

Credentials.VALID_PASSWORD = "secret_sauce";