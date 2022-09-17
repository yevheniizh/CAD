export const EAuthPageStates = {
  logIn: 'logIn',
  signUp: 'signUp',
  forgotPassword: 'forgotPassword',
  changePassword: 'changePassword',
  passwordChanged: 'passwordChanged',
  linkSent: 'linkSent',
}

export const authPageStates = {
  [EAuthPageStates.logIn]: {
    title: 'Log in',
    elements: {
      googleButton: true,
      divider: true,
      description: false,
      emailInput: true,
      passwordInput: true,
      repeatPasswordInput: false,
      submitButton: {
        text: 'Log in',
        description: 'Forgot the password?',
      },
      navButton: {
        text: 'Sign up',
        description: 'Don’t have an account?',
      },
    },
  },
  [EAuthPageStates.signUp]: {
    title: 'Sign up',
    elements: {
      googleButton: true,
      divider: true,
      description: false,
      emailInput: true,
      passwordInput: true,
      repeatPasswordInput: true,
      submitButton: {
        text: 'Sign up',
      },
      navButton: {
        text: 'Log in',
        description: 'Already have an account?',
      },
    },
  },
  [EAuthPageStates.forgotPassword]: {
    title: 'Forgot password',
    elements: {
      googleButton: false,
      divider: false,
      description: {
        text: 'Don’t worry! Just enter your email and we’ll send you a recovery link.'
      },
      emailInput: true,
      passwordInput: false,
      repeatPasswordInput: false,
      submitButton: {
        text: 'Send a recovery link',
      },
      navButton: {
        text: 'Back to Log in',
      },
    },
  },
  [EAuthPageStates.changePassword]: {
    title: 'Change password',
    elements: {
      googleButton: false,
      divider: false,
      description: false,
      emailInput: false,
      passwordInput: true,
      repeatPasswordInput: true,
      submitButton: {
        text: 'Save new password',
      },
      navButton: false,
    },
  },
  [EAuthPageStates.passwordChanged]: {
    title: 'Password is changed!',
    elements: {
      googleButton: false,
      divider: false,
      description: {
        text: 'Please try loging in using your new password.'
      },
      emailInput: false,
      passwordInput: false,
      repeatPasswordInput: false,
      submitButton: false,
      navButton: {
        text: 'Back to Log in',
      },
    },
  },
  [EAuthPageStates.linkSent]: {
    title: 'Link is sent!',
    elements: {
      googleButton: false,
      divider: false,
      description: {
        text: 'Please check your email and follow the instruction on how to change your password.'
      },
      emailInput: false,
      passwordInput: false,
      repeatPasswordInput: false,
      submitButton: false,
      navButton: {
        text: 'Go to Log in',
      },
    },
  },
};
