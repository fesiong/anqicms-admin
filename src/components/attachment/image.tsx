import { Avatar, Image, ImageProps } from 'antd';
import React from 'react';
import './index.less';

const ImageItem: React.FC<
  ImageProps & { isImage?: boolean; timestamp?: any; size?: any }
> = (props) => {
  const isImage =
    props.isImage ||
    props.src?.endsWith('.png') ||
    props.src?.endsWith('.jpg') ||
    props.src?.endsWith('.jpeg') ||
    props.src?.endsWith('.gif') ||
    props.src?.endsWith('.svg') ||
    props.src?.endsWith('.webp') ||
    props.src?.endsWith('.ico') ||
    props.src?.endsWith('.bmp') ||
    props.src?.endsWith('.tiff') ||
    props.src?.endsWith('.tif');
  return isImage ? (
    <Image
      width={'100%'}
      className="img"
      preview={{
        src: props.src + '?t=' + props.timestamp,
      }}
      src={props.src + '?t=' + props.timestamp}
      alt={props.alt}
    />
  ) : (
    <Avatar className="default-img" size={props.size || 200} alt={props.alt}>
      {props.src?.substring(props.src?.lastIndexOf('.')).toUpperCase()}
    </Avatar>
  );
};

export default ImageItem;
