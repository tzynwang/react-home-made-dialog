import React, { memo } from 'react';
import DialogBase from '@Components/Base/DialogBase';
import scopedStyle from './index.module.css';
import type { SliderProps } from './types';

function Slider(props: SliderProps): React.ReactElement {
  /* Main */
  return (
    <DialogBase
      {...props}
      classes={{
        dialog: scopedStyle.defaultSliderStyle,
        backdrop: scopedStyle.defaultBackdropStyle,
        dialogUnmountedAnimation: scopedStyle.sliderUnmountedAnimation,
        backdropUnmountedAnimation: scopedStyle.backdropUnmountedAnimation,
      }}
    >
      {props.children}
    </DialogBase>
  );
}

export default memo(Slider);
