import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const colors = {
  search: 'highlight-blue',
  realia: 'highlight-yellow',
  idiom: 'highlight-green',
  anthroponym: 'highlight-purple'
};

export default function TooltipSpan({ token }) {
  const className = colors[token.type] || '';
  const content = <span className={className}>{token.text}</span>;
  return token.explanation ? (
    <Tooltip title={token.explanation}>{content}</Tooltip>
  ) : (
    content
  );
}
