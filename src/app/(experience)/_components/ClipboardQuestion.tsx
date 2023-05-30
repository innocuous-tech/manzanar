import { Checkbox } from '@/components/Checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useEffect, useState } from 'react';

export type ClipboardQuestionState = { N: CheckedState; Y: CheckedState };

interface ClipboardQuestionProps {
  label: string;
  setFieldState: (payload: ClipboardQuestionState) => void;
  fieldState: ClipboardQuestionState;
}

export const ClipboardQuestion = ({
  fieldState,
  setFieldState,
  label,
}: ClipboardQuestionProps) => {
  const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(false);
  const disableField = () => setIsFieldDisabled(true);

  useEffect(() => {
    if (fieldState.N || fieldState.Y) disableField();
  }, [fieldState]);

  return (
    <fieldset className="flex flex-col gap-3">
      <legend>{label}</legend>

      <div className="flex flex-nowrap gap-4">
        <Checkbox
          label="Y"
          className="flex flex-nowrap items-center gap-2"
          isDisabled={isFieldDisabled}
          checkState={fieldState.Y}
          setCheckState={(checkState) =>
            setFieldState({ N: false, Y: checkState })
          }
        />

        <Checkbox
          label="N"
          className="flex flex-nowrap items-center gap-2"
          isDisabled={isFieldDisabled}
          checkState={fieldState.N}
          setCheckState={(checkState) =>
            setFieldState({ N: checkState, Y: false })
          }
        />
      </div>
    </fieldset>
  );
};
