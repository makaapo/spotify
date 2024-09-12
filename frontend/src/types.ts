export interface Artist {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export interface Album {
  _id: string;
  artist: Artist;
  title: string;
  release: string;
  image: string;
}