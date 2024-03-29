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

export interface IJob {
  companyName: string;
  position: string;
  period: string;
  bullets: string[];
  order: number;
  logo: string;
}

export interface IDeck {
  pictures: string[];
  type: string;
}
