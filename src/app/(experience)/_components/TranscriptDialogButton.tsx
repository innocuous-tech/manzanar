import { DialogTrigger } from '@/components/Dialog';
import { IconButton } from '@/components/IconButton';
import { ReactComponent as TranscriptIcon } from 'public/icons/transcript.svg';

interface TranscriptDialogButtonProps {}

export const TranscriptDialogButton = (props: TranscriptDialogButtonProps) => {
  return (
    <DialogTrigger asChild>
      <IconButton label="Open Transcript" className="hidden sm:block">
        <TranscriptIcon />
      </IconButton>
    </DialogTrigger>
  );
};
