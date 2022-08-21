import React, { memo, useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import Portal from '@Components/Common/Portal';
import scopedStyle from './index.module.css';
import type { DialogGroundProps, HomeMadeDialogProps } from './types';

enum KEY {
  ESCAPE = 'Escape',
}

function SliderGround(props: DialogGroundProps): React.ReactElement {
  /* States */
  const {
    children,
    onDialogClose,
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
    if (e.target === e.currentTarget && onDialogClose) {
      onDialogClose();
    }
  };
  const closeDialogByKeydown = (e: KeyboardEvent): void => {
    if (disableCloseByKeyPress) return;
    if (e.key === overwriteEscapeKey && onDialogClose) {
      onDialogClose();
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
    <div
      className={cn(scopedStyle.defaultBackdropStyle, classNamesFromProps)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
}

function Slider(props: HomeMadeDialogProps): React.ReactElement {
  /* States */
  const {
    dialogOpen,
    children,
    disableCloseByBackdropClick = false,
    disableCloseByKeyPress = false,
    overwriteEscapeKey = KEY.ESCAPE,
    classes = { dialog: '', backdrop: '' },
    onDialogClose,
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
    if (dialogOpen) {
      setMounted(true);
    }
  }, [dialogOpen]);

  /* Main */
  return mounted ? (
    <Portal>
      <SliderGround
        onDialogClose={onDialogClose}
        className={cn(
          classes.backdrop,
          !dialogOpen && scopedStyle.backdropUnmountedAnimation
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
            scopedStyle.defaultSliderStyle,
            !dialogOpen && scopedStyle.sliderUnmountedAnimation
          )}
          style={{ ...stylesFromProps }}
          role={roleFromProps || 'dialog'}
          {...rest}
        >
          {children}
        </div>
      </SliderGround>
    </Portal>
  ) : (
    <React.Fragment />
  );
}

export default memo(Slider);
