import React from 'react';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto bg-gray100 px-6 pb-[68px] pl-[336px] pt-[94px] tablet:pl-[112px] tablet:pt-16 mobile:px-4 mobile:pl-4">
      <div className="w-full max-w-[1248px]">{children}</div>
    </div>
  );
}
