import React, { useState, useEffect } from 'react';

// import style from './siddur.module.css'
import { Feeling, Prayer } from 'src/types/types';
import { getAllPrayers, getAllFeelings } from '../../api/firebase';
import Loading from '../Loading/Loading';
import PrayerDisplay from '../PrayerDisplay/PrayerDisplay';

// Message format: Happy (3), Sad (2), etc.
// TODO: limit to certain number
function getPrayerMessage(prayer: Prayer, feelings: Feeling[]) {
  const feelingsMap = new Map<string, number>(); // map of feeling ID to amount of responses
  for (const response of prayer.responses) {
    const count = feelingsMap.get(response.feeling) ?? 0;
    feelingsMap.set(response.feeling, count + 1);
  }
  const message = [...feelingsMap]
    .map(([feelingId, count]) => {
      const feeling = feelings.find(f => f.id === feelingId);
      return `${feeling?.name} (${count})`;
    })
    .join(', ');
  return message;
}

const Siddur = () => {
  
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
    <div>
      {
        prayers.map(prayer => {
          const message = getPrayerMessage(prayer, feelings);
          return <PrayerDisplay
            prayerRef={prayer.ref}
            key={prayer.id}
            message={message}
            color="gray"
          />
        })
      }
    </div>
  )

}

export default Siddur;