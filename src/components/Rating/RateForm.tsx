import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import style from './rating.module.css'
import { getTemplate, getAllFeelings } from 'src/api/firebase';
import Loading from '../Loading/Loading';
import PrayerDisplay from '../PrayerDisplay/PrayerDisplay';
import PrayerNavigation from '../PrayerNavigation/PrayerNavigation';
import FeelingButtons from '../FeelingButtons/FeelingButtons';
import { Feeling } from 'src/types/types';
import { getSourceSheet } from 'src/api/sefaria';
import { parseQueryString } from 'src/utils/url';
import RateFormSubmit from './RateFormSubmit';
import RateFormSidebar from './RateFormSidebar';

export interface FormResponses {
  [ref: string]: Feeling[];
}

const RateForm = () => {

  const location = useLocation();
  const { template: templateId, sheet: sheetId } = parseQueryString(location.search);

  const [feelings, setFeelings] = useState<Feeling[]>();

  const [refs, setRefs] = useState<string[]>(); // array of refs
  const [current, setCurrent] = useState(0); // current index
  const [responses, setResponses] = useState<FormResponses>({});

  useEffect(() => {
    getAllFeelings().then(setFeelings);
  }, [])

  useEffect(() => {
    if (templateId) {
      getTemplate(templateId).then(template => {
        setRefs(template.refs);
      })
    } else if (sheetId) {
      getSourceSheet(sheetId).then(sheet => {
        setRefs(sheet.includedRefs);
      })
    }
  }, [templateId, sheetId]);

  if (!refs || !feelings) {
    return <Loading />
  }

  const getSelectedFeelings = () => {
    const currentRef = refs[current];
    return responses[currentRef] || [];
  }

  const handleFeelingToggle = (feeling: Feeling) => {
    const selectedFeelings = getSelectedFeelings();
    const newSelectedFeelings = [...selectedFeelings];
    if (selectedFeelings.includes(feeling)) {
      newSelectedFeelings.splice(newSelectedFeelings.indexOf(feeling), 1);
    } else {
      newSelectedFeelings.push(feeling);
    }
    setResponses({
      ...responses,
      [refs[current]]: newSelectedFeelings
    })
  }

  const showSubmit = current === refs.length;
  const selectedFeelings = getSelectedFeelings();

  return (
    <div className={style['rate-form']}>

      {!showSubmit &&
        <RateFormSidebar
          currentIndex={current}
          handleRefClick={setCurrent}
          refs={refs}
        />
      }

      <div className={style['rate-form-main']}>
        {
          !showSubmit ?
            <div>
              <PrayerDisplay
                prayerRef={refs[current]}
                color="gray"
              />
              <FeelingButtons
                feelings={feelings}
                selectedFeelings={selectedFeelings}
                handleFeelingToggle={handleFeelingToggle}
              />
            </div>
            : <RateFormSubmit formResponses={responses} />
        }

        <div className={style['rate-form-controls']}>
          <PrayerNavigation
            handleNext={() => setCurrent(current + 1)}
            handleBack={() => setCurrent(current - 1)}
            enableBack={current > 0}
            enableNext={current < refs.length}
          />
          {
            !showSubmit && (
              <div
                className={style['finish-button']}
                onClick={() => setCurrent(refs.length)}
              >
                Finish
              </div>
            )
          }
        </div>

      </div>
    </div>
  )

}

export default RateForm