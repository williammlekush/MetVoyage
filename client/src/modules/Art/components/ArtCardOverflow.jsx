import { CardOverflow} from "@mui/joy";
import ArtImageLoader from "./ArtImageLoader";

function ArtCardOverflow({ art, isArtLoading, ButtonComponent }) {

    return (
            <CardOverflow sx={{ p: 0}}>
                <ArtImageLoader 
                    src={!isArtLoading 
                        ? (art.url ? art.url : "https://placehold.co/400x300?text=No+image+on+record")
                        : undefined}
                    alt={art.publicCaption}
                />
                {ButtonComponent ? <ButtonComponent /> : null}
            </CardOverflow>
    )
}

export default ArtCardOverflow;