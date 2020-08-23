import React, { useState } from 'react';

import style from './rating.module.css'
import { FormResponses } from './RateForm';
import { getAllPrayers, setPrayer, addPrayer } from 'src/api/firebase';
import { firestore } from 'firebase';

interface RateFormSubmitProps {
  formResponses: FormResponses;
};

async function submitResponses(responses: FormResponses, age: number) {
  const prayers = await getAllPrayers();
  for (const prayerRef in responses) {

    const feelings = responses[prayerRef];
    if (!feelings.length) {
      continue;
    }

    const existingPrayer = prayers.find(prayer => prayer.ref === prayerRef);
    const newResponses = feelings.map(feeling => {
      return {
        age,
        feeling: feeling.id
      }
    })

    if (existingPrayer) {
      setPrayer(existingPrayer.id, {
        ...existingPrayer,
        responses: [
          ...existingPrayer.responses,
          ...newResponses
        ]
      })
    } else {
      addPrayer({
        ref: prayerRef,
        responses: newResponses
      })
    }
  }
}

function getResponseCount(responses: FormResponses) {
  return Object.values(responses).filter(response => response.length).length;
}

const RateFormSubmit = (props: RateFormSubmitProps) => {

  const { formResponses } = props;
  const [age, setAge] = useState<number>();

  const responseCount = getResponseCount(formResponses);

  return (
    <div className={style['form-submit']}>
      <h1>Submit Your Ratings</h1>

      <div className={style['submit-box']}>
        <h4>
          You rated {responseCount} prayer{responseCount !== 1 && 's'}
        </h4>
        <input 
          placeholder="(Optional) Age" 
          type="number" 
          onChange={e => setAge(parseInt(e.target.value))} 
          min={0}
        />
        {/* TODO: handle no age? Or require age? */}
        <button onClick={() => submitResponses(formResponses, age || -1)}>Submit</button>
      </div>

    </div>
  )
}

export default RateFormSubmit