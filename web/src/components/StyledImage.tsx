import { useState } from 'react';
import { CircularProgress } from '@mui/material';

const StyledImage: React.FC<{ src: string; alt: string, width?: string, height?: string }> = ({ src, alt, width, height }) => {
  const [isLoading, setIsLoading] = useState(true);

  const imageStyle = {
    width: width || '300px',
    height: height || '150px',
    display: isLoading ? 'none' : 'block',
    border: '1px solid #FFF',
    borderRadius: '4px',
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: width || '300px', height: height || '150px' }}>
      {isLoading && <CircularProgress size={24} />}
      <img
        src={src}
        alt={alt}
        style={imageStyle}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
};

export default StyledImage;
