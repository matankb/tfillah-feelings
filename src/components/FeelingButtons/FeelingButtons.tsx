import React from 'react';
import classNames from 'classnames';

import style from './feeling-buttons.module.css'
import { Feeling } from '../../types/types';

// const feelings: Feeling[] = [
//   { id: '0', name: 'Happy', emoji: '😀' },
//   { id: '1', name: 'Sad', emoji: '🙁' },
//   { id: '3', name: 'Wow', emoji: '🤩' },
//   { id: '4', name: 'Grateful', emoji: '🙏' },
//   { id: '5', name: 'Thoughtful', emoji: '🤔' }
// ]

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