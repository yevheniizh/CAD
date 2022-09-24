import { IState } from "../../models/typings";
import { EStates, ESubElements } from "./enums";

export type ISubElementData = {
  text:        string;
  description?: string;
};

export type IInputData = {
  label: string,
  placeholder: string,
};

export interface ISubElementsData {
  [ESubElements.title]:                string;
  [ESubElements.googleButton]?:        boolean;
  [ESubElements.divider]?:             boolean;
  [ESubElements.description]?:         ISubElementData;
  [ESubElements.emailInput]?:          IInputData;
  [ESubElements.passwordInput]?:       IInputData;
  [ESubElements.repeatPasswordInput]?: IInputData;
  [ESubElements.submitButton]:         ISubElementData,
  [ESubElements.navButton]?:           ISubElementData,
};

export interface IOwnState extends IState {
  name:     EStates;
  elements: ISubElementsData;
};

export type IOwnStates = {
  [key in EStates]: IOwnState;
};

export const states: IOwnStates = {
  [EStates.logIn]: {
    name: EStates.logIn,
    elements: {
      title: 'Log in',
      googleButton: true,
      divider: true,
      emailInput: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      passwordInput: {
        label: 'Password',
        placeholder: 'Enter your password',
      },
      submitButton: {
        text: 'Log in',
      },
      navButton: {
        text: 'Forgot the password?',
      },
    }
  },
  [EStates.signUp]: {
    name: EStates.signUp,
    elements: {
      title: 'Sign up',
      googleButton: true,
      divider: true,
      emailInput: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      passwordInput: {
        label: 'Password',
        placeholder: 'Enter your password',
      },
      repeatPasswordInput: {
        label: 'Repeat password',
        placeholder: 'Repeat your password',
      },
      submitButton: {
        text: 'Sign up',
      },
    },
  },
  [EStates.forgotPassword]: {
    name: EStates.forgotPassword,
    elements: {
      title: 'Forgot password',
      description: {
        text: 'Don’t worry! Just enter your email and we’ll send you a recovery link.'
      },
      emailInput: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      submitButton: {
        text: 'Send a recovery link',
      },
    },
  },
  [EStates.changePassword]: {
    name: EStates.changePassword,
    elements: {
      title: 'Change password',
      passwordInput: {
        label: 'Password',
        placeholder: 'Enter your password',
      },
      repeatPasswordInput: {
        label: 'Repeat password',
        placeholder: 'Repeat your password',
      },
      submitButton: {
        text: 'Save new password',
      },
    },
  },
  [EStates.passwordChanged]: {
    name: EStates.passwordChanged,
    elements: {
      title: 'Password is changed!',
      description: {
        text: 'Please try loging in using your new password.'
      },
      submitButton: {
        text: 'Back to Log in',
      },
    },
  },
  [EStates.linkSent]: {
    name: EStates.linkSent,
    elements: {
      title: 'Link is sent!',
      description: {
        text: 'Please check your email and follow the instruction on how to change your password.'
      },
      submitButton: {
        text: 'Go to Log in',
      },
    },
  },
};

export interface INavState extends IState {
  name:     EStates;
  elements: {
    [ESubElements.navButton]: ISubElementData,
  };
};

export type INavStates = {
  [key in EStates]: INavState;
};

export const navStates: Partial<INavStates> = {
  [EStates.logIn]: {
    name: EStates.logIn,
    elements: {
      navButton: {
        text: 'Sign up',
        description: 'Don’t have an account?',
      },
    }
  },
  [EStates.signUp]: {
    name: EStates.signUp,
    elements: {
      navButton: {
        text: 'Log in',
        description: 'Already have an account?',
      },
    },
  },
  [EStates.forgotPassword]: {
    name: EStates.forgotPassword,
    elements: {
      navButton: {
        text: 'Back to Log in',
      },
    },
  },
};
