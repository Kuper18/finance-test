import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import { Article } from '../../types/articles';

type Props = {
  article: Article;
};

export const NewsCard: React.FC<Props> = ({ article }) => {
  const {
    urlToImage, description, title, url,
  } = article;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 320, marginBottom: '20px' }}>
      <CardMedia
        component="img"
        height="140"
        image={urlToImage}
        alt="News img"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="small"
          href={url}
          target="_blank"
          sx={{
            border: '1px solid #1976d2',
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
              color: '#1976d2',
              backgroundColor: '#fff',
            },
          }}
        >
          Read More
        </Button>
        <ExpandMoreIcon
          aria-expanded={expanded}
          data-testid="expand-icon"
          onClick={handleExpandClick}
          style={{
            cursor: 'pointer',
            transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        />
      </CardActions>
      <Collapse
        data-testid="collapse-content"
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
