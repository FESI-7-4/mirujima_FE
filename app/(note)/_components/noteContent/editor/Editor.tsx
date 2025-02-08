'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './editor.css';

import type { PropsWithChildren } from 'react';
import React from 'react';
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { locales } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  FormattingToolbar,
  TextAlignButton,
  useCreateBlockNote
} from '@blocknote/react';
import _ from 'lodash';

import { useNoteModalStore } from '@/provider/store-provider';

import LinkToolbarButton from './linkToolbarButton/LinkToolbarButton';
import UploadLinkModal from '../../modals/uploadLinkModal/UploadLinkModal';

import type { NoteInputData } from '@/schema/noteSchema';

interface Props {
  register: UseFormRegister<NoteInputData>;
  setValue: UseFormSetValue<NoteInputData>;
}

export default function Editor({ register, setValue, children }: PropsWithChildren<Props>) {
  const isOpen = useNoteModalStore(({ state }) => state);
  const { setModalOpen } = useNoteModalStore(({ actions }) => actions);

  const locale = locales['ko'];
  const editor = useCreateBlockNote({
    ...locale,
    placeholders: {
      ...locale.placeholders,
      default: '이 곳을 클릭해 노트 작성을 시작해주세요'
    }
  });

  const onChange = _.debounce(() => {
    const content = JSON.stringify(editor.document);
    setValue('content', content);
  }, 50);

  const onClickLinkButton = () => {
    setModalOpen();
  };

  return (
    <>
      {children}
      <input type="text" className="hidden" {...register('content')} />
      <BlockNoteView
        editor={editor}
        formattingToolbar={false}
        sideMenu={false}
        slashMenu={false}
        onChange={onChange}
        data-custom-css
      >
        <FormattingToolbar>
          <div className="hidden sm:block"></div>
          <BlockTypeSelect key={'blockTypeSelect'} />

          <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
          {/* <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} /> */}

          <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
          <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />

          <ColorStyleButton key={'colorStyleButton'} />

          <LinkToolbarButton key={'customLinkButton'} onClick={onClickLinkButton} />
        </FormattingToolbar>
      </BlockNoteView>

      {isOpen && <UploadLinkModal />}
    </>
  );
}
