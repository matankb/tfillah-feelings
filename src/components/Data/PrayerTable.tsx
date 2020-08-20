import React from 'react';

import style from './data.module.css'
import { Prayer, Feeling } from 'src/types/types';

function parsePrayerName(ref: string) {
  return decodeURIComponent(ref)
    .split('Siddur Ashkenaz, Weekday, Shacharit, ')[1]
    .trim()
}

interface PrayerTableProps { 
  prayers: Prayer[];
  feelings: Feeling[];
};

const PrayerTable = ({ prayers, feelings }: PrayerTableProps) => (
  <table className={style['prayer-table']}>
    <thead>
      <tr>
        <th>Prayer Name</th>
        <th>Feelings</th>
      </tr>
    </thead>
    <tbody>
      {
        prayers.map(prayer => (
          <tr key={prayer.id}>
            <td> {parsePrayerName(prayer.ref)} </td>
            <td>
              <ul className={style['feelings-list']}>
                {
                  prayer.responses.map((response, i) => {
                    const feeling = feelings.find(f => f.id === response.feeling);
                    return <li key={i}>{feeling?.name} (Age {response.age})</li>
                  })
                }
              </ul>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default PrayerTable