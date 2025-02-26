import React from 'react';
import toast from 'react-hot-toast';

import { URL_REGEX } from '@/constant/regex';
import { useEmbedStore, useModalStore } from '@/provider/store-provider';

const useNoteLink = (initLink: string | undefined) => {
  const [linkUrl, setLinkUrl] = React.useState(initLink);
  const linkInputRef = React.useRef<HTMLInputElement>(null);

  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);
  const setEmbedUrl = useEmbedStore((state) => state.setEmbedUrl);

  const handleLinkSubmit = () => {
    if (!linkInputRef.current) return;

    const linkUrl = linkInputRef.current.value.trim();
    if (linkUrl === '') {
      setLinkUrl('');
      setNoteLinkModalOpen(false);
      return;
    }

    const isWrongURL = URL_REGEX.test(linkUrl) === false;
    if (isWrongURL) {
      toast.error('유효하지 않은 링크입니다', { duration: 1500 });
      return;
    }

    setEmbedUrl(decodeURI(linkUrl));
    setLinkUrl(decodeURI(linkUrl));
    setNoteLinkModalOpen(false);
  };

  const handleLinkModal = () => {
    setNoteLinkModalOpen(true, {
      defaultValue: linkUrl,
      onSubmit: handleLinkSubmit,
      linkInputRef: linkInputRef
    });
  };

  const handleDeleteLink = () => {
    setLinkUrl('');
  };

  return { linkUrl, linkInputRef, handleLinkSubmit, handleLinkModal, handleDeleteLink };
};

export default useNoteLink;
