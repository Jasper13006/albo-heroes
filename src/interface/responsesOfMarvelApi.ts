export interface IpageOfComics{
    writers: string[];
    editors: string[];
    colorists: string[];
    characters: characterNested[]
}

export interface characterNested{
    name:string;
    id:string;
    comics: string[];
}