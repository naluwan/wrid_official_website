import React from 'react';

type HamburgerProps = {
  openPanel: boolean;
  onSetOpenPanel: (open: boolean) => void;
};

const Hamburger = React.forwardRef<HTMLButtonElement, HamburgerProps>((props, ref) => {
  const { openPanel, onSetOpenPanel } = props;

  return (
    <button
      className='z-20 h-6 w-6 rounded-sm bg-transparent text-black focus:outline-none  dark:text-white'
      ref={ref}
      onClick={() => onSetOpenPanel(!openPanel)}
    >
      {/* <span className='sr-only'>Open main menu</span> */}
      <div className='absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform transition duration-300 ease-in-out group-hover:scale-110'>
        <span
          aria-hidden='true'
          className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
            openPanel ? 'rotate-45' : '-translate-y-1.5'
          }`}
        />
        <span
          aria-hidden='true'
          className={`absolute block  h-0.5 w-5 transform bg-current transition ease-in-out ${
            openPanel && 'opacity-0 duration-500'
          }`}
        />
        <span
          aria-hidden='true'
          className={`absolute block  h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
            openPanel ? '-rotate-45' : 'translate-y-1.5'
          }`}
        />
      </div>
    </button>
  );
});

export default Hamburger;
