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
  release: number;
  image: string;
}

export interface Track {
  _id: string;
  album: string;
  title: string;
  duration: string;
  number: number;
}