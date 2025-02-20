import React from 'react';

export const generateMetadata = () => {
  return {
    title: `대시보드`
  };
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
