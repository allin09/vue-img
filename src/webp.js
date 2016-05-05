// 是否支持 webP
let canWebp = false;

const img = new Image();
img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
img.onload = () => {
  canWebp = true;
};

export { canWebp };
