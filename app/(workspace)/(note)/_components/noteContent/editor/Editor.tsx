'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './editor.css';

import React from 'react';
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { BlockNoteView } from '@blocknote/mantine';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  blockTypeSelectItems,
  ColorStyleButton,
  FormattingToolbar,
  TextAlignButton
} from '@blocknote/react';
import _ from 'lodash';

import useEditor from '@/hooks/note/useEditor';

import LinkToolbarButton from './linkToolbarButton/LinkToolbarButton';

import type { NoteInputData } from '@/schema/noteSchema';

interface Props {
  defaultContent: string | undefined;
  register: UseFormRegister<NoteInputData>;
  setValue: UseFormSetValue<NoteInputData>;
  handleLinkModal: () => void;
}

export default function Editor({ register, setValue, defaultContent, handleLinkModal }: Props) {
  const { editor } = useEditor(defaultContent);

  if (!editor) return null;

  const onChange = _.debounce(() => {
    const content = JSON.stringify(editor.document);
    setValue('content', content);
  }, 50);

  return (
    <>
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
          <BlockTypeSelect
            key={'blockTypeSelect'}
            items={blockTypeSelectItems(editor.dictionary).map((item) => {
              item.name = customBlockSelectTypeName[item.name];
              return item;
            })}
          />

          <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
          {/* <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} /> */}

          <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
          <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />

          <ColorStyleButton key={'colorStyleButton'} />

          <LinkToolbarButton key={'customButton'} handleLinkModal={handleLinkModal} />
        </FormattingToolbar>
      </BlockNoteView>
    </>
  );
}

const customBlockSelectTypeName: Record<string, string> = {
  Paragraph: '텍스트',
  'Heading 1': '제목1',
  'Heading 2': '제목2',
  'Heading 3': '제목3',
  'Bullet List': '기호',
  'Numbered List': '번호',
  'Check List': '체크'
};
