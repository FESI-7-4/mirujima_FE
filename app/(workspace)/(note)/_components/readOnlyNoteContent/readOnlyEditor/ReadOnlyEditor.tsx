'use client';

import React from 'react';

import { BlockNoteView } from '@blocknote/mantine';

import useEditor from '@/hooks/note/useEditor';

interface Props {
  defaultContent: string;
}

export default function ReadOnlyEditor({ defaultContent }: Props) {
  const { editor } = useEditor(defaultContent);

  if (!editor) return null;

  return (
    <>
      <BlockNoteView
        editor={editor}
        editable={false}
        formattingToolbar={false}
        sideMenu={false}
        slashMenu={false}
        data-custom-css
      />
    </>
  );
}
