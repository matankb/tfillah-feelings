import React, { useState, useEffect } from 'react';

import { Feeling, Prayer } from 'src/types/types';
import { getAllPrayers, getAllFeelings } from 'src/api/firebase';

import Loading from '../Loading/Loading';
import PrayerDisplay from '../PrayerDisplay/PrayerDisplay';

import style from './siddur.module.css'
import SiddurControls from './SiddurControls';
import { toggleArrayItem } from 'src/utils/array';

// returns true if age is in at least one age range
function isInAgeRanges(age: number, ageRanges: AgeRange[]) {
  return ageRanges.find(range => age >= range.min && age <= range.max);
}

// Get may of feeling ID to amount of responses
function getPrayerFeelingMap(prayer: Prayer, selectedAgeRanges: AgeRange[]) { // TODO: remove this second arg?
  const feelingsMap = new Map<string, number>(); // map of feeling ID to amount of responses
  for (const response of prayer.responses) {
    if (isInAgeRanges(response.age, selectedAgeRanges)) {
      const count = feelingsMap.get(response.feeling) ?? 0;
      feelingsMap.set(response.feeling, count + 1);
    }
  }
  return feelingsMap;
}

// Message format: Happy (3), Sad (2), etc.
// TODO: limit to certain number
function getPrayerMessage(prayer: Prayer, feelings: Feeling[], selectedAgeRanges: AgeRange[]) {
  const feelingsMap = getPrayerFeelingMap(prayer, selectedAgeRanges);
  const message = [...feelingsMap]
    .map(([feelingId, count]) => {
      const feeling = feelings.find(f => f.id === feelingId);
      return `${feeling?.name} (${count})`;
    })
    .join(', ');
  return message;
}

function getPrayerColor(prayer: Prayer, selectedFeelings: Feeling[], selectedAgeRanges: AgeRange[]) {
  const DEFAULT_COLOR = 'gray';

  if (!selectedFeelings) {
    return DEFAULT_COLOR;
  }

  const feelingsMap = getPrayerFeelingMap(prayer, selectedAgeRanges);
  const rankedFeelingIds = [...feelingsMap]
    .sort(([, aCount], [, bCount]) => bCount - aCount)
    .map(([feelingId]) => feelingId);

  const topSelectedFeelingId = rankedFeelingIds.find(id => selectedFeelings.find(feeling => feeling.id === id));
  const topSelectedFeeling = selectedFeelings.find(feeling => feeling.id === topSelectedFeelingId);
  return topSelectedFeeling?.color || DEFAULT_COLOR;
}

export interface AgeRange {
  min: number;
  max: number;
}

function createAgeRange(min: number, max: number) {
  return { min, max };
}

const ageRanges = [
  createAgeRange(13, 20),
  createAgeRange(21, 30),
  createAgeRange(31, 40),
  createAgeRange(41, 50),
  createAgeRange(51, 60),
  createAgeRange(61, 70),
  createAgeRange(71, 80),
  createAgeRange(81, 90),
  createAgeRange(91, Infinity),
]

const Siddur = () => {

  const [feelings, setFeelings] = useState<Feeling[]>();
  const [prayers, setPrayers] = useState<Prayer[]>();

  const [selectedFeelings, setSelectedFeelings] = useState<Feeling[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<AgeRange[]>(ageRanges);

  useEffect(() => {
    getAllPrayers().then(setPrayers);
    getAllFeelings().then(setFeelings);
  }, []);

  const handleFeelingToggle = (feeling: Feeling) => {
    const newFeelings = toggleArrayItem(selectedFeelings, feeling);
    setSelectedFeelings(newFeelings);
  }

  const handleAgeRangeToggle = (ageRange: AgeRange) => {
    const newAgeRanges = toggleArrayItem(selectedAgeRanges, ageRange);
    setSelectedAgeRanges(newAgeRanges);
  }

  if (!prayers || !feelings) {
    return <Loading />
  }

  return (
    <div className={style['siddur-wrap']}>
      <h1>Browse the Siddur</h1>
      <main>
        <SiddurControls
          feelings={feelings}
          selectedFeelings={selectedFeelings}
          handleFeelingToggle={handleFeelingToggle}
          ageRanges={ageRanges}
          selectedAgeRanges={selectedAgeRanges}
          handleAgeRangeToggle={handleAgeRangeToggle}
        />
        <div>
          {
            prayers.map(prayer => {
              const message = getPrayerMessage(prayer, feelings, selectedAgeRanges);
              const color = getPrayerColor(prayer, selectedFeelings, selectedAgeRanges);
              return <PrayerDisplay
                prayerRef={prayer.ref}
                key={prayer.id}
                message={message}
                color={color}
              />
            })
          }
        </div>
      </main>
    </div>
  )

}

export default Siddur;