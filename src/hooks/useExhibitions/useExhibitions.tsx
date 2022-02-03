import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { getExhibitions } from 'gate';
import type { AxiosRequestConfig } from 'axios';
import type { AsyncReturnType } from 'types';

function useExhibitions<
  TData = AsyncReturnType<typeof getExhibitions>,
  TError = Error
>(
  { limit }: { limit: number },
  options?: {
    query?: UseInfiniteQueryOptions<
      AsyncReturnType<typeof getExhibitions>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
) {
  const { query: queryOptions, axios: axiosOptions } = options || {};

  const queryKey = queryOptions?.queryKey ?? 'exhibitions';
  const queryFn = async ({ pageParam = 1 }) =>
    getExhibitions({ limit, page: pageParam }, axiosOptions);

  return useInfiniteQuery<AsyncReturnType<typeof queryFn>, TError, TData>(
    queryKey,
    queryFn,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.current_page + 1;
      },
      ...queryOptions,
    }
  );
}

export default useExhibitions;
