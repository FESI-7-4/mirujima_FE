import React from 'react';

import { readNoteListFromServer } from '@/api/serverActions/note';

import NoteCardList from '../_components/noteCardList/NoteCardList';

export default async function NoteList() {
  const res = await readNoteListFromServer({ goalId: 1, lastSeenId: 9999, pageSize: 5 });

  return (
    <main className="min-h-screen px-4 pt-[30px] md:pt-0">
      <section>
        <div></div>
        <NoteCardList noteList={res} />
      </section>
    </main>
  );
}
