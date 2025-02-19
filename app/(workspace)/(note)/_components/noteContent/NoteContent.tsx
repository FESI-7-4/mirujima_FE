'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';

import { createNote, updateNote } from '@/apis/clientActions/note';
import { URL_REGEX } from '@/constant/regex';
import { useModalStore } from '@/provider/store-provider';
import { noteSchema } from '@/schema/noteSchema';

import ButtonArea from './buttonArea/ButtonArea';
import ContentInfo from './contentInfo/ContentInfo';
import { Editor } from './editor/DynamicEditor';
import GoalAndTodoInfo from './goalAndTodoInfo/GoalAndTodoInfo';
import LinkArea from './linkArea/LinkArea';
import TitleInput from './titleInput/TitleInput';
import UploadLinkModal from '../modals/uploadLinkModal/UploadLinkModal';

import type { NoteInputData } from '@/schema/noteSchema';
import type { CreateNoteType, NoteType, UpdateNoteType } from '@/types/note.type';
import type { TodoType } from '@/types/todo.type';

interface Props {
  todo: TodoType;
  note: NoteType | null;
}

export default function NoteContent({ todo, note }: Props) {
  const [isEdit] = React.useState(!!note);
  const [linkUrl, setLinkUrl] = React.useState(note?.linkUrl);
  const linkInputRef = React.useRef<HTMLInputElement>(null);

  const isLinkModalOpen = useModalStore((store) => store.isNoteLinkModalOpen);
  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { isValid }
  } = useForm<NoteInputData>({
    resolver: zodResolver(noteSchema),
    mode: 'onChange',
    defaultValues: {
      title: note?.title,
      content: note?.content
    }
  });

  const onSubmit: SubmitHandler<NoteInputData> = async (data) => {
    const { title, content } = data;

    try {
      if (isEdit && note) {
        const newNote: UpdateNoteType = {
          title,
          content,
          linkUrl: linkUrl || ''
        };
        const res = await updateNote(note.id, newNote);
        toast.success('노트 수정 완료!');
      } else {
        const note: CreateNoteType = {
          todoId: todo.id,
          title,
          content,
          linkUrl: linkUrl || ''
        };

        const res = await createNote(note);
        toast.success('노트 생성 완료!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLinkSubmit = () => {
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

    setLinkUrl(linkUrl);
    setNoteLinkModalOpen(false);
  };

  const onDeleteLink = () => {
    setLinkUrl('');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-6">
        <ButtonArea isValid={isValid} />
        <div className="w-full space-y-6 bg-white desktop:px-6 desktop:pt-[40px]">
          <GoalAndTodoInfo
            goalTitle={todo.goal.title}
            todoTitle={todo.title}
            todoCompletaionDate={todo.completionDate}
          />
          <div className="space-y-[40px]">
            <TitleInput register={register} control={control} />
            <div className="space-y-4 px-4">
              <ContentInfo control={control} />

              {linkUrl && <LinkArea linkUrl={linkUrl} onDeleteLink={onDeleteLink} />}

              <Editor register={register} setValue={setValue} defaultContent={note?.content} />
            </div>
          </div>
        </div>
      </form>

      {isLinkModalOpen && (
        <UploadLinkModal
          defaultValue={linkUrl}
          onSubmit={onClickLinkSubmit}
          linkInputRef={linkInputRef}
        />
      )}
    </>
  );
}
