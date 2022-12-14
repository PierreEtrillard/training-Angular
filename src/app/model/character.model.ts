export class Character
{
  films!: Array<string>;
  shortFilms: Array<string>;
  tvShows: Array<string>;
  videoGames: Array<string>;
  parkAttractions: Array<string>;
  allies: Array<string>;
  enemies: Array<string>;
  _id!: number;
  name!: string;
  imageUrl!: string
  url!: string;
}
export class DisneyApiRes
{data:Character[];
  count:number;
  totalPages:number;
  nextPage:string
}

export class Favoris
{
  name!: string;
  characterId!: number;
  imageUrl!: string;
  likesArray!:string[];
  dislikesArray!:string[];
}