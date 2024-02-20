import { NewsData } from '../types/news';

// eslint-disable-next-line max-len
const BASE_URL = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=36555ceb408a4e9da8aaf27277072753';

function request<T>(): Promise<T> {
  return fetch(BASE_URL).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const getNews = () => request<NewsData>();
