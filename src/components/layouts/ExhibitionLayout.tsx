import React, { ReactElement } from 'react';

interface IExhibitionLayoutProps {
  children: React.ReactNode;
}
export const ExhibitionLayout: React.FC<IExhibitionLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <header className="bg-[#676767]">
        <h1 className="py-3 pl-5 text-5xl font-normal text-white">
          Exhibitions!
        </h1>
      </header>
      <main className="container mx-auto">{children}</main>
    </>
  );
};

export function getExhibitionLayout(page: ReactElement) {
  return <ExhibitionLayout>{page}</ExhibitionLayout>;
}
