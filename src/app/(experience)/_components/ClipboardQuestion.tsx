import { Checkbox } from '@/components/Checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useEffect, useState } from 'react';

interface ClipboardQuestionProps {
  label: string;
  isWrongAnswerScribbled: boolean;
}

export const ClipboardQuestion = ({
  label,
  isWrongAnswerScribbled,
}: ClipboardQuestionProps) => {
  const [checkState, setCheckState] = useState<{
    N: CheckedState;
    Y: CheckedState;
  }>({ N: false, Y: false });

  useEffect(() => {
    if (isWrongAnswerScribbled) setCheckState({ N: true, Y: 'indeterminate' });
  }, [isWrongAnswerScribbled]);

  return (
    <fieldset className="flex flex-col gap-3">
      <legend>{label}</legend>

      <div className="flex flex-nowrap gap-4">
        <Checkbox
          label="Y"
          className="flex flex-nowrap items-center gap-2"
          isDisabled={isWrongAnswerScribbled}
          checkState={checkState.Y}
          setCheckState={(checkState) =>
            setCheckState((prev) => ({ ...prev, Y: checkState }))
          }
        />
        <Checkbox
          label="N"
          className="flex flex-nowrap items-center gap-2"
          isDisabled={isWrongAnswerScribbled}
          checkState={checkState.N}
          setCheckState={(checkState) =>
            setCheckState((prev) => ({ ...prev, N: checkState }))
          }
        />
      </div>
    </fieldset>
  );
};
