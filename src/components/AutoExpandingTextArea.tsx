'use client';

import { Button } from '@/components/Button';
import { ReactComponent as ChatIcon } from 'public/icons/chat.svg';
import { TextareaHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';

const IDENTIFIER = 'aetextarea';

interface FormData {
  [IDENTIFIER]: string;
}

interface AutoExpandingTextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'name' | 'id' | 'onSubmit'
  > {
  onSubmit: (data: FormData) => void;
  label: string;
}

export const AutoExpandingTextArea = ({
  label,
  placeholder,
  onSubmit,
  ...props
}: AutoExpandingTextAreaProps) => {
  const { register, handleSubmit, watch } = useForm<FormData>();

  const value = watch(IDENTIFIER);

  return (
    <form
      className="flex w-full flex-1 flex-row content-between items-start gap-8 rounded-xl border-2 border-solid border-cream p-2 text-cream lg:p-3"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <ChatIcon className="ml-2 mt-2 h-10 w-8 lg:mt-4 lg:h-10 lg:w-10" />

      <label htmlFor={IDENTIFIER} className="sr-only">
        {label}
      </label>

      <div
        className="auto-expanding-textarea-parent after:custom-scrollbar flex-1 self-center after:content-[attr(data-replicated-value)]"
        /**
         * @see https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
         */
        data-replicated-value={value}
        data-testid="1"
      >
        <textarea
          {...props}
          {...register(IDENTIFIER)}
          id={IDENTIFIER}
          name={IDENTIFIER}
          className="auto-expanding-textarea custom-scrollbar"
          onKeyDown={(event) => {
            const isHoldingShift = event.shiftKey;
            const isHittingEnter = event.key === 'Enter';
            const hasValue = value && value.trim();

            if (hasValue && isHittingEnter && !isHoldingShift) {
              event.preventDefault();
              return handleSubmit(onSubmit)(event);
            }
          }}
          placeholder={placeholder}
          rows={1}
        />
      </div>

      <Button type="submit">Send</Button>
    </form>
  );
};
