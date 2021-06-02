export interface IpageOfComics{
    writers: string[];
    editors: string[];
    colorists: string[];
    characters: ICharacterNested[]
}

export interface ICharacterNested{
    character:string;
    id:string;
    comics: string[];
}