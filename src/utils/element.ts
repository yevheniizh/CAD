export const templateToElement = (template: string) => {
  const shell = document.createElement('div');
  shell.innerHTML = template;

  return shell.firstElementChild as HTMLElement;
}
