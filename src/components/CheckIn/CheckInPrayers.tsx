import React from 'react';
import { Feeling, Prayer } from 'src/types/types';
import PrayerDisplay from '../PrayerDisplay/PrayerDisplay';

import style from './check-in.module.css';
import getSuggestedPrayers from './prayer-suggest';

// Get message, e.g. "x people said this was <feeling>"
function getPrayerMessage(prayer: Prayer, feeling: Feeling) {
  const matches = prayer.responses.filter(response => response.feeling === feeling.id).length
  return `${matches} ${matches > 1 ? 'people' : 'person'} said this was ${feeling.name.toLowerCase()}`;
}

interface PrayerFooterProps {
  prayer: Prayer;
  primaryFeeling: Feeling;
  wantFeelings: Feeling[];
}

// Get may of feeling ID to amount of responses
function getPrayerFeelingMap(prayer: Prayer) {
  const feelingsMap = new Map<string, number>(); // map of feeling ID to amount of responses
  for (const response of prayer.responses) {
    const count = feelingsMap.get(response.feeling) ?? 0;
    feelingsMap.set(response.feeling, count + 1);
  }
  return feelingsMap;
}

const PrayerFooterMessage = (props: PrayerFooterProps) => {
  
  const {prayer, primaryFeeling, wantFeelings} = props;
  const otherFeelingsMap = getPrayerFeelingMap(prayer);
  const otherFeelings = [...otherFeelingsMap].filter(([feelingId]) => feelingId !== primaryFeeling.id);

  if (!otherFeelings.length) return null;

  return (
    <div className={style['prayer-footer-message']}>
      Also tagged
      {
        otherFeelings.map(([feelingId, count]) => {
          const feeling = wantFeelings.find(f => f.id === feelingId);
          if (feelingId === primaryFeeling.id || !feeling) {
            return null;
          }
          return (
            <div className={style['also-tagged']} key={feelingId}>
              <div 
                className={style['also-tagged-circle']} 
                style={{ background: feeling.color }}
              />
              { feeling.name } ({ count })
            </div>
          )
        })
      }
    </div>
  );
}

interface CheckInPrayersProps {
  prayers: Prayer[];
  wantFeelings: Feeling[];
};

const CheckInPrayers = (props: CheckInPrayersProps) => {

  const prayers = getSuggestedPrayers(props.prayers, props.wantFeelings);

  return (
    <div>
      {
        prayers.length > 0
        ? prayers.map(({ prayers, feeling }) => (
            prayers.map(prayer => {
              const footerMessage = <PrayerFooterMessage
                prayer={prayer}
                wantFeelings={props.wantFeelings}
                primaryFeeling={feeling}
              />
              return <PrayerDisplay
                prayerRef={prayer.ref}
                key={prayer.id}
                message={getPrayerMessage(prayer, feeling)}
                footerMessage={footerMessage}
                color={feeling.color}
              />
            })
          ))
        : <div className={style['no-prayers-found']}>No Prayers Found</div>
      }
    </div>
  )
}

export default CheckInPrayers