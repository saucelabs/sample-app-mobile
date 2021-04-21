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

  static getRandomValidCredentials() {
    const VALID_USERNAMES_WITH_EMAILS = Credentials.VALID_USERNAMES.slice(3);

    return {
      username: VALID_USERNAMES_WITH_EMAILS[Math.floor(Math.random() * VALID_USERNAMES_WITH_EMAILS.length)],
      password: Credentials.VALID_PASSWORD
    };
  }
}

Credentials.VALID_USERNAMES = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'simba@lionking.com',
  'pumbaa@lionking.com',
  'mufasa@lionking.com',
  'timon@lionking.com',
  'nala@lionking.com',
  'Zazu@lionking.com',
  'Rafiki@lionking.com',
  'Sarabi@lionking.com'
];

Credentials.VALID_PASSWORD = 'secret_sauce';
