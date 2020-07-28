import React from 'react';
import classNames from 'classnames';

import { Feeling } from 'src//types/types';

import style from './feeling-buttons.module.css'

interface FeelingButtonsProps {
  feelings: Feeling[];
  handleFeelingToggle: (feeling: Feeling) => void;
  selectedFeelings: Feeling[];
}

const FeelingButtons = (props: FeelingButtonsProps) => {

  const buttons = props.feelings.map((feeling) => (
    <button
      className={classNames(style.feeling, props.selectedFeelings.includes(feeling) && style['feeling-selected'])}
      key={feeling.id}
      onClick={() =>  props.handleFeelingToggle(feeling)}
    >
      <span className={style.emoji} role="img">{feeling.emoji}</span> {feeling.name}
    </button>
  ))

  return (
    <div className={style['feelings-wrap']}>
      {buttons}
    </div>
  )
}

export default FeelingButtons