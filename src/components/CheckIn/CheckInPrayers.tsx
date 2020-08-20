import React from 'react';
import { Feeling, Prayer } from 'src/types/types';
import PrayerDisplay from '../PrayerDisplay/PrayerDisplay';

import style from './check-in.module.css';
import getSuggestedPrayers from './prayer-suggest';
import CheckInPrayerFooter from './CheckInPrayerFooter';

// Get message, e.g. "x people said this was <feeling>"
function getPrayerMessage(prayer: Prayer, feeling: Feeling) {
  const matches = prayer.responses.filter(response => response.feeling === feeling.id).length
  return `${matches} ${matches > 1 ? 'people' : 'person'} said this was ${feeling.name.toLowerCase()}`;
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
              const footerMessage = <CheckInPrayerFooter
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