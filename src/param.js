// 获取图片尺寸
const getSize = (str) => {
  // 不传入尺寸，返回原图
  if (!str) return '';

  const index = str.indexOf('*');
  let size = 'thumbnail/';

  // 只指定宽度，等比缩放
  if (index === -1) {
    size += `${str}x/`;

  // 指定宽高，cover 切图
  } else {
    const cover = str.slice(0, index) + 'x' + str.slice(index + 1);
    size += `!${cover}r/gravity/Center/crop/${cover}/`;
  }

  return size;
};

const getParam = (quality, format, size) => `?imageMogr/quality/${quality}/format/${format}/` + getSize(size);

export default getParam;
