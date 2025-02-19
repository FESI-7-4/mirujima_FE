import React from 'react';

import { isTempNoteContent } from '@/utils/note/isTempNoteContent';

import type { TempNoteContentType, TempNoteType } from '@/types/note.type';

const STORAGE_KEY = 'editorContent';

const useTempNote = (goalId: number, todoId?: number) => {
  // 로컬스토리지에서 불러온 데이터를 state로 관리할 필요?
  // const [tempContent, setTempContent] = React.useState<TempNoteContentType>();
  const [tempNote, setTempNote] = React.useState<TempNoteType>();

  const onLoadTempNoteFromStorage = () => {
    const tempContent = localStorage.getItem(STORAGE_KEY);
    if (!tempContent) return;

    try {
      const parsedContent = JSON.parse(tempContent);
      if (!isTempNoteContent(parsedContent)) return;

      // setTempContent(parsedContent);

      return parsedContent;
    } catch (error) {
      console.error('데이터 파싱오류', error);

      return;
    }
  };

  const onSaveTempToStorage = async (content: string) => {
    if (!todoId) return;

    const note: TempNoteType = { todoId, content };
    const tempData = onLoadTempNoteFromStorage();
    if (!tempData) {
      const newTempData: TempNoteContentType = {
        [goalId]: [note]
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTempData));
    } else {
      if (!tempData[goalId]) tempData[goalId] = [note];
      else {
        const targetIdx = tempData[goalId].findIndex((note) => note.todoId === todoId);
        if (targetIdx === -1) {
          tempData[goalId].push(note); // 노트가 많을 경우를 생각해서 정렬 알고리즘을 적용해야하나..?
        } else {
          tempData[goalId][targetIdx] = note;
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(tempData));
    }
  };

  const getTempNote = () => {
    const tempData = onLoadTempNoteFromStorage();
    if (!tempData || !tempData[goalId]) return;

    return tempData[goalId].find((temp) => temp.todoId === todoId);
  };

  // goal 삭제, todo 삭제 시에도 실행되어야함
  const deleteTempNote = () => {
    const tempData = onLoadTempNoteFromStorage();
    if (tempData && tempData[goalId]) {
      if (todoId) {
        // todo 삭제 시
        const newNoteList = tempData[goalId].filter((note) => note.todoId !== todoId);
        tempData[goalId] = newNoteList;
      } else {
        // goal 삭제 시
        delete tempData[goalId];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(tempData));
    }
  };

  React.useEffect(() => {
    setTempNote(getTempNote());
  }, []);

  return { onLoadTempNoteFromStorage, onSaveTempToStorage, deleteTempNote, tempNote };
};

export default useTempNote;
