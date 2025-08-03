import React from 'react';
import TooltipSpan from './TooltipSpan.js';

export default function ResultTable({ results }) {
  if (!results.length) return <p>Результатов нет.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Узбекский</th>
          <th>Русский</th>
        </tr>
      </thead>
      <tbody>
        {results.map((res) => (
          <tr key={res.id}>
            <td>
              {res.uz.map((t, i) => (
                <TooltipSpan key={i} token={t} />
              ))}
            </td>
            <td>
              {res.ru.map((t, i) => (
                <TooltipSpan key={i} token={t} />
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
