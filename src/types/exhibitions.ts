export interface IPagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

export interface IExhibition {
  id: number;
  api_model: string;
  api_link: string;
  title: string;
  is_featured: boolean;
  description: string | null;
  short_description: string | null;
  web_url: string | null;
  image_url: string | null;
  type: string;
  status: string;
  aic_start_at: string;
  aic_end_at: string;
  date_display: string | null;
  department_display: string | null;
  gallery_id: string | null;
  gallery_title: string | null;
  artwork_ids: string[];
  artwork_titles: string[];
  artist_ids: string[];
  site_ids: string[];
  image_id: string;
  alt_image_ids: string[];
  document_ids: string[];
  last_updated_source: Date;
  last_updated: Date;
  timestamp: Date;
}

export interface IGetExhibitionApiResult {
  data: IExhibition;
  info: {
    license_text: string;
    license_links: [string, string];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

export interface IGetExhibitionsApiResult {
  pagination: IPagination;
  data: IExhibition[];
  info: {
    license_text: string;
    license_links: [string, string];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}
