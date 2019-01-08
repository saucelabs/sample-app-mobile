import SyncStorage from 'sync-storage';

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
    SyncStorage.set('session-username', username);

    return true;
  }

  static isLockedOutUser() {

    const curUser = SyncStorage.get('session-username');
    return (curUser === 'locked_out_user');
  }

  static isProblemUser() {
    const curUser = SyncStorage.get('session-username');
    return (curUser === 'problem_user');
  }
}

Credentials.VALID_USERNAMES = [
  'standard_user',
  'locked_out_user',
  'problem_user',
];

Credentials.VALID_PASSWORD = 'secret_sauce';
