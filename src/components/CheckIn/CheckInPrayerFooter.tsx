import React from 'react';

import style from './check-in.module.css'
import { Prayer, Feeling } from 'src/types/types';
import MorePopover from '../MorePopover/MorePopover';

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

  if (!otherFeelings.length) {
    return null;
  }

  return (
    <div className={style['prayer-footer-message']}>
      Also tagged
      {
        otherFeelings.slice(0, 3).map(({ feeling, count }) => (
          <div className={style['also-tagged']} key={feeling.id}>
            <div
              className={style['also-tagged-circle']}
              style={{ background: feeling.color }}
            />
            {feeling.name} ({ count})
          </div>
        ))
      }
      <MorePopover
        content={
          otherFeelings.slice(3).map(({ feeling, count }) => (
            <div>
              {feeling.name} ({ count})
            </div>
          ))
        }
      />
    </div>
  );
}
export default CheckInPrayerFooter;