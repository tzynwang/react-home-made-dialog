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
      >
        <div>here is dialog's content</div>
      </HomeMadeDialog>
    </div>
  );
}

export default memo(App);
