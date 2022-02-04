import Exhibition from '../[exhibition].page';
import { NextRouter } from 'next/router';
import { screen, waitFor } from '@testing-library/react';
import { renderWithClient } from 'test-utils/wrapper';
import getMockExhibition from 'test-utils/mockedData/exhibition/getMockExhibition';

const mockRouter: NextRouter = {
  isLocaleDomain: false,
  isPreview: false,
  isReady: false,
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: { exhibition: '9252' },
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

describe('exhibition page', () => {
  test('showed exhibition details', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    useRouter.mockImplementation(() => mockRouter);
    renderWithClient(<Exhibition />);
    expect(
      await screen.findByText(getMockExhibition(9252).data.title)
    ).toBeInTheDocument();

    expect(
      await screen.findByAltText(`${getMockExhibition(9252).data.title}-image`)
    ).toHaveAttribute('src', getMockExhibition(9252).data.image_url);

    expect(await screen.findByRole('article')).toHaveTextContent(
      getMockExhibition(9252).data.description!,
      { normalizeWhitespace: false }
    );
  });
});
