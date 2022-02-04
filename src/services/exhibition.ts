import { dehydrate, QueryClient, QueryKey } from 'react-query';
import { useExhibition } from 'hooks/useExhibition';
import { getExhibition } from 'gate';

const prefetch = async (exhibitionId: number) => {
  const queryClient = new QueryClient();

  const data = await getExhibition(exhibitionId);
  await queryClient.prefetchQuery(`exhibition-${exhibitionId}`, () => data);
  return {
    dehydratedState: dehydrate(queryClient),
  };
};

const exhibitionService = () => {
  return {
    prefetchExhibition: prefetch,
    useExhibition: useExhibition,
  };
};

export default exhibitionService;
