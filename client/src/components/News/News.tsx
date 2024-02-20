import React, { memo } from 'react';
import { AsideNewsList } from '../AsideNewsList/AsideNewsList';

export const News: React.FC = memo(() => {
  return (
    <article>
      <h2 style={{ marginBottom: '20px' }}>News</h2>
      <AsideNewsList />
    </article>
  );
});
