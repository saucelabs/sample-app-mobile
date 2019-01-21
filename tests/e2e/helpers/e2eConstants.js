export const DEFAULT_TIMEOUT = 15000;
export const LOGIN_USERS = {
  LOCKED:{
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  NO_MATCH:{
    username: 'd',
    password: 'd',
  },
  NO_USER_DETAILS:{
    username: '',
    password: '',
  },
  NO_PASSWORD:{
    username: 'standard_user',
    password: '',
  },
  STANDARD:{
    username: 'standard_user',
    password: 'secret_sauce',
  },
};
export const PERSONAL_INFO = {
  STANDARD:{
    firstName: 'Sauce',
    lastName: 'Bot',
    zip: '94105',
  },
  NO_FIRSTNAME:{
    firstName: '',
    lastName: 'Bot',
    zip: '94105',
  },
  NO_LAST_NAME:{
    firstName: 'Sauce',
    lastName: '',
    zip: '94105',
  },
  NO_POSTAL_CODE:{
    firstName: 'Sauce',
    lastName: 'Bot',
    zip: '',
  },
};
export const BUNDLE_IDS = {
  ANDROID: 'com.swaglabsmobileapp',
  IOS: 'org.reactjs.native.example.SwagLabsMobileAppTests',
};
