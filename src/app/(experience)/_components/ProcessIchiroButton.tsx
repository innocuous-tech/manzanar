import { cms } from '@/cms';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';

interface ProcessIchiroButtonProps {
  onClick: () => void;
}

export const ProcessIchiroButton = ({ onClick }: ProcessIchiroButtonProps) => {
  return (
    <Tooltip content={cms.process_ichiro}>
      <Button onClick={onClick}>{cms.process_ichiro_button}</Button>
    </Tooltip>
  );
};
