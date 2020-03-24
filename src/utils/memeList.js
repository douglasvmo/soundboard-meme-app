const max = 2;
const min = 0;

function randomNumber() {
  return Math.floor(Math.random() * (max - min)) + min;
}

const memeList = [
  {
    id: '0',
    color: randomNumber(),
    name: 'Errou',
    meme: require('~assets/errou/Errou.mp3'),
    img: require('~assets/errou/errou.png')
  },
  {
    id: '1',
    color: 1,
    name: 'Epic Sax',
    meme: require('~assets/epicsax/epicsax.mp3'),
    img: require('~assets/epicsax/epicsax.png')
  },
  {
    id: '2',
    color: randomNumber(),
    name: 'CoronaVirus',
    meme: require('~assets/coronavirus/coronavirus.mp3'),
    img: require('~assets/coronavirus/coronavirus.png')
  }
];

export default memeList;
