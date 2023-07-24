import React from 'react';
import { omit, pick } from 'lodash';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { Div, Input, InputProps } from 'react-native-magnus';
import { Body, BodyHeavy, BodyMedium, Highlight, Small, SmallHighlight } from '../theme/Typography';

interface FormInputProps extends InputProps {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  defaultValue?: any;
  errorMessage?: string;
  label?: string;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { name, control, defaultValue, errorMessage, label, ...rest } = props;

  const { field } = useController({
    control,
    defaultValue: defaultValue || '',
    name,
  });

  const divMargins = pick(rest, ['m', 'mt', 'mr', 'mb', 'ml']);
  const inputProps = omit(rest, ['m', 'mt', 'mr', 'mb', 'ml']);

  return (
    <Div {...divMargins}>
      {label ? (
        <BodyMedium ml={6} mb={4} fontWeight="600">
          {label}
        </BodyMedium>
      ) : null}
      <Input
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        fontSize={15}
        fontWeight="normal"
        rounded="xl"
        borderColor="dark4"
        minH={45}
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        bg={rest.editable === false ? 'gray300' : 'white'}
        color={rest.editable === false ? 'gray700' : 'text'}
        {...inputProps}
      />
      {errorMessage ? (
        <Small ml={6} mt={1} color="main">
          * {errorMessage}
        </Small>
      ) : null}
    </Div>
  );
};

export default FormInput;
