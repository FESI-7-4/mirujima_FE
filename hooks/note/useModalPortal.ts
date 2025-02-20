import React from 'react';

const useModalPortal = () => {
  const [portal, setPortal] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setPortal(document.getElementById('modal-portal'));
  }, []);

  return { portal };
};

export default useModalPortal;
