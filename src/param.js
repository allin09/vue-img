// get image size
const getSize = (str) => {
  // no size limit
  if (!str) return '';

  const index = str.indexOf('*');
  let size = 'thumbnail/';

  if (index === -1) {
    // only width
    size += `${str}x/`;
  } else {
    // both width and height
    const cover = str.slice(0, index) + 'x' + str.slice(index + 1);
    size += `!${cover}r/gravity/Center/crop/${cover}/`;
  }

  return size;
};

const getParam = (quality, format, size) => `?imageMogr/quality/${quality}/${format}` + getSize(size);

export default getParam;
