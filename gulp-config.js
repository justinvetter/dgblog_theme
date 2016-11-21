var src = './src';
var dist = './dist';
var temp = './.tmp';
var styles = '/assets/styles';
var scripts = '/assets/scripts';
var fonts = '/assets/fonts';
var images = '/assets/images';
var video = '/assets/video';
var gtm = 'GTM-TLZR2G';
var proxy = 'http://blog.digitalglobe:8888/';



module.exports ={
  src: src,
  watchSrc: src.substr(2),
  dest: dist,
  temp: temp,
  serverDest: temp,
  serverProxy: proxy,
  styles: styles,
  scripts: scripts,
  fonts: fonts,
  images: images,
  video: video,
  gtm: gtm
}