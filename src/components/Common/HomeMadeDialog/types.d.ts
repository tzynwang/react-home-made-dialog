import React from 'react';

export type DialogGroundProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<
    HomeMadeDialogProps,
    | 'children'
    | 'onDialogClose'
    | 'disableCloseByBackdropClick'
    | 'disableCloseByKeyPress'
    | 'overwriteEscapeKey'
  >;

export interface HomeMadeDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
  dialogOpen: boolean;
  onDialogClose?: () => void;
  disableCloseByBackdropClick?: boolean;
  disableCloseByKeyPress?: boolean;
  overwriteEscapeKey?: string;
  classes?: Partial<HomeMadeDialogClasses>;
}

interface HomeMadeDialogClasses {
  dialog: string;
  backdrop: string;
}
