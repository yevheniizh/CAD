export default async function(path, match) {
  const main = document.querySelector('main');

  main.classList.add('is-loading');
  console.log('path', path);
  const { default: Page } = await import(`../pages/${path}.js`);
  const page = new Page(match);
  const element = await page.render();

  main.classList.remove('is-loading');

  const contentNode = document.querySelector('#content');

  contentNode.innerHTML = '';
  contentNode.append(element);

  return page;
}
