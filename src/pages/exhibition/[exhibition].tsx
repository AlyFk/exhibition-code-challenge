import React from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQueryClient } from 'react-query';
import axios from 'axios';
import { getExhibitionLayout } from 'components/layouts';
import { getExhibition } from 'gate';
import { EDATEwFormat } from 'utils/dateFormater';
import { useExhibition } from 'hooks/useExhibition';
import type { IGetExhibitionApiResult } from 'types';

const imgLoader = ({ src }: { src: string }) => {
  return src;
};

function Exhibition() {
  const router = useRouter();
  const { exhibitionid } = router.query;
  const exhibitionId = parseInt(exhibitionid as string, 10);
  const isPrefetched = !!useQueryClient().getQueryData<IGetExhibitionApiResult>(
    `exhibition-${exhibitionId}`
  )?.data;

  const { data, isSuccess, isLoading } = useExhibition(exhibitionId, {
    query: {
      staleTime: isPrefetched ? 1 * 60 * 1000 : 0,
    },
  });

  if (isLoading) {
    return <p>loading</p>;
  }

  const {
    data: { title, image_url, aic_start_at, aic_end_at, description },
  } = data!;
  return (
    <div className="px-2">
      <Head>
        <title>{isSuccess && title}</title>
      </Head>
      <button
        onClick={() => router.back()}
        className="flex items-center text-xl text-blue-700"
      >
        <span className="text-3xl">&#8592;</span>
        <span>Back</span>
      </button>
      {isSuccess && (
        <>
          <div className="mt-4 mb-9 flex flex-col pl-2 lg:flex-row lg:items-baseline lg:pl-0">
            <h2 className="text-4xl lg:mr-4">{title}</h2>
            <div className="pb-2 text-lg italic">
              {EDATEwFormat(aic_start_at ?? '')} -{' '}
              {EDATEwFormat(aic_end_at ?? '')}
            </div>
          </div>
          <div className="mb-4 flex flex-col lg:flex-row lg:items-start">
            <Image
              loader={imgLoader}
              src={image_url || '/placeholder-image.png'}
              unoptimized
              alt={`${title}-image`}
              width={370}
              height={260}
              className="bg-cover bg-fixed bg-center bg-no-repeat"
              objectFit="cover"
            />
            <div
              role="article"
              className="flex-1 py-4 px-4 text-justify text-xl leading-6 lg:py-0"
            >
              {description}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const exhibitionId = parseInt(params?.exhibitionid as string, 10);
  const queryClient = new QueryClient();
  try {
    const data = await getExhibition(exhibitionId);
    await queryClient.prefetchQuery(`exhibition-${exhibitionId}`, () => data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404)
      return {
        notFound: true,
      };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

Exhibition.getLayout = getExhibitionLayout;

export default Exhibition;
