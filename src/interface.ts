export interface ImgProp {
    type: 'web' | 'mobile',
    url: string,
    noParallax?: boolean,
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
    mainPreview: ImgProp,
    name: string,
    primaryColor: string,
    nextWork: string,
    pictures: ImgProp[],
    previousWork: string,
    repoUrl?: string,
    techs: string[],
    year: number
}
