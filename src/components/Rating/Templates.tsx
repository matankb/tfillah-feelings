import React, { useState } from 'react';

import style from './rating.module.css'
import { Template } from 'src/types/types';
import { Link } from 'react-router-dom';
import SectionButton from '../SectionButton/SectionButton';

interface TemplatesProps {
  templates: Template[];
};

const recommendedTemplateId = '1Wv77LlYlJbvYnlcdcHi';

const Templates = (props: TemplatesProps) => {

  const [showMore, setShowMore] = useState(false);

  const visibleTemplates = props.templates.filter(template => template.id !== recommendedTemplateId);

  return (
    <div className={style['templates']}>
      <div className={style['templates-list']}>
        <Link
          to={`/rate/form?template=${recommendedTemplateId}`}
          className={style['template']}
          key={recommendedTemplateId}
        >
          <i className="fa fa-star" />
          Core Prayers
          <div className={style['template-recommended-explanation']}>
            Don't know where to start? Click here.
          </div>
        </Link>
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