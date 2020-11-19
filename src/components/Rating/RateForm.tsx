import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Feeling, Template, SourceSheet } from 'src/types/types';
import { getTemplate, getAllFeelings } from 'src/api/firebase';
import { toggleArrayItem } from 'src/utils/array';
import { parseQueryString } from 'src/utils/url';
import { getSourceSheet } from 'src/api/sefaria';

import Loading from '../Loading/Loading';
import PrayerDisplay from '../PrayerDisplay/PrayerDisplay';
import PrayerNavigation from '../PrayerNavigation/PrayerNavigation';
import FeelingButtons from '../FeelingButtons/FeelingButtons';

import RateFormSubmit from './RateFormSubmit';
import RateFormSidebar from './RateFormSidebar';

import style from './rating.module.css'

export interface FormResponses {
  [ref: string]: Feeling[];
}

const RateForm = () => {

  const location = useLocation();
  const { template: templateId, sheet: sheetId } = parseQueryString(location.search);

  const [feelings, setFeelings] = useState<Feeling[]>();

  const [refs, setRefs] = useState<string[]>(); // array of refs
  const [template, setTemplate] = useState<Template>();
  const [sheet, setSheet] = useState<SourceSheet>();
  const [current, setCurrent] = useState(0); // current index
  const [responses, setResponses] = useState<FormResponses>({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    getAllFeelings().then(setFeelings);
  }, [])

  useEffect(() => {
    if (templateId) {
      getTemplate(templateId).then(template => {
        setTemplate(template);
        setRefs(template.refs);
      })
    } else if (sheetId) {
      getSourceSheet(sheetId).then(sheet => {
        setSheet(sheet);
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
    const newSelectedFeelings = toggleArrayItem(selectedFeelings, feeling);
    setResponses({
      ...responses,
      [refs[current]]: newSelectedFeelings
    })
  }

  const showSubmit = finished || current === refs.length;
  const selectedFeelings = getSelectedFeelings();
  const name = template ? template.name : sheet?.title || 'Prayers';

  return (
    <div className={style['rate-form']}>

      {!showSubmit &&
        <RateFormSidebar
          currentIndex={current}
          handleRefClick={setCurrent}
          refs={refs}
          name={name}
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
            handleBack={() => finished ? setFinished(false) : setCurrent(current - 1)}
            enableBack={current > 0}
            enableNext={!finished && current < refs.length}
          />
          {
            !showSubmit && (
              <div
                className={style['finish-button']}
                onClick={() => setFinished(true)}
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