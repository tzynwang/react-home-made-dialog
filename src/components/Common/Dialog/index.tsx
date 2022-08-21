import React, { memo } from 'react';
import cn from 'classnames';
import DialogBase from '@Components/Base/DialogBase';
import scopedStyle from './index.module.css';
import type { DialogProps } from './types';

function Dialog(props: DialogProps): React.ReactElement {
  /* Main */
  return (
    <DialogBase
      {...props}
      classes={{
        dialog: cn(scopedStyle.defaultDialogStyle, props.classes?.dialog),
        backdrop: cn(scopedStyle.defaultBackdropStyle, props.classes?.backdrop),
        dialogUnmountedAnimation: cn(
          scopedStyle.unmountedAnimation,
          props.classes?.dialogUnmountedAnimation
        ),
        backdropUnmountedAnimation: cn(
          scopedStyle.unmountedAnimation,
          props.classes?.backdropUnmountedAnimation
        ),
      }}
    >
      {props.children}
    </DialogBase>
  );
}

export default memo(Dialog);
