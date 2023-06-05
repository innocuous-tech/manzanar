import { cms } from '@/cms';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';

interface ProcessIchiroButtonProps {
  onClick: () => void;
}

export const ProcessIchiroButton = ({ onClick }: ProcessIchiroButtonProps) => {
  return (
    <Tooltip content={cms.processIchiro}>
      <Button onClick={onClick}>{cms.processIchiroButton}</Button>
    </Tooltip>
  );
};
