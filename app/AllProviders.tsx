import { Toaster } from 'react-hot-toast';

import {
  InfoStoreProvider,
  ModalStoreProvider,
  NoteModalStoreProvider
} from '@/provider/store-provider';

import ReactQueryProvider from '../hooks/useReactQuery';

export default function AllProviders({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InfoStoreProvider>
      <ModalStoreProvider>
        <NoteModalStoreProvider>
          <ReactQueryProvider>
            {children}
            <Toaster />
            <div id="first-modal-portal" />
            <div id="second-modal-portal" />
          </ReactQueryProvider>
        </NoteModalStoreProvider>
      </ModalStoreProvider>
    </InfoStoreProvider>
  );
}
