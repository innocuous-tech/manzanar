import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ReactComponent as Checkmark } from 'public/images/handwritten_checkmark.svg';
import { ReactComponent as Scribble } from 'public/images/scribble.svg';

interface CheckboxProps {
  className?: string;
  isDisabled?: boolean;
  label: string;
  checkState: CheckedState;
  setCheckState: (checkState: CheckedState) => void;
}

export const Checkbox = ({
  className,
  isDisabled,
  label,
  checkState,
  setCheckState,
}: CheckboxProps) => {
  const isChecked = checkState === true;
  const isIndeterminate = checkState === 'indeterminate';

  return (
    <label className={className}>
      {label}

      <RadixCheckbox.Root
        className="inline-block h-7 w-7 rounded-sm border-[1px] border-solid border-black bg-[transparent] disabled:hover:cursor-not-allowed"
        checked={checkState}
        onCheckedChange={setCheckState}
        disabled={isDisabled}
      >
        <RadixCheckbox.Indicator className="disabled:hover:cursor-not-allowed [&>*]:scale-[1.3]">
          {isChecked && <Checkmark className="origin-bottom-left" />}
          {isIndeterminate && <Scribble />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    </label>
  );
};
