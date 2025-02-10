import React from 'react';

import NoteCardList from '../_components/noteCardList/NoteCardList';

export default function NoteList() {
  return (
    <main className="min-h-screen px-4 pt-[30px] md:pt-0">
      <section>
        <div></div>
        <NoteCardList />
      </section>
    </main>
  );
}
