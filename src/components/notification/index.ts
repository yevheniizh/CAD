import { templateToElement } from "../../utils/element";
import { ENotificationType } from "./enums";

export interface INotificationProps {
  text: string;
  optional?: {
    duration?: number;
    type?: ENotificationType;
    parent?: HTMLElement;
  }
}

/**
 * @description Shows only one notification at a time, overrides existing active notification with the latest one
 */
export const Notification = (() => {
  let notification: HTMLElement | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function removeNotification() {
    notification?.removeEventListener('animationend', onAnimationEnd);
    notification?.remove();

    clearTimeout(timer);
    timer = undefined;
  };

  function onAnimationEnd (event: AnimationEvent) {
    event.animationName === 'fadeOut' && removeNotification()
  }

  function getTemplate ({ text, optional: { type = ENotificationType.info } = {} }: INotificationProps ) {
    return (
      `<div class="notification notification--${type} visible">
        ${text}
      </div>`
    );
  }

  function show (props: INotificationProps) {
    const { duration = 2000, parent = document.body } = props?.optional || {};

    if (notification) removeNotification();

    const element = templateToElement(getTemplate(props));

    notification = element;

    parent.append(element);

    timer = setTimeout(() => {
      notification?.classList.remove('visible');
    }, duration);

    element.addEventListener('animationend', onAnimationEnd);
  }

  return ({
    notification,
    show,
    remove: removeNotification,
  });
})();
