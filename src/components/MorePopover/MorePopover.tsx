import React, { useState, ReactNode } from 'react';
import classNames from 'classnames';
import Popover, { ArrowContainer } from 'react-tiny-popover';

import style from './more-popover.module.css'

interface MorePopoverProps {
  content: ReactNode;
};

const MorePopover = (props: MorePopoverProps) => {

  const [open, setOpen] = useState(false);

  const moreIcon = (
    <i
      className={classNames('fa fa-ellipsis-h', style['more-icon'])}
      onClick={() => setOpen(!open)}
    />
  );

  return (
    <Popover
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowColor="#663399"
          arrowSize={10}
          arrowStyle={{}}
        >
          <div className={style['popover']}>
            {props.content}
          </div>
        </ArrowContainer>
      )}
      isOpen={open}
      position='bottom'
      onClickOutside={() => setOpen(false)}
      transitionDuration={0}
      containerClassName={style['popover-container']}
      padding={0}
    >
      {moreIcon}
    </Popover>
  )
}

export default MorePopover