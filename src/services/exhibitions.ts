import { dehydrate, QueryClient, QueryKey } from 'react-query';
import { useExhibitions } from 'hooks/useExhibitions';
import { getExhibitions } from 'gate';

const prefetch = async (limit: number, page: number) => {
  const queryClient = new QueryClient();

  const data = getExhibitions({ limit, page });
  await queryClient.prefetchInfiniteQuery("exhibitions", () => data);
  return {
    dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
  };
};

const exhibitionsService = () => {
  return {
    prefetchExhibitions: prefetch,
    useExhibitions: useExhibitions
  };
};

export default exhibitionsService
