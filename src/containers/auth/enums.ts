import { EAuthPageComponents } from "../../pages/auth/enums";
import { IFormSubComponents, INavSubComponents, ISubElementData } from "./templates";

export type EElement = 'auth-form';

export enum ESubElements {
  googleButton = 'google-button',
  title = 'title',
  divider = 'divider',
  description = 'description',
  emailInput = 'email-input',
  passwordInput = 'password-input',
  repeatPasswordInput = 'repeat-password-input',
  submitButton = 'submit-button',
  navButton = 'nav-button',
}

export type TSubElementsNames = `${EElement}__${ESubElements}`;

export interface IFormComponent {
  [EAuthPageComponents.form]: IFormSubComponents;
  [EAuthPageComponents.nav]?: INavSubComponents;
};

export type TSubElements = {
  [key in ESubElements]: ISubElementData;
};
