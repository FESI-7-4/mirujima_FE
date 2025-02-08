'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { createNote } from '@/api/note';
import { FaviconIcon } from '@/components/icons';
import { CloseCircleIcon } from '@/components/icons/CloseIcon';
import { EmbedIcon } from '@/components/icons/EmbedIcon';
import { useNoteModalStore } from '@/provider/store-provider';
import { noteSchema } from '@/schema/noteSchema';

import { Editor } from './editor/DynamicEditor';
import UploadLinkModal from '../modals/uploadLinkModal/UploadLinkModal';

import type { NoteInputData } from '@/schema/noteSchema';
import type { NoteDataType } from '@/types/note.type';
import type { TodoResponseType } from '@/types/todo.type';

interface Props {
  todo: TodoResponseType;
}

export default function NoteContent({ todo }: Props) {
  const [isLinkExist, setisLinkExist] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getFieldState,
    formState: { isValid }
  } = useForm<NoteInputData>({
    resolver: zodResolver(noteSchema),
    mode: 'onChange',
    defaultValues: {}
  });

  const isLinkModalOpen = useNoteModalStore(({ state }) => state);
  const { setModalClose } = useNoteModalStore(({ actions }) => actions);

  const onSubmit: SubmitHandler<NoteInputData> = async (data) => {
    const { title, content, linkUrl } = data;

    const note: NoteDataType = {
      todoId: todo.id,
      title,
      content: '링크 추가 테스트', // content text 제한이 있는듯?
      linkUrl
    };

    try {
      const res = await createNote(note);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLinkSubmit = () => {
    const isError = getFieldState('linkUrl').invalid;
    if (isError) {
      // 유효하지 않은 링크
      return;
    }

    setisLinkExist(true);
    setModalClose();
  };

  const onCloseLinkModal = () => {
    setValue('linkUrl', undefined);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <div className="w-full max-w-[792px] py-[5px]">
          <div className="flex items-center justify-between py-[5px]">
            <h2 className="text-base text-slate-900">노트 작성</h2>
            <div className="flex gap-2">
              <button
                type="button"
                name="임시저장 버튼"
                className="h-[36px] w-[84px] rounded-xl text-[14px] font-semibold text-main"
              >
                임시 저장
              </button>
              <button
                type="submit"
                name="작성완료 버튼"
                disabled={!isValid}
                className="h-[36px] w-[84px] rounded-xl bg-main text-[14px] font-semibold text-white disabled:bg-cGray disabled:text-gray-350"
              >
                작성 완료
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 py-[5px]">
            <div className="h-6 w-6">
              <FaviconIcon />
            </div>
            <h3 className="truncate text-slate-800">{todo.goal.title}</h3>
          </div>
          <div className="flex items-center gap-2 py-[5px]">
            <div>
              <button
                className="h-[20px] w-[37px] rounded bg-slate-100 px-[3px] py-[2px] text-[12px] font-medium text-slate-700"
                disabled
              >
                To do
              </button>
            </div>
            <h4 className="truncate text-slate-700">{todo.title}</h4>
          </div>
        </div>

        <div className="h-full w-full max-w-[792px] space-y-2 py-[5px]">
          <div>
            <input
              type="text"
              className="w-full border-y border-slate-200 py-2 text-base outline-none"
              placeholder="노트의 제목을 입력해주세요"
              {...register('title')}
            />
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-800">
              공백 포함 : 총 {0}자 | 공백제외 : 총 {0}자
            </p>
          </div>
          {isLinkExist && (
            <div className="flex h-[32px] w-full justify-between gap-2 rounded-[20px] bg-slate-200 px-[6px] py-1">
              <Link
                href={watch('linkUrl') || ''}
                target="_blank"
                className="flex w-[calc(100%-24px)] gap-2 truncate text-slate-800"
              >
                <span>
                  <EmbedIcon />
                </span>
                {watch('linkUrl')}
              </Link>

              <button type="button" name="링크 삭제 버튼">
                <CloseCircleIcon />
              </button>
            </div>
          )}

          <Editor register={register} setValue={setValue} />
        </div>
      </form>

      {isLinkModalOpen && (
        <UploadLinkModal
          register={register}
          onSubmit={onClickLinkSubmit}
          onClose={onCloseLinkModal}
        />
      )}
    </>
  );
}
