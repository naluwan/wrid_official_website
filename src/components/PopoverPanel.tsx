import React from 'react';

type PopoverPanelProps = {
  children: React.ReactNode;
  openPanel: boolean;
};

const PopoverPanel = React.forwardRef<HTMLDivElement, PopoverPanelProps>((props, ref) => {
  const { children, openPanel } = props;

  return (
    <div
      className={`popover-panel duration-5000 transition ease-in-out ${
        openPanel ? 'block' : 'hidden'
      }`}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default PopoverPanel;
