import React, { memo, useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import Portal from '@Components/Common/Portal';
import type { DialogBackdropBaseProps, DialogBaseProps } from './types';

enum KEY {
  ESCAPE = 'Escape',
}

function DialogGroundBase(props: DialogBackdropBaseProps): React.ReactElement {
  /* States */
  const {
    children,
    onClose,
    disableCloseByBackdropClick,
    disableCloseByKeyPress,
    overwriteEscapeKey,
    ...rest
  } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const classNamesFromProps = rest.className;
  delete rest.className;

  /* Functions */
  const closeDialogByClick = (e: MouseEvent): void => {
    if (disableCloseByBackdropClick) return;
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };
  const closeDialogByKeydown = (e: KeyboardEvent): void => {
    if (disableCloseByKeyPress) return;
    if (e.key === overwriteEscapeKey && onClose) {
      onClose();
    }
  };

  /* Hooks */
  useEffect(() => {
    const backdrop = ref.current;
    document.addEventListener('keydown', closeDialogByKeydown);
    backdrop?.addEventListener('click', closeDialogByClick);
    return () => {
      document.removeEventListener('keydown', closeDialogByKeydown);
      backdrop?.removeEventListener('click', closeDialogByClick);
    };
  }, []);

  /* Main */
  return (
    <div className={cn(classNamesFromProps)} ref={ref} {...rest}>
      {children}
    </div>
  );
}

function DialogBase(props: DialogBaseProps): React.ReactElement {
  /* States */
  const {
    open,
    children,
    disableCloseByBackdropClick = false,
    disableCloseByKeyPress = false,
    overwriteEscapeKey = KEY.ESCAPE,
    classes = { dialog: '', backdrop: '' },
    onClose,
    ...rest
  } = props;
  const [mounted, setMounted] = useState<boolean>(false);
  const stylesFromProps = rest.style;
  const classNamesFromProps = rest.className;
  const roleFromProps = rest.role;
  delete rest.style;
  delete rest.className;
  delete rest.role;

  /* Functions */
  const unmountDialog = (): void => {
    setMounted(false);
  };

  /* Hooks */
  useEffect(() => {
    document.addEventListener('transitionend', unmountDialog);
    return () => {
      document.removeEventListener('transitionend', unmountDialog);
    };
  }, []);
  useEffect(() => {
    if (open) {
      setMounted(true);
    }
  }, [open]);

  /* Main */
  return mounted ? (
    <Portal>
      <DialogGroundBase
        onClose={onClose}
        className={cn(
          classes.backdrop,
          !open && classes.backdropUnmountedAnimation
        )}
        disableCloseByBackdropClick={disableCloseByBackdropClick}
        disableCloseByKeyPress={disableCloseByKeyPress}
        overwriteEscapeKey={overwriteEscapeKey}
        role="presentation"
      >
        <div
          className={cn(
            classes.dialog,
            classNamesFromProps,
            !open && classes.dialogUnmountedAnimation
          )}
          style={{ ...stylesFromProps }}
          role={roleFromProps || 'dialog'}
          {...rest}
        >
          {children}
        </div>
      </DialogGroundBase>
    </Portal>
  ) : (
    <React.Fragment />
  );
}

export default memo(DialogBase);
