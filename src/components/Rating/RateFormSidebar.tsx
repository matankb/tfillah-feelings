import React from 'react';
import classNames from 'classnames';

import style from './rating.module.css'

function stripHtml(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent;
}

interface RateFormSidebarProps {
  name: string;
  refs: string[];
  currentIndex: number;
  handleRefClick: (index: number) => void;
};

const RateFormSidebar = (props: RateFormSidebarProps) => {

  const { refs, currentIndex, handleRefClick } = props;

  return (
    <div className={style['rate-form-sidebar']}>
      <div className={style['sidebar-title']}>
        {stripHtml(props.name)}
      </div>
      {
        refs.map((ref, i) => {
          const current = i === currentIndex;
          return (
            <div 
              className={classNames(style['sidebar-item'], current && style['sidebar-item-active'])}
              key={ref}
              onClick={() => handleRefClick(i)}
            >
              {ref.split(', ').slice(-1)}
            </div>
          )
        })
      }
    </div>
  )
}

export default RateFormSidebar