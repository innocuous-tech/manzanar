import { PropsWithChildren } from 'react';

export const TopPanel = ({ children }: PropsWithChildren) => (
  <aside className="top-panel">
    <div className="custom-scrollbar h-full overflow-y-auto pr-3 lg:pr-6">
      {children}
    </div>
  </aside>
);
