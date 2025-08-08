import { CardOverflow } from "@mui/joy";
import ArtImageLoader from "./ArtImageLoader";

function ArtCardOverflow({
  images,
  selectedIndex,
  isArtLoading,
  ButtonComponent,
}) {
  return (
    <CardOverflow sx={{ p: 0 }}>
      <ArtImageLoader
        src={
          !isArtLoading
            ? images[selectedIndex].url
              ? images[selectedIndex].url
              : "https://placehold.co/400x300?text=No+image+on+record"
            : undefined
        }
        alt={images[selectedIndex].caption}
      />
      {ButtonComponent ? <ButtonComponent /> : null}
    </CardOverflow>
  );
}

export default ArtCardOverflow;
