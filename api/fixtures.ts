import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [user1, user2] = await User.create(
    {
      username: 'malik',
      password: '221096',
      role: 'user',
      token: crypto.randomUUID(),
    },
    {
      username: 'makapo',
      password: '12345',
      role: 'user',
      token: crypto.randomUUID(),
    },
    {
      username: 'admin',
      password: 'admin',
      role: 'admin',
      token: crypto.randomUUID(),
    },
  );

  const [Scrip, Yankee, Adele] = await Artist.create(
    {
      user: user1,
      title: "Scriptonit",
      image: 'fixtures/scrip.jpeg',
      isPublished: true,
    },
    {
      user: user2,
      title: "Daddy Yankee",
      image: 'fixtures/yankee.webp',
      isPublished: true,
    },
    {
      user: user2,
      title: "Adele",
      image: 'fixtures/adele.webp',
      isPublished: false,
    },
  );

  const [ScripAlbum1, ScripAlbum2, YankeeAlbum1, YankeeAlbum2, AdeleAlbum] = await Album.create(
    {
      user: user1,
      title: "Дом с нормальными явлениями",
      artist: Scrip._id,
      release: 2015,
      image: "fixtures/scripAlbum1.jpeg",
      isPublished: true,
    }, {
      user: user1,
      title: "Уроборос: Улица 36",
      artist: Scrip._id,
      release: 2017,
      image: "fixtures/scripAlbum2.jpeg",
      isPublished: true,
    },
    {
      user: user2,
      title: "Talento de Barrio",
      artist: Yankee._id,
      release: 2008,
      image: "fixtures/yankeeAlbum1.jpeg",
      isPublished: true,
    }, {
      user: user2,
      title: "Legendaddy",
      artist: Yankee._id,
      release: 2023,
      image: "fixtures/yankeeAlbum2.jpeg",
      isPublished: true,
    },
    {
      user: user2,
      title: "21",
      artist: Adele._id,
      release: 2011,
      image: "fixtures/21.png",
      isPublished: false,
    },
  );

  await Track.create(
    {
      user: user1,
      title: "«Животные»",
      album: ScripAlbum1._id,
      duration: "3:02",
      number: 1,
      isPublished: true,
    },
    {
      user: user1,
      title: "«Мистер 718»",
      album: ScripAlbum1._id,
      duration: "3:46",
      number: 2,
      isPublished: true,
    },
    {
      user: user1,
      title: "«Твой микстейп»",
      album: ScripAlbum1._id,
      duration: "1:32",
      number: 3,
      isPublished: true,
    },
    {
      user: user1,
      title: "«Положение»",
      album: ScripAlbum1._id,
      duration: "4:42",
      number: 4,
      isPublished: true,
    },
    {
      user: user1,
      title: "«Трата времени»",
      album: ScripAlbum1._id,
      duration: "3:37",
      number: 5,
      isPublished: true,
    },

    {user: user1,

      title: "Танцуй сама",
      album: ScripAlbum2._id,
      duration: "4:36",
      number: 1,
      isPublished: true,
    },
    {
      user: user1,
      title: "«Сука тащит нас на дно» (при уч. 104 и Truwer)",
      album: ScripAlbum2._id,
      duration: "6:50",
      number: 2,
      isPublished: true,
    },
    {
      user: user1,
      title: "«Стиль» (другая версия, при уч. ATL)",
      album: ScripAlbum2._id,
      duration: "6:47",
      number: 3,
      isPublished: true,
    },
    {
      user: user1,
      title: "«Вечеринка»",
      album: ScripAlbum2._id,
      duration: "6:03",
      number: 4,
      isPublished: true,
    },
    {
      user: user1,
      title: "Это любовь",
      album: ScripAlbum2._id,
      duration: "4:39",
      number: 5,
      isPublished: true,
    },

    {
      user: user2,
      title: "Talento de Barrio",
      album: YankeeAlbum1._id,
      duration: "2:59",
      number: 1,
      isPublished: true,
    },
    {
      user: user2,
      title: "Pa-Kum-Pa!!",
      album: YankeeAlbum1._id,
      duration: "3:13",
      number: 2,
      isPublished: true,
    },
    {
      user: user2,
      title: "Temblor",
      album: YankeeAlbum1._id,
      duration: "4:17",
      number: 3,
      isPublished: true,
    },
    {
      user: user2,
      title: "Oasis de Fantasía",
      album: YankeeAlbum1._id,
      duration: "4:48",
      number: 4,
      isPublished: true,
    },
    {
      user: user2,
      title: "De la Paz y de la Guerra",
      album: YankeeAlbum1._id,
      duration: "3:44",
      number: 5,
      isPublished: true,
    },

    {
      user: user2,
      title: "Campeón",
      album: YankeeAlbum2._id,
      duration: "0:41",
      number: 1
    },
    {
      user: user2,
      title: "Uno Quitao' y Otro Puesto",
      album: YankeeAlbum2._id,
      duration: "3:51",
      number: 2,
      isPublished: true,
    },
    {
      user: user2,
      title: "Truquito",
      album: YankeeAlbum2._id,
      duration: "3:04",
      number: 3,
      isPublished: true,
    },
    {
      user: user2,
      title: "Enchuletiao",
      album: YankeeAlbum2._id,
      duration: "3:51",
      number: 4,
      isPublished: true,
    },
    {
      user: user2,
      title: "Impares",
      album: YankeeAlbum2._id,
      duration: "4:15",
      number: 5,
      isPublished: true,
    },
    {
      user: user2,
      title: "Set Fire to the Rain",
      album: AdeleAlbum._id,
      duration: "4:02",
      number: 1,
      isPublished: false,
    },
    {
      user: user2,
      title: "Rolling in the Deep",
      album: AdeleAlbum._id,
      duration: "3:48",
      number: 2,
      isPublished: false,
    },
    {
      user: user2,
      title: "Someone like You",
      album: AdeleAlbum._id,
      duration: "4:45",
      number: 3,
      isPublished: false,
    },
  );

  await db.close();
};

void run();
