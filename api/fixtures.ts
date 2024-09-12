import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";


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
      image: "fixtures/scripAlbum1.jpeg"
    }, {
      title: "Уроборос: Улица 36",
      artist: Scrip._id,
      release: 2017,
      image: "fixtures/scripAlbum2.jpeg"
    },
    {
      title: "Talento de Barrio",
      artist: Yankee._id,
      release: 2008,
      image: "fixtures/yankeeAlbum1.jpeg"
    }, {
      title: "Legendaddy",
      artist: Yankee._id,
      release: 2023,
      image: "fixtures/yankeeAlbum2.jpeg"
    },
  );

  await Track.create(
    {
      title: "«Животные»",
      album: ScripAlbum1._id,
      duration: "3:02",
      number: 1
    },
    {
      title: "«Мистер 718»",
      album: ScripAlbum1._id,
      duration: "3:46",
      number: 2
    },
    {
      title: "«Твой микстейп»",
      album: ScripAlbum1._id,
      duration: "1:32",
      number: 3
    },
    {
      title: "«Положение»",
      album: ScripAlbum1._id,
      duration: "4:42",
      number: 4
    },
    {
      title: "«Трата времени»",
      album: ScripAlbum1._id,
      duration: "3:37",
      number: 5
    },

    {
      title: "Танцуй сама",
      album: ScripAlbum2._id,
      duration: "4:36",
      number: 1
    },
    {
      title: "«Сука тащит нас на дно» (при уч. 104 и Truwer)",
      album: ScripAlbum2._id,
      duration: "6:50",
      number: 2
    },
    {
      title: "«Стиль» (другая версия, при уч. ATL)",
      album: ScripAlbum2._id,
      duration: "6:47",
      number: 3
    },
    {
      title: "«Вечеринка»",
      album: ScripAlbum2._id,
      duration: "6:03",
      number: 4
    },
    {
      title: "Это любовь",
      album: ScripAlbum2._id,
      duration: "4:39",
      number: 5
    },

    {
      title: "Talento de Barrio",
      album: YankeeAlbum1._id,
      duration: "2:59",
      number: 1
    },
    {
      title: "Pa-Kum-Pa!!",
      album: YankeeAlbum1._id,
      duration: "3:13",
      number: 2
    },
    {
      title: "Temblor",
      album: YankeeAlbum1._id,
      duration: "4:17",
      number: 3
    },
    {
      title: "Oasis de Fantasía",
      album: YankeeAlbum1._id,
      duration: "4:48",
      number: 4
    },
    {
      title: "De la Paz y de la Guerra",
      album: YankeeAlbum1._id,
      duration: "3:44",
      number: 5
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
      number: 2
    },
    {
      title: "Truquito",
      album: YankeeAlbum2._id,
      duration: "3:04",
      number: 3
    },
    {
      title: "Enchuletiao",
      album: YankeeAlbum2._id,
      duration: "3:51",
      number: 4
    },
    {
      title: "Impares",
      album: YankeeAlbum2._id,
      duration: "4:15",
      number: 5
    }
  );

  await db.close();
};

void run();
