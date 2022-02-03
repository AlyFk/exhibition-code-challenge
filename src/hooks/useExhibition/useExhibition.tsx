import { useQuery, UseQueryOptions } from 'react-query';
import { getExhibition } from 'gate';
import type { AxiosRequestConfig } from 'axios';
import type { AsyncReturnType } from 'types';

function useExhibition<
  TData = AsyncReturnType<typeof getExhibition>,
  TError = Error
>(
  exhibitionId: number,
  options?: {
    query?: UseQueryOptions<
      AsyncReturnType<typeof getExhibition>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
) {
  const { query: queryOptions, axios: axiosOptions } = options || {};

  const queryKey = queryOptions?.queryKey ?? `exhibition-${exhibitionId}`;
  const queryFn = () => getExhibition(exhibitionId, axiosOptions);
  return useQuery<AsyncReturnType<typeof queryFn>, TError, TData>(
    queryKey,
    queryFn,
    { enabled: !!exhibitionId, ...queryOptions }
  );
}


export default useExhibition;
