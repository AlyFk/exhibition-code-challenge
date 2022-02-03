import exhibition from './exhibition.json';
import type { IExhibition, IGetExhibitionApiResult } from 'types';
const getMockExhibition = (exhibitionId: number): IGetExhibitionApiResult => {
  const exhibitionData = exhibition as unknown as IGetExhibitionApiResult;
  exhibitionData.data.id = exhibitionId;
  return exhibitionData;
};

export default getMockExhibition;
