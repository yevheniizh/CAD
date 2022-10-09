import { IState } from "../../models/typings";
import { EAuthPageComponents, EViews } from "../../pages/auth/enums";
import { ESubElements } from "./enums";

export type ISubElementData = {
  text: string;
};

export type IInputData = {
  label:       string,
  placeholder: string,
};

export interface IComponents {
  [EAuthPageComponents.form]: IFormSubComponents;
  [EAuthPageComponents.nav]?: INavSubComponents;
};

export interface IFormSubComponents {
  [ESubElements.title]:                ISubElementData;
  [ESubElements.googleButton]?:        ISubElementData;
  [ESubElements.divider]?:             boolean;
  [ESubElements.description]?:         ISubElementData;
  [ESubElements.emailInput]?:          IInputData;
  [ESubElements.passwordInput]?:       IInputData;
  [ESubElements.repeatPasswordInput]?: IInputData;
  [ESubElements.submitButton]:         ISubElementData,
  [ESubElements.navButton]?:           ISubElementData,
};

export interface INavSubComponents {
  [ESubElements.navButton]:    ISubElementData,
  [ESubElements.description]?: ISubElementData;
};

export interface IOwnState extends IState {
  view: IView;
};

export type IRedirects = {
  [key in EAuthPageComponents]?: { [key in ESubElements]?: EViews }
};

export type IView = {
  name:       EViews;
  components: IComponents;
  redirects?: IRedirects;
};

export type IViewes = {
  [key in EViews]: IView;
};

export const viewes: IViewes = {
  [EViews.logIn]: {
    name: EViews.logIn,
    components: {
      [EAuthPageComponents.form]: {
        [ESubElements.title]:         { text: 'Log in' },
        [ESubElements.googleButton]:  { text: 'Log in with Google' },
        [ESubElements.divider]:       true,
        [ESubElements.emailInput]:    { label: 'Email', placeholder: 'Enter your email' },
        [ESubElements.passwordInput]: { label: 'Password', placeholder: 'Enter your password' },
        [ESubElements.submitButton]:  { text: 'Log in' },
        [ESubElements.navButton]:     { text: 'Forgot the password?' },
      },
      [EAuthPageComponents.nav]: {
        [ESubElements.navButton]:   { text: 'Sign up' },
        [ESubElements.description]: { text: 'Don’t have an account?' },
      },
    },
    redirects: {
      [EAuthPageComponents.form]: {
        // TODO: if submit valided -> redirect to main page
        [ESubElements.navButton]: EViews.forgotPassword,
      },
      [EAuthPageComponents.nav]: {
        [ESubElements.navButton]: EViews.signUp,
      },
    },
  },

  [EViews.signUp]: {
    name: EViews.signUp,
    components: {
      [EAuthPageComponents.form]: {
        [ESubElements.title]:               { text: 'Sign up' },
        [ESubElements.googleButton]:        { text: 'Sign up with Google' },
        [ESubElements.divider]:             true,
        [ESubElements.emailInput]:          { label: 'Email',  placeholder: 'Enter your email' },
        [ESubElements.passwordInput]:       { label: 'Password', placeholder: 'Enter your password' },
        [ESubElements.repeatPasswordInput]: { label: 'Repeat password', placeholder: 'Repeat your password' },
        [ESubElements.submitButton]:        { text: 'Sign up' },
      },
      [EAuthPageComponents.nav]: {
        [ESubElements.navButton]:   { text: 'Log in' },
        [ESubElements.description]: { text: 'Already have an account?' },
      },
    },
    redirects: {
      [EAuthPageComponents.nav]: {
        [ESubElements.navButton]: EViews.logIn,
      },
    },
  },

  [EViews.forgotPassword]: {
    name: EViews.forgotPassword,
    components: {
      [EAuthPageComponents.form]: {
        [ESubElements.title]:       { text: 'Forgot password' },
        [ESubElements.description]: { text: 'Don’t worry! Just enter your email and we’ll send you a recovery link.' },
        [ESubElements.emailInput]:   { label: 'Email', placeholder: 'Enter your email' },
        [ESubElements.submitButton]: { text: 'Send a recovery link' },
      },
      [EAuthPageComponents.nav]: {
        [ESubElements.navButton]: { text: 'Back to Log in' },
      },
    },
    redirects: {
      [EAuthPageComponents.nav]: {
        [ESubElements.navButton]: EViews.logIn,
      },
    },
  },

  [EViews.changePassword]: {
    name: EViews.changePassword,
    components: {
      [EAuthPageComponents.form]: {
        [ESubElements.title]:               { text: 'Change password' },
        [ESubElements.passwordInput]:       { label: 'Password', placeholder: 'Enter your password' },
        [ESubElements.repeatPasswordInput]: { label: 'Repeat password', placeholder: 'Repeat your password' },
        [ESubElements.submitButton]:        { text: 'Save new password' },
      },
    },
  },

  [EViews.passwordChanged]: {
    name: EViews.passwordChanged,
    components: {
      [EAuthPageComponents.form]: {
        [ESubElements.title]:        { text: 'Password is changed!' },
        [ESubElements.description]:  { text: 'Please try loging in using your new password.' },
        [ESubElements.submitButton]: { text: 'Back to Log in' },
      },
    },
    redirects: {
      [EAuthPageComponents.form]: {
        [ESubElements.navButton]: EViews.logIn,
      },
    },
  },

  [EViews.linkSent]: {
    name: EViews.linkSent,
    components: {
      [EAuthPageComponents.form]: {
        [ESubElements.title]:       { text: 'Link is sent!' },
        [ESubElements.description]: { text: 'Please check your email and follow the instruction on how to change your password.' },
        [ESubElements.submitButton]: { text: 'Go to Log in' },
      },
    },
    redirects: {
      [EAuthPageComponents.form]: {
        [ESubElements.navButton]: EViews.logIn,
      },
    },
  },
};
