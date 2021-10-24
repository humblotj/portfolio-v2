export interface ImgProp {
  type: 'web' | 'mobile';
  url: string;
  isParallax?: boolean;
  isVideo?: boolean;
  width: number;
  height: number;
  urls: { [key: string]: string }[];
}

export interface ImgSingleProp {
  type: 'web' | 'mobile';
  url: string;
  isParallax?: boolean;
  isVideo?: boolean;
  width: number;
  height: number;
  urls: { [key: string]: string };
}

export interface WorkProps {
  id?: string;
  isPersonal: boolean;
  name: string;
  description: string;
  order: number;
  preview: ImgProp;
  techs: string[];
}

export interface WorkDetailProps {
  description: string;
  links: { android?: string; ios?: string; web?: string };
  mainPreview: ImgSingleProp;
  name: string;
  nextWork: string;
  previews: ImgProp;
  previousWork: string;
  repoUrl?: string;
  techs: string[];
  year: number;
  index: number;
}
