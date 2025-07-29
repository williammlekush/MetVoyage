import { useState } from "react";
import { Box, Skeleton } from '@mui/joy';

function ArtImageLoader({ src, alt }) {
    const [isLoading, setIsLoading] = useState(true);
    
  return (
    <Box sx={{ position: "relative", width: 400, height: 300 }}>
      <Skeleton loading={isLoading}>
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          sx={{
            width: "100%",
            height: "100%",
            display: isLoading ? "none" : "block"
          }}
        />
        </Skeleton>
      </Box>
  );
}
export default ArtImageLoader;