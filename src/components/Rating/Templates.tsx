import React, { useState } from 'react';

import style from './rating.module.css'
import { Template } from 'src/types/types';
import { Link } from 'react-router-dom';
import SectionButton from '../SectionButton/SectionButton';

interface TemplatesProps {
  templates: Template[];
};

const primaryTemplates = {
  shacharit: 'SMCSrvsJ6EbTyP5kF0Bu',
  recommended: '1Wv77LlYlJbvYnlcdcHi',
}

function filterPrimaryTemplates(allTemplates: Template[]) {
  return allTemplates.filter(template => {
    return !Object.values(primaryTemplates).includes(template.id)
  });
}

const Templates = (props: TemplatesProps) => {

  const [showMore, setShowMore] = useState(false);

  const visibleTemplates = showMore ?
    filterPrimaryTemplates(props.templates) :
    filterPrimaryTemplates(props.templates).slice(0, 2);

  return (
    <div className={style['templates']}>
      <div className={style['templates-primary']}>
        <SectionButton icon="fa fa-sun" color="#f57e42" linkTo={`/rate/form?template=${primaryTemplates.shacharit}`} name="Shacharit" />
        <SectionButton icon="fa fa-star" color="#FFDF00	" linkTo={`/rate/form?template=${primaryTemplates.recommended}`} name="Recommended" />
      </div>
      <div className={style['templates-list']}>
        {
          visibleTemplates.map(template => (
            <Link
              to={`/rate/form?template=${template.id}`}
              className={style['template']}
              key={template.id}
            >
              <i className="fa fa-book-open" />
              {template.name}
            </Link>
          ))
        }
        <button
          className={style['template-list-show-more']}
          onClick={() => setShowMore(!showMore)}
        >
          See {showMore ? 'Less' : 'More'}
        </button>
      </div>
    </div>
  )
}

export default Templates