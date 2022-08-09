import { ENotificationTypes } from "./enums.js";

export class Notification {
  static activeNotification = null;

  element; // HTMLElement;

  constructor(text, {duration, type = ENotificationTypes.info} = {}) {
    this.text = text;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return (
      `<div class="notification notification--${this.type} visible">
        ${this.text}
      </div>`
    )
  }

  render() {
    // Don't put a new notification in stack
    if (Notification.activeNotification) {
      Notification.activeNotification.remove();
    }

    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    Notification.activeNotification = this.element;
  }

  show(parent = document.body) {
    parent.append(this.element);

    setTimeout(() => {
      this.element.classList.remove('visible');
    }, this.duration);

    this.element.addEventListener('animationend', function(e) {
      e.animationName === 'fadeOut' && this.remove();
    });
  }

  remove() {
    this.element.remove();
  }
}