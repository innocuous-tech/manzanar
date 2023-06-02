import { DialogTrigger } from '@/components/Dialog';
import { IconButton } from '@/components/IconButton';
import { ReactComponent as TranscriptIcon } from 'public/icons/transcript.svg';

export const TranscriptDialogButton = () => {
  return (
    <DialogTrigger asChild>
      <IconButton label="Open Transcript" className="hidden sm:block">
        <TranscriptIcon />
      </IconButton>
    </DialogTrigger>
  );
};
