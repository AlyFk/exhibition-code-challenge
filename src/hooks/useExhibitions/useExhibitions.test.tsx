import { renderHook } from '@testing-library/react-hooks';
import useExhibitions from './useExhibitions';
import { createWrapper } from 'test-utils/wrapper';
import getMockExhibitions from 'test-utils/mockedData/exhibitions/getMockExhibitions';

describe('testing useExhibitions hook', () => {
  test('fetchNextPage works fine in hook', async () => {
    const { result, waitFor } = renderHook(() => useExhibitions({ limit: 5 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.pages).toStrictEqual([
      getMockExhibitions(1, 5),
    ]);

    result.current.fetchNextPage();

    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching);

    expect(result.current.data?.pages).toStrictEqual([
      getMockExhibitions(1, 5),
      getMockExhibitions(2, 5),
    ]);
  });
});
