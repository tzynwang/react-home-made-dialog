import React, { memo, useState } from 'react';
import classNames from 'classnames';
import Dialog from '@Components/Common/Dialog';
import Slider from '@Components/Common/Slider';
import scopedStyle from './index.module.css';

function App(): React.ReactElement {
  /* States */
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [sliderOpen, setSliderOpen] = useState<boolean>(false);

  /* Main */
  return (
    <div className={classNames(scopedStyle.main)}>
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
      <Slider open={sliderOpen} onClose={() => setSliderOpen(false)}>
        <div>this is slider's content</div>
      </Slider>
    </div>
  );
}

export default memo(App);
