import React, { useState, useEffect } from 'react';

import { Feeling, Prayer } from '../../types/types';
import { getAllPrayers, getAllFeelings } from '../../api/firebase';

import style from './data.module.css'
import Loading from '../Loading/Loading';


function parsePrayerName(ref: string) {
  return decodeURIComponent(ref)
    .split('Siddur Ashkenaz, Weekday, Shacharit, ')[1]
    .trim()
}

const Data = () => {

  const [feelings, setFeelings] = useState<Feeling[]>();
  const [prayers, setPrayers] = useState<Prayer[]>();

  useEffect(() => {
    getAllPrayers().then(setPrayers);
    getAllFeelings().then(setFeelings);
  }, []);

  if (!prayers || !feelings) {
    return <Loading />
  }

  return (
    <div className={style['raw-data-wrap']}>
      <h1>Raw Data</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Feelings</th>
          </tr>
        </thead>
        <tbody>
          {
            prayers.map(prayer => (
              <tr key={prayer.id}>
                <td> {parsePrayerName(prayer.ref)} </td>
                <td>
                  {
                    prayer.responses.map((response, i) => {
                      const feeling = feelings.find(f => f.id === response.feeling);
                      return <li key={i}>{feeling?.name} (Age {response.age})</li>
                    })
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

}

export default Data