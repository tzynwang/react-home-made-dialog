import React from 'react';

export interface DialogBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
  open: boolean;
  onClose?: () => void;
  disableCloseByBackdropClick?: boolean;
  disableCloseByKeyPress?: boolean;
  overwriteEscapeKey?: string;
  classes?: Partial<HomeMadeDialogClasses>;
}

interface HomeMadeDialogClasses {
  dialog: string;
  backdrop: string;
  dialogUnmountedAnimation: string;
  backdropUnmountedAnimation: string;
}

export type DialogBackdropBaseProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<
    DialogBaseProps,
    | 'children'
    | 'onClose'
    | 'disableCloseByBackdropClick'
    | 'disableCloseByKeyPress'
    | 'overwriteEscapeKey'
  >;
