import React from 'react';
import { Feeling, Prayer } from 'src/types/types';
import PrayerDisplay from '../PrayerDisplay/PrayerDisplay';

import style from './check-in.module.css';

function getSuggestedPrayers(prayers: Prayer[], wantFeelings: Feeling[]) {

  if (!prayers) {
    return [];
  }

  const PRAYER_PER_FEELING = 3;

  const suggestedPrayers = wantFeelings.map(feeling => {
    const feelingSuggestedPrayers = prayers
      .map(prayer => {
        // SUGGESTION ALGORITHM - TODO: make better
        const { responses } = prayer;
        const matches = responses.filter(response => response.feeling === feeling.id);
        // const score = matches.length / responses.length;
        const score = matches.length;
        return { prayer, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => a.score - b.score)
      .slice(0, PRAYER_PER_FEELING)
      .map(({ prayer }) => prayer);
    return {
      prayers: feelingSuggestedPrayers,
      feeling,
    }
  });

  return suggestedPrayers;
}

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