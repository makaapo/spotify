export interface Artist {
  _id: string;
  title: string;
  description: string;
  image: string;
  isPublished: boolean;
}

export interface ArtistMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface Album {
  _id: string;
  artist: Artist;
  title: string;
  release: number;
  image: string;
  isPublished: boolean;
}

export interface AlbumMutation {
  artist: string;
  title: string;
  release: string;
  image: File | null;
}

export interface Track {
  _id: string;
  album: Album;
  title: string;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface TrackMutation {
  album: string;
  title: string;
  duration: string;
  number: number;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory {
  _id: string;
  user: User;
  datetime: string;
  track: Track;
  artist: Artist;
}
