import exhibitions from './exhibitions.json';
import type { IExhibition, IGetExhibitionsApiResult } from 'types';
const getMockExhibitions = (
  page: number,
  limit: number
): IGetExhibitionsApiResult => {
  const data = exhibitions.data.slice(
    (page - 1) * limit,
    page * limit
  ) as unknown as IExhibition[];

  const exhibitionsData = exhibitions as unknown as IGetExhibitionsApiResult;
  return { ...exhibitionsData, data };
};

export default getMockExhibitions;
