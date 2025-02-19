import { TEMP_STORAGE_KEY } from '@/constant/tempNoteStorageKey';

import { isTempNoteContent } from './isTempNoteContent';

import type { TempNoteContentType, TempNoteType } from '@/types/note.type';

export class TempNoteContent {
  private _content: TempNoteContentType;

  constructor(initialData: TempNoteContentType = {}) {
    this._content = initialData;
  }

  get content(): TempNoteContentType {
    return this._content;
  }

  addNote(goalId: number, note: TempNoteType) {
    if (!this._content[goalId]) {
      this._content[goalId] = [];
    }

    this._content[goalId].push(note);
  }

  getNoteListByGoalId(goalId: number) {
    if (!this._content[goalId]) return;

    return this._content[goalId];
  }

  getNote(goalId: number, todoId: number) {
    const noteList = this.getNoteListByGoalId(goalId);
    if (!noteList) return;

    return noteList.find((note) => note.todoId === todoId);
  }

  updateNote(goalId: number, note: TempNoteType) {
    const noteList = this.getNoteListByGoalId(goalId);
    if (!noteList) {
      this.addNote(goalId, note);
    } else {
      const targetIdx = noteList.findIndex((note) => note.todoId === note.todoId);
      noteList[targetIdx] = note;
    }
  }

  deleteNote(goalId: number, todoId: number) {
    const noteList = this.getNoteListByGoalId(goalId);
    if (noteList) {
      const targetIdx = noteList.findIndex((note) => note.todoId === todoId);
      if (targetIdx !== -1) {
        noteList.splice(targetIdx, 1);
        // goalId에 노트가 없으면 goalId key를 삭제
        if (noteList.length === 0) {
          delete this._content[goalId];
        }
      }
    }
  }

  saveTempToStorage(key: string = TEMP_STORAGE_KEY) {
    localStorage.setItem(key, JSON.stringify(this._content));
  }

  static loadTempNoteFromStorage(key: string = TEMP_STORAGE_KEY) {
    const data = localStorage.getItem(key);
    if (!data) return;

    try {
      const parsedData = JSON.parse(data);
      if (!isTempNoteContent(parsedData)) return;

      return new TempNoteContent(parsedData);
    } catch (error) {
      console.error('데이터 파싱오류', error);
      return;
    }
  }

  static deleteTempNote(key: string, goalId: number, todoId?: number) {
    const tempData = this.loadTempNoteFromStorage(key);
    if (tempData) {
      // 할 일 삭제 시
      if (todoId) {
        tempData.deleteNote(goalId, todoId);
        tempData.saveTempToStorage();
      } else {
        // 목표 삭제 시
        const noteList = tempData.getNoteListByGoalId(goalId);
        if (noteList) {
          delete tempData._content[goalId];
          tempData.saveTempToStorage();
        }
      }
    }
  }
}
