import React, { useState } from 'react';

import { getAllPrayers, setPrayer, addPrayer } from 'src/api/firebase';
import Loading from '../Loading/Loading';

import { FormResponses } from './RateForm';

import style from './rating.module.css'

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

enum SubmitStatus { NotSubmitted, Submitting, Submitted };

const RateFormSubmit = (props: RateFormSubmitProps) => {

  const { formResponses } = props;
  const [age, setAge] = useState<number>();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(SubmitStatus.NotSubmitted);

  const responseCount = getResponseCount(formResponses);

  const handleSubmitClick = async () => {
    setSubmitStatus(SubmitStatus.Submitting);
    await submitResponses(formResponses, age || -1);
    setSubmitStatus(SubmitStatus.Submitted);
  }
  return (
    <div className={style['form-submit']}>
      <h1>Submit Your Ratings</h1>

      <div className={style['submit-box']}>
        {
          submitStatus === SubmitStatus.NotSubmitted &&
          (
            <div>
              <h4>
                You rated {responseCount} prayer{responseCount !== 1 && 's'}
              </h4>
              <input
                placeholder="(Optional) Age"
                type="number"
                onChange={e => setAge(parseInt(e.target.value))}
                min={0}
              />
              <button onClick={handleSubmitClick}>Submit</button>
            </div>
          )
        }

        {
          submitStatus === SubmitStatus.Submitting &&
          (
            <div>
              <Loading />
            </div>
          )
        }

        {
          submitStatus === SubmitStatus.Submitted &&
          (
            <div className={style['submitted']}>
              <i className="fa fa-check" />
              Submitted!
            </div>
          )
        }

      </div>

    </div>
  )
}

export default RateFormSubmit