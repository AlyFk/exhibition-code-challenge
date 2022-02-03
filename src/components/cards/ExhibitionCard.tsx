import React from 'react';
import { IExhibition } from 'types';
import Image from 'next/image';
import { EDATEwFormat } from 'utils/dateFormater';

type ExhibitionCardProps = Pick<
  IExhibition,
  'title' | 'image_url' | 'aic_start_at' | 'aic_end_at'
>;

const myLoader = ({ src }: { src: string }) => {
  return src;
};

export const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  title,
  image_url,
  aic_start_at,
  aic_end_at,
}) => {
  return (
    <div className="max-w-[313px] h-full hover:bg-gray-100">
      <Image
        loader={myLoader}
        src={image_url || '/placeholder-image.png'}
        unoptimized
        alt={title}
        width={313.04}
        height={225.97}
        className="bg-cover bg-fixed bg-center bg-no-repeat"
        objectFit="cover"
      />
      <h4 className="pt-3 text-lg">{title}</h4>
      <p className="pt-1.5 text-sm italic">
        {EDATEwFormat(aic_start_at)} - {EDATEwFormat(aic_end_at)}
      </p>
    </div>
  );
};
