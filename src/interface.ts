export interface ImgProp {
    type: 'web' | 'mobile',
    url: string,
}

export interface WorkProps {
    isPersonal: boolean;
    name: string;
    order: 5;
    preview: ImgProp,
    techs: { color: string, name: string }[]
}

export interface WorkDetailProps {
    description: string,
    mainPreview: ImgProp,
    name: string,
    nextWork: string,
    pictures: ImgProp[],
    previousWork: string,
    techs: string[],
    year: number
}
