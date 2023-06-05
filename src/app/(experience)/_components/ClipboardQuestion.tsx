import { Checkbox } from '@/components/Checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export interface ClipboardQuestionState {
  N: CheckedState;
  Y: CheckedState;
}

interface ClipboardQuestionProps {
  isInitialDisabled?: boolean;
  label: string;
  setFieldState: (payload: ClipboardQuestionState) => void;
  fieldState: ClipboardQuestionState;
}

export const ClipboardQuestion = ({
  isInitialDisabled = false,
  fieldState,
  setFieldState,
  label,
}: ClipboardQuestionProps) => {
  const [isFieldDisabled, setIsFieldDisabled] =
    useState<boolean>(isInitialDisabled);
  const disableField = () => setIsFieldDisabled(true);

  const isUnanswered = fieldState.N === false && fieldState.Y === false;

  useEffect(() => {
    if (fieldState.N || fieldState.Y) disableField();
  }, [fieldState]);

  return (
    <fieldset
      className={clsx('flex flex-col gap-3', {
        ['group opacity-50 hover:cursor-not-allowed']:
          isInitialDisabled && isUnanswered,
      })}
    >
      <legend>{label}</legend>

      <div className="flex flex-nowrap gap-4">
        <Checkbox
          label="Y"
          className="flex flex-nowrap items-center gap-2 group-hover:cursor-not-allowed"
          isDisabled={isFieldDisabled}
          checkState={fieldState.Y}
          setCheckState={(checkState) => {
            setFieldState({ N: false, Y: checkState });
          }}
        />

        <Checkbox
          label="N"
          className="flex flex-nowrap items-center gap-2 group-hover:cursor-not-allowed"
          isDisabled={isFieldDisabled}
          checkState={fieldState.N}
          setCheckState={(checkState) => {
            setFieldState({ N: checkState, Y: false });
          }}
        />
      </div>
    </fieldset>
  );
};
