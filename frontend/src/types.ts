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
  album: Album;
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
