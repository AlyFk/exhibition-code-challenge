import { rest } from 'msw';
import getMockExhibitions from 'test-utils/mockedData/exhibitions/getMockExhibitions';
import getMockExhibition from 'test-utils/mockedData/exhibition/getMockExhibition';
export const exhibitionHandlerException = rest.get(
  `${process.env.API_BASE_URL!}/exhibitions/:id`,
  async (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'Deliberately broken request' })
    );
  }
);
export const handlers = [
  rest.get(`${process.env.API_BASE_URL!}/exhibitions`, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit') as string;
    const page = req.url.searchParams.get('page') as string;
    return res(
      ctx.status(200),
      ctx.json({
        ...getMockExhibitions(+page, +limit),
      })
    );
  }),

  rest.get(`${process.env.API_BASE_URL!}/exhibitions/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        ...getMockExhibition(+id),
      })
    );
  }),
];
