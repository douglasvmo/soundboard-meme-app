export default {
  primaryColor: '#636e72',
  dark: '#303030',
  darkText: 'rgba(0, 0, 0, 0.8)',
  intermediateDarkLayer: 'rgba(0, 0, 0, 0.65)',
  darkLayer: 'rgba(0, 0, 0, 0.5)',
  lightDarkLayer: 'rgba(0, 0, 0, 0.3)',
  lightingDarkLayer: 'rgba(0, 0, 0, 0.2)',
  red: '#fab1a0',
  blue: '#4688F1',
  white: '#FDFDFD',
  defaultWhite: '#FFFFFF',
  green: '#1DB954',
  yellow: '#fdcb6e',
  gray: '#909090',
  lightGray: 'rgba(242, 242, 242, 0.9)',
  subText: 'rgba(0, 0, 0, 0.6)',
  transparentGray: 'rgba(218, 218, 218, 0.5)',
  transparent02: 'rgba(255, 255, 255, 0.2)',
  transparent05: 'rgba(255, 255, 255, 0.5)',
  transparent07: 'rgba(255, 255, 255, 0.7)',
  progressiveImageForeground: 'rgba(242, 242, 242, 0.5)',
  transparentGrayx: '#DADADA',
  androidToolbarColor: '#a60023',
  facebook: '#3B5998',
  googlePlus: '#DD4B39',
  inactiveSwitch: 'rgba(0, 0, 0, 0.38)',
  activeSwitch: 'rgba(222, 60, 75, 0.54)',
  random: randomColorBtnMeme
};

function randomColorBtnMeme(num) {
  switch (num) {
    case 0:
      return '#EA2027';
    case 1:
      return '#1e90ff';
    case 2:
      return '#964b00';
    default:
      return '#EA2027';
  }
}
