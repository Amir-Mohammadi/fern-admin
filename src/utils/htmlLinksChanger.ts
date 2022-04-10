import {BASE_URL} from './statics';

export const htmlLinksToWord = (html: string): string => {
  var re = new RegExp(BASE_URL, 'g');
  return html.replace(re, 'SERVER_ADDRESS');
};
export const htmlWordToLink = (html: string): string => {
  var re = new RegExp('SERVER_ADDRESS', 'g');
  
  return html.replace(re, BASE_URL);
};
