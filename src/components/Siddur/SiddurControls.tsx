import React from 'react';

import style from './siddur.module.css'
import { Feeling } from 'src/types/types';
import { AgeRange } from './Siddur';

interface SiddurControlsProps {
  feelings: Feeling[];
  selectedFeelings: Feeling[];
  handleFeelingToggle: (feeling: Feeling) => void;

  ageRanges: AgeRange[];
  selectedAgeRanges: AgeRange[];
  handleAgeRangeToggle: (ageRange: AgeRange) => void;
};

const SiddurControls = (props: SiddurControlsProps) => {
  return (
    <div className={style['siddur-controls']}>
      <div className={style['siddur-controls-section']}>
        <h4>Highlight by Feeling</h4>
        {
          props.feelings.map(feeling => (
            <label key={feeling.id}>
              <input
                type="checkbox"
                checked={props.selectedFeelings.includes(feeling)}
                onChange={() => props.handleFeelingToggle(feeling)}
              />
              {feeling.name}
            </label>
          ))
        }
      </div>
      <div className={style['siddur-controls-section']}>
        <h4>Show from Ages</h4>
        {
          props.ageRanges.map((range, i) => {
            return (
              <label key={i}>
                <input
                  type="checkbox"
                  onChange={() => props.handleAgeRangeToggle(range)}
                  checked={props.selectedAgeRanges.includes(range)}
                />
                {
                  range.max < Infinity
                    ? `${range.min} - ${range.max}`
                    : `${range.min}+`
                }
              </label>
            )
          })
        }
      </div>
    </div>
  )
}

export default SiddurControls