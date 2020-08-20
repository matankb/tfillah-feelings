import React from 'react';

import style from './data.module.css'
import { Feeling } from 'src/types/types';

interface FeelingTableProps { 
  feelings: Feeling[];
};

const FeelingTable = ({ feelings }: FeelingTableProps) => (
  <table>
    <thead>
      <tr>
        <th>Feeling Name</th>
        <th>Emoji</th>
        <th>Color</th>
        <th>ID</th>
      </tr>
    </thead>
    <tbody>
      {
        feelings.map(feeling => (
          <tr key={feeling.id}>
            <td>{feeling.name}</td>
            <td>{feeling.emoji}</td>
            <td style={{ background: feeling.color }}>
              <span className={style['feeling-color']}>
                {feeling.color}
              </span>
            </td>
            <td>{feeling.id}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default FeelingTable