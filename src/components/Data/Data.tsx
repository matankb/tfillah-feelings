import React, { useState, useEffect } from 'react';

import { Feeling, Prayer } from '../../types/types';
import { getAllPrayers, getAllFeelings } from '../../api/firebase';

import style from './data.module.css'
import Loading from '../Loading/Loading';
import PrayerTable from './PrayerTable';
import FeelingTable from './FeelingTable';

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
      
      <div className={style['explanation']}>
        Note: This raw data will not be available in the final app.
      </div>

      <PrayerTable prayers={prayers} feelings={feelings} />
      
      <FeelingTable feelings={feelings} />

    </div>
  )

}

export default Data