import React, { useEffect } from 'react';
import uniqid from 'uniqid';
import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as newsActions from '../../features/news';
import { NewsCard } from '../NewsCard/NewsCard';
import './AsideNewsList.scss';

export const AsideNewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(newsActions.init());
  }, [dispatch]);

  return (
    <aside className="aside-list" data-testid="news">
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {error ? (
        <p>{error}</p>
      ) : (
        articles.map((article) => (
          <NewsCard key={uniqid()} article={article} />
        ))
      )}
    </aside>
  );
};
