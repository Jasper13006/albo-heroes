import { ICharacterNested } from "./responsesOfMarvelApi";

export interface ICharacter{
    alboName:string;
    last_sync:Date;
    name: string;
    id: number;
    characters:ICharacterNested[];
    colaborators:IColaborators;
}

export interface IColaborators{
    writers: string[];
    editors: string[];
    colorists: string[];
}