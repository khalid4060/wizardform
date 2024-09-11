import React, { useState } from 'react';
import ss from './CustomImage.module.scss';

const CustomImage = ({
  src,
  primeryClass,
  alt = 'image',
  fallbackSrc = '',
  className = '',
  style = {},
  loader = <p>Loading...</p>,
  errorMessage = <p>Image failed to load.</p>,
  ...rest
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={className}>
      {!imageLoaded && !imageError && loader}
      {imageError ? (
        fallbackSrc ? (
          <img src={fallbackSrc} alt={alt} className={primeryClass} />
        ) : (
          errorMessage
        )
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={primeryClass}
          {...rest}
        />
      )}
    </div>
  );
};

export default CustomImage;
