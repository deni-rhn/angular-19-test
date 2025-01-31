export const openUrl = (url: string): void => {
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  window.open(url);
}