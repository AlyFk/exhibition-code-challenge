import Home from '../index';
import { screen, waitFor } from '@testing-library/react';
import { renderWithClient } from 'test-utils/wrapper';
import getMockExhibitions from 'test-utils/mockedData/exhibitions/getMockExhibitions';
import {
  MockedObserver,
  traceMethodCalls,
  IntersectionCallBack,
} from 'test-utils/mockedObserverIntersection';

let limit = 8;

describe('test index page', () => {
  let observer: any;
  let mockedObserverCalls: { [k: string]: any } = {};

  beforeEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest
        .fn()
        .mockImplementation(function TrackMock(
          cb: IntersectionCallBack,
          options: IntersectionObserverInit
        ) {
          observer = traceMethodCalls(
            new MockedObserver(cb, options),
            mockedObserverCalls
          );

          return observer;
        }),
    });
  });
  afterEach(() => {
    observer = null;
    mockedObserverCalls = {};
  });
  test('showed pages', async () => {
    renderWithClient(<Home />);
    const target = screen.getByText(/Loading more exhibitions.../i);
    const cards = await screen.findAllByRole('link');
    expect(cards).toHaveLength(1 * limit);

    const mockedObserver = observer as unknown as MockedObserver;

    const entry1 = {
      target,
      intersectionRatio: 0.7,
      isIntersecting: true,
    };
    mockedObserver.fire([entry1 as unknown as IntersectionObserverEntry]);

    await screen.findByText(getMockExhibitions(2, 8).data[0].title);
    expect(await screen.findAllByRole('link')).toHaveLength(2 * limit);
  });
});
