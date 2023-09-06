import React from 'react';

type MaxContainerProps = {
  children: React.ReactNode;
};

const MaxContainer: React.FC<MaxContainerProps> = (props) => {
  const { children } = props;
  return <div className='mx-auto my-0 max-w-[1024px] pt-[80px] lg:max-w-[1024px]'>{children}</div>;
};

export default MaxContainer;
