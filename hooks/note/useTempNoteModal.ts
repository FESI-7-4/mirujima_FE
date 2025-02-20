import React from 'react';

const useTempNoteModal = () => {
  const [isConfirmTempModalOpen, setIsConfirmTempModalOpen] = React.useState(false);

  const handleConfirmModal = (status: boolean) => {
    setIsConfirmTempModalOpen(status);
  };

  return { isConfirmTempModalOpen, handleConfirmModal };
};

export default useTempNoteModal;
