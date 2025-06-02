import type{ ReactNode } from 'react';

export const highlightText = (text: string, query: string): ReactNode => {
  if (!query.trim()) return text;

  const escapedQuery = query.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'); // Escape regex chars
  const regex = new RegExp(`(${escapedQuery})`, 'gi');

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-green-300 rounded-sm px-1">{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};
