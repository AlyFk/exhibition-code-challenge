import { renderHook } from '@testing-library/react-hooks';
import useExhibition from './useExhibition';
import { createWrapper } from 'test-utils/wrapper';
import { server } from 'test-utils/mocks/server';
import { exhibitionHandlerException } from 'test-utils/mocks/handlers';

import getMockExhibition from 'test-utils/mockedData/exhibition/getMockExhibition';

let exhibitionId = 9252;
describe('testing useExhibition hook', () => {
  test('successful query hook', async () => {
    const { result, waitFor } = renderHook(() => useExhibition(exhibitionId), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).toEqual({ ...getMockExhibition(exhibitionId) });
  });

  test('failure query hook', async () => {
    exhibitionId = 12;
    server.use(exhibitionHandlerException);
    const { result, waitFor } = renderHook(() => useExhibition(exhibitionId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
