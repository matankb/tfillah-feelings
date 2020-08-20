import React from 'react';

import style from './check-in.module.css'
import { Prayer, Feeling } from 'src/types/types';

interface PrayerFooterProps {
  prayer: Prayer;
  primaryFeeling: Feeling;
  wantFeelings: Feeling[];
}

const CheckInPrayerFooter = (props: PrayerFooterProps) => {

  const { prayer, primaryFeeling, wantFeelings } = props;

  const otherFeelings = wantFeelings
    .filter(feeling => feeling.id !== primaryFeeling.id)
    .map(feeling => ({
      feeling,
      count: prayer.responses.filter(response => response.feeling === feeling.id).length
    }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)

  return (
    <div className={style['prayer-footer-message']}>
      Also tagged
      {
        otherFeelings.map(({ feeling, count }) => (
          <div className={style['also-tagged']} key={feeling.id}>
            <div
              className={style['also-tagged-circle']}
              style={{ background: feeling.color }}
            />
            {feeling.name} ({ count})
          </div>
        ))
      }
    </div>
  );
}
export default CheckInPrayerFooter;