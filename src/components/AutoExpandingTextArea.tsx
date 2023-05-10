'use client';

import { Button } from '@/components/Button';
import { ReactComponent as ChatIcon } from 'public/icons/chat.svg';
import { TextareaHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';

const IDENTIFIER = 'aetextarea';

interface AutoExpandingTextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'name' | 'id' | 'onSubmit'
  > {
  // onSubmit: (data: FormData) => void;
  label: string;
}

type FormData = {
  [IDENTIFIER]: string;
};

export const AutoExpandingTextArea = ({
  label,
  placeholder,
  ...props
}: AutoExpandingTextAreaProps) => {
  const { register, handleSubmit, watch } = useForm<FormData>();

  /**
   * TODO: Require `action` prop and use Server Actions
   * @see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
   */
  const onSubmit = ({ aetextarea }: FormData) => window.alert(aetextarea);

  const value = watch(IDENTIFIER);

  return (
    <form
      className={`flex w-full flex-1 flex-row content-between items-start gap-8 rounded-xl border-2 border-solid border-cream p-6 text-cream`}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <ChatIcon width="40" height="40" className="mt-4" />

      <label htmlFor={IDENTIFIER} className="sr-only">
        {label}
      </label>

      <div
        className="auto-expanding-textarea-parent after:custom-scrollbar mt-2 flex-1 after:content-[attr(data-replicated-value)]"
        /**
         * @see https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
         */
        data-replicated-value={value}
        data-testid="1"
      >
        <textarea
          {...register(IDENTIFIER)}
          className="auto-expanding-textarea custom-scrollbar"
          onKeyDown={(event) => {
            const isHoldingShift = event.shiftKey === true;
            const isHittingEnter = event.key === 'Enter';

            if (isHittingEnter) {
              if (!isHoldingShift) {
                event.preventDefault();
              } else {
                if (value) handleSubmit(onSubmit);
              }
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
