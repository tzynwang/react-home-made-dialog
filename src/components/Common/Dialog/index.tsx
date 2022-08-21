import React, { memo } from 'react';
import DialogBase from '@Components/Base/DialogBase';
import scopedStyle from './index.module.css';
import type { DialogProps } from './types';

function Dialog(props: DialogProps): React.ReactElement {
  /* Main */
  return (
    <DialogBase
      {...props}
      classes={{
        dialog: scopedStyle.defaultDialogStyle,
        backdrop: scopedStyle.defaultBackdropStyle,
        dialogUnmountedAnimation: scopedStyle.unmountedAnimation,
        backdropUnmountedAnimation: scopedStyle.unmountedAnimation,
      }}
    >
      {props.children}
    </DialogBase>
  );
}

export default memo(Dialog);
