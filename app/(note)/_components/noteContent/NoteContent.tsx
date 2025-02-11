'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';

import { createNote } from '@/api/clientActions/note';
import { CloseCircleIcon, EmbedIcon } from '@/components/icons';
import { URL_REGEX } from '@/constant/regex';
import { useModalStore } from '@/provider/store-provider';
import { noteSchema } from '@/schema/noteSchema';

import { Editor } from './editor/DynamicEditor';
import TitleInput from './titleInput/TitleInput';
import UploadLinkModal from '../modals/uploadLinkModal/UploadLinkModal';

import type { NoteInputData } from '@/schema/noteSchema';
import type { CreateNoteType } from '@/types/note.type';
import type { TodoType } from '@/types/todo.type';

interface Props {
  todo: TodoType;
}

export default function NoteContent({ todo }: Props) {
  const [isLinkExist, setisLinkExist] = React.useState(false);
  const fakeLinkInputRef = React.useRef<HTMLInputElement>(null);

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
    defaultValues: {}
  });

  const isLinkModalOpen = useModalStore((store) => store.isNoteLinkModalOpen);
  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);

  const onSubmit: SubmitHandler<NoteInputData> = async (data) => {
    const { title, content, linkUrl } = data;

    const note: CreateNoteType = {
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
    if (!fakeLinkInputRef.current) return;

    const linkUrl = fakeLinkInputRef.current.value;
    const isEmpty = linkUrl === '';
    if (isEmpty) {
      setisLinkExist(false);
      setValue('linkUrl', undefined);
      setNoteLinkModalOpen(false);
      return;
    }

    const isWrongURL = URL_REGEX.test(linkUrl) === false;
    if (isWrongURL) {
      toast.error('유효하지 않은 링크입니다', { duration: 1500 });
      return;
    }

    setValue('linkUrl', fakeLinkInputRef.current.value);
    setisLinkExist(true);
    setNoteLinkModalOpen(false);
  };

  const onDeleteLink = () => {
    setisLinkExist(false);
    setValue('linkUrl', undefined);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-[1248px] flex-col items-center">
        <div className="w-full py-[5px]">
          <div className="flex items-center justify-between py-[5px]">
            <h2 className="text-base leading-[28px] text-gray500 md:text-[22px]">노트 작성</h2>
            <div className="flex gap-2">
              <button
                type="button"
                name="임시저장 버튼"
                aria-label="노트 임시저장"
                className="h-[50px] w-[88px] rounded-lg border border-gray200 text-[14px] font-semibold text-gray350"
              >
                임시 저장
              </button>
              <button
                type="submit"
                name="작성완료 버튼"
                aria-label="노트 작성완료"
                aria-disabled={!isValid}
                disabled={!isValid}
                className="h-[50px] w-[88px] rounded-xl bg-solid text-[14px] font-semibold text-main disabled:bg-Cgray disabled:text-gray350"
              >
                작성 완료
              </button>
            </div>
          </div>
        </div>

        <div className="h-full w-full space-y-2 bg-white px-4 py-[5px]">
          <div className="flex items-center gap-2 py-[5px]">
            <div className="h-6 w-6">
              <Image src={'/icon/work.svg'} width={24} height={24} alt="할 일 아이콘" />
            </div>
            <h3 className="truncate text-gray500">{todo.goal.title}</h3>
          </div>
          <div className="flex items-center justify-between gap-2 py-[5px]">
            <div className="flex items-center gap-2">
              <div className="h-[20px] w-[37px] rounded bg-Cgray px-[3px] py-[2px] text-[12px] font-medium text-gray350">
                <span>To do</span>
              </div>
              <h4 className="truncate text-gray400">{todo.title}</h4>
            </div>
            <span className="text-sm leading-[16px] text-gray400">{todo.goal.completionDate}</span>
          </div>
          <TitleInput register={register} control={control} />
          <div>
            <p className="text-[12px] font-medium text-gray350">
              공백 포함 : 총 {0}자 | 공백제외 : 총 {0}자
            </p>
          </div>
          {isLinkExist && (
            <div className="flex h-[32px] w-full justify-between gap-2 rounded-[20px] bg-slate-200 px-[6px] py-1">
              <Link
                href={getValues('linkUrl') || ''}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="참고 링크 열기"
                className="flex w-[calc(100%-24px)] gap-2 truncate text-slate-800"
              >
                <span>
                  <EmbedIcon />
                </span>
                {getValues('linkUrl')}
              </Link>

              <button
                type="button"
                onClick={onDeleteLink}
                aria-label="참고 링크 삭제"
                name="링크 삭제 버튼"
              >
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
          defaultValue={getValues('linkUrl')}
          onSubmit={onClickLinkSubmit}
          fakeLinkInputRef={fakeLinkInputRef}
        />
      )}
    </>
  );
}
