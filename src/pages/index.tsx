import { useRef } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ExhibitionCard } from 'components/cards';
import { getExhibitionLayout } from 'components/layouts';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import exhibitionsService from 'services/exhibitions';

const { prefetchExhibitions, useExhibitions } =
  exhibitionsService('exhibitions');

function Home() {
  const target = useRef<HTMLDivElement>(null);

  useIntersectionObserver(target, () => fetchNextPage(), {
    threshold: 0.8,
  });

  const { data, isSuccess, fetchNextPage } = useExhibitions(
    { limit: 8 },
    {
      query: {
        staleTime: 30 * 1000,
      },
    }
  );

  return (
    <>
      <Head>
        <title>Exhibitions</title>
      </Head>
      <div className="mt-12 grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-4">
        {isSuccess &&
          data?.pages.map((page) =>
            page.data.map((exhibition) => (
              <Link href={`/exhibition/${exhibition.id}`} key={exhibition.id}>
                <a className="h-full cursor-pointer">
                  <ExhibitionCard
                    image_url={exhibition.image_url}
                    title={exhibition.title}
                    aic_start_at={exhibition.aic_start_at}
                    aic_end_at={exhibition.aic_end_at}
                  />
                </a>
              </Link>
            ))
          )}
      </div>
      <div ref={target} className="my-12 text-center text-2xl italic">
        Loading more exhibitions...
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const exhibitionsProps = await prefetchExhibitions(8, 1);

  return {
    props: {
      ...exhibitionsProps,
    },
  };
};

Home.getLayout = getExhibitionLayout;

export default Home;
