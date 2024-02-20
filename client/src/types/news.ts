import { Article } from './articles';

export interface NewsData {
  status: string;
  totalResults: number;
  articles: Article[];
}
