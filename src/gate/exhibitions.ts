import api from './config';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  IGetExhibitionsApiResult,
  IExhibition,
  IGetExhibitionApiResult,
} from 'types';

export const getExhibitions = async (
  {
    limit,
    page,
  }: {
    limit: number;
    page: number;
  },
  options?: AxiosRequestConfig
): Promise<IGetExhibitionsApiResult> => {
  const data = await api.get<IGetExhibitionsApiResult>(
    `/exhibitions?page=${page}&limit=${limit}`,
    options
  );
  return data.data;
};

export const getExhibition = async (
  exhibitionId: number,
  options?: AxiosRequestConfig
): Promise<IGetExhibitionApiResult> => {
  const data = await api.get<IGetExhibitionApiResult>(
    `/exhibitions/${exhibitionId}`,
    options
  );
  return data.data;
};
