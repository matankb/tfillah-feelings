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
          props.feelings.map(feeling => {
            const selected = props.selectedFeelings.includes(feeling);
            return (
              <label key={feeling.id}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => props.handleFeelingToggle(feeling)}
                />
                {feeling.name}
                <div style={{ width: 10, height: 10, background: selected ? feeling.color : '', borderRadius: '50%', display:  'inline-block', marginLeft: 5 }} />
              </label>
            )
          })
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