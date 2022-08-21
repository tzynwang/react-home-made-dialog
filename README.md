# Introduction

Build a reusable dialog component with only 1 dependency package `classnames`.

# Example

```tsx
import React, { memo, useState } from 'react';
import cn from 'classnames';
import Dialog from '@Components/Common/Dialog';
import Slider from '@Components/Common/Slider';
import scopedStyle from './index.module.css';

function App(): React.ReactElement {
  /* States */
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [sliderOpen, setSliderOpen] = useState<boolean>(false);

  /* Main */
  return (
    <div className={cn(scopedStyle.main)}>
      <button type="button" onClick={() => setDialogOpen(true)}>
        open dialog
      </button>
      <button type="button" onClick={() => setSliderOpen(true)}>
        open slider
      </button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        classes={{ dialog: scopedStyle.biggerDialog }}
      >
        <div>here is dialog's content</div>
      </Dialog>

      {/* Use as slider, see style settings in src/components/Common/Slider/index.module.css */}
      <Slider open={sliderOpen} onClose={() => setSliderOpen(false)}>
        <div>this is slider's content</div>
      </Slider>
    </div>
  );
}

export default memo(App);

```

## Props

```ts
export interface DialogBaseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /* Any native HTMLDivElement attribute can be passed to DialogBase */
  
  children: JSX.Element;
  /* The dialog's content */

  open: boolean;
  /* If true, then the dialog and the backdrop will display on the screen */

  onClose?: () => void;
  /* The function to call when dialog is going to be closed */

  disableCloseByBackdropClick?: boolean;
  /* If true, then clicking dialog's backdrop will not close the dialog */

  disableCloseByKeyPress?: boolean;
  /* If true, then pressing the Escape key will not close the dialog */

  overwriteEscapeKey?: string;
  /* Pass key string to this prop to overwrite default Escape key */

  classes?: Partial<DialogBaseClasses>;
  /* Passing css class names to overwrite dialog or backdrop's default style */
}

interface DialogBaseClasses {
  dialog: string;
  backdrop: string;

  /* The transition effects to run when dialog is going to unmount */
  dialogUnmountedAnimation: string;
  backdropUnmountedAnimation: string;
}
```