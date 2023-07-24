import React, { memo } from 'react';
import { Div, DivProps } from 'react-native-magnus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReactNativeModal, { ModalProps as RNModalProps } from 'react-native-modal';

export type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  modalProps?: RNModalProps;
  backdropDismissable?: boolean;
} & DivProps;

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  modalProps,
  backdropDismissable,
  ...containerProps
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ReactNativeModal
      avoidKeyboard
      backdropTransitionOutTiming={0}
      isVisible={isVisible}
      onBackdropPress={backdropDismissable ? onClose : undefined}
      onDismiss={onClose}
      {...modalProps}
      style={[{ margin: 0, justifyContent: 'flex-end', paddingTop: insets.top }, modalProps?.style]}
    >
      <Div bg="light1" pt={34} {...containerProps}>
        {children}
      </Div>
    </ReactNativeModal>
  );
};

export default memo(Modal);
