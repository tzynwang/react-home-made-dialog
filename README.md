# Introduction

Build a reusable dialog component only with npm package `classnames`.

# Example

```tsx
import React, { memo, useState } from 'react';
import classNames from 'classnames';
import HomeMadeDialog from '@Components/Common/HomeMadeDialog';
import scopedStyle from './index.module.css';

function App(): React.ReactElement {
  /* States */
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  /* Main */
  return (
    <div className={classNames(scopedStyle.main)}>
      <button type="button" onClick={() => setDialogOpen(true)}>
        open dialog
      </button>
      <HomeMadeDialog
        dialogOpen={dialogOpen}
        onDialogClose={() => setDialogOpen(false)}
        classes={{ dialog: 'classNameToOverWriteDialogDefaultStyle' }}
      >
        <div>here is dialog's content</div>
      </HomeMadeDialog>
    </div>
  );
}

export default memo(App);

```

## Props

```ts
/* Any native HTMLDivElement attribute can be passed to HomeMadeDialog */
export interface HomeMadeDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
  /* The dialog's content */

  dialogOpen: boolean;
  /* If true, then the dialog and the backdrop will display on the screen */

  onDialogClose: () => void;
  /* The function to call when dialog is going to be closed */

  disableCloseByBackdropClick?: boolean;
  /* If true, then clicking dialog's backdrop will not close the dialog */

  disableCloseByKeyPress?: boolean;
  /* If true, then pressing the Escape key will not close the dialog */

  overwriteEscapeKey?: string;
  /* Pass key string to this prop to overwrite default Escape key */

  classes?: Partial<HomeMadeDialogClasses>;
  /* Passing css class names to overwrite dialog or backdrop's default style */
}

interface HomeMadeDialogClasses {
  dialog: string;
  backdrop: string;
}
```