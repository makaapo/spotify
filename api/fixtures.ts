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
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [Scrip, Yankee] = await Artist.create(
    {
      title: "Scriptonit",
      image: 'fixtures/scrip.jpeg'
    },
    {
      title: "Daddy Yankee",
      image: 'fixtures/yankee.webp'
    },
  );

  const [ScripAlbum1, ScripAlbum2, YankeeAlbum1, YankeeAlbum2] = await Album.create(
    {
      title: "Дом с нормальными явлениями",
      artist: Scrip._id,
      release: 2015,
      image: "fixtures/scripAlbum1.jpeg",
      isPublished: true,
    }, {
      title: "Уроборос: Улица 36",
      artist: Scrip._id,
      release: 2017,
      image: "fixtures/scripAlbum2.jpeg",
      isPublished: true,
    },
    {
      title: "Talento de Barrio",
      artist: Yankee._id,
      release: 2008,
      image: "fixtures/yankeeAlbum1.jpeg",
      isPublished: true,
    }, {
      title: "Legendaddy",
      artist: Yankee._id,
      release: 2023,
      image: "fixtures/yankeeAlbum2.jpeg",
      isPublished: true,
    },
  );

  await Track.create(
    {
      title: "«Животные»",
      album: ScripAlbum1._id,
      duration: "3:02",
      number: 1,
      isPublished: true,
    },
    {
      title: "«Мистер 718»",
      album: ScripAlbum1._id,
      duration: "3:46",
      number: 2,
      isPublished: true,
    },
    {
      title: "«Твой микстейп»",
      album: ScripAlbum1._id,
      duration: "1:32",
      number: 3,
      isPublished: true,
    },
    {
      title: "«Положение»",
      album: ScripAlbum1._id,
      duration: "4:42",
      number: 4,
      isPublished: true,
    },
    {
      title: "«Трата времени»",
      album: ScripAlbum1._id,
      duration: "3:37",
      number: 5,
      isPublished: true,
    },

    {
      title: "Танцуй сама",
      album: ScripAlbum2._id,
      duration: "4:36",
      number: 1,
      isPublished: true,
    },
    {
      title: "«Сука тащит нас на дно» (при уч. 104 и Truwer)",
      album: ScripAlbum2._id,
      duration: "6:50",
      number: 2,
      isPublished: true,
    },
    {
      title: "«Стиль» (другая версия, при уч. ATL)",
      album: ScripAlbum2._id,
      duration: "6:47",
      number: 3,
      isPublished: true,
    },
    {
      title: "«Вечеринка»",
      album: ScripAlbum2._id,
      duration: "6:03",
      number: 4,
      isPublished: true,
    },
    {
      title: "Это любовь",
      album: ScripAlbum2._id,
      duration: "4:39",
      number: 5,
      isPublished: true,
    },

    {
      title: "Talento de Barrio",
      album: YankeeAlbum1._id,
      duration: "2:59",
      number: 1,
      isPublished: true,
    },
    {
      title: "Pa-Kum-Pa!!",
      album: YankeeAlbum1._id,
      duration: "3:13",
      number: 2,
      isPublished: true,
    },
    {
      title: "Temblor",
      album: YankeeAlbum1._id,
      duration: "4:17",
      number: 3,
      isPublished: true,
    },
    {
      title: "Oasis de Fantasía",
      album: YankeeAlbum1._id,
      duration: "4:48",
      number: 4,
      isPublished: true,
    },
    {
      title: "De la Paz y de la Guerra",
      album: YankeeAlbum1._id,
      duration: "3:44",
      number: 5,
      isPublished: true,
    },

    {
      title: "Campeón",
      album: YankeeAlbum2._id,
      duration: "0:41",
      number: 1
    },
    {
      title: "Uno Quitao' y Otro Puesto",
      album: YankeeAlbum2._id,
      duration: "3:51",
      number: 2,
      isPublished: true,
    },
    {
      title: "Truquito",
      album: YankeeAlbum2._id,
      duration: "3:04",
      number: 3,
      isPublished: true,
    },
    {
      title: "Enchuletiao",
      album: YankeeAlbum2._id,
      duration: "3:51",
      number: 4,
      isPublished: true,
    },
    {
      title: "Impares",
      album: YankeeAlbum2._id,
      duration: "4:15",
      number: 5,
      isPublished: true,
    }
  );
  await User.create(
    {
      username: 'abdumalik',
      password: '221096',
      role: 'admin',
      token: crypto.randomUUID(),

    },
    {
      username: 'makapo',
      password: '12345',
      role: 'user',
      token: crypto.randomUUID(),
    },
  );

  await db.close();
};

void run();
