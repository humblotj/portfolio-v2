export interface ImgProp {
    type: 'web' | 'mobile',
    url: string,
    isParallax?: boolean,
    isVideo?: boolean,
    width: number,
    height: number,
    urls: { [key: string]: string }[]
}

export interface ImgSingleProp {
    type: 'web' | 'mobile',
    url: string,
    isParallax?: boolean,
    isVideo?: boolean,
    width: number,
    height: number,
    urls: { [key: string]: string }
}

export interface WorkProps {
    id?: string,
    isPersonal: boolean;
    name: string;
    primaryColor: string,
    description: string;
    order: number;
    preview: ImgProp,
    techs: { color: string, name: string }[]
}

export interface WorkDetailProps {
    description: string,
    links: { type: 'web' | 'ios' | 'android', url: string }[],
    mainPreview: ImgSingleProp,
    name: string,
    primaryColor: string,
    nextWork: string,
    previews: ImgProp,
    previousWork: string,
    repoUrl?: string,
    techs: string[],
    year: number
}
