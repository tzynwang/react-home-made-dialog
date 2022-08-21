import React, { memo } from 'react';
import cn from 'classnames';
import DialogBase from '@Components/Base/DialogBase';
import scopedStyle from './index.module.css';
import type { SliderProps } from './types';

function Slider(props: SliderProps): React.ReactElement {
  /* Main */
  return (
    <DialogBase
      {...props}
      classes={{
        dialog: cn(scopedStyle.defaultSliderStyle, props.classes?.dialog),
        backdrop: cn(scopedStyle.defaultBackdropStyle, props.classes?.backdrop),
        dialogUnmountedAnimation: cn(
          scopedStyle.sliderUnmountedAnimation,
          props.classes?.dialogUnmountedAnimation
        ),
        backdropUnmountedAnimation: cn(
          scopedStyle.backdropUnmountedAnimation,
          props.classes?.backdropUnmountedAnimation
        ),
      }}
    >
      {props.children}
    </DialogBase>
  );
}

export default memo(Slider);
