import { CardOverflow, IconButton } from "@mui/joy";
import { MoreVert } from "@mui/icons-material";
import ArtImageLoader from "./ArtImageLoader";

function ArtCardOverflow({ art, isArtLoading, user, favoriteArt }) {

    return (
            <CardOverflow>
                <ArtImageLoader
                    src={!isArtLoading 
                        ? (art.url ? art.url : "https://placehold.co/400x300?text=No+image+on+record")
                        : undefined}
                    alt={art.publicCaption}
                />
                <IconButton
                    aria-label="Favorite Art"
                    title="Favorite Art"
                    onClick={favoriteArt}
                    size="md"
                    variant="soft"
                    color="neutral"
                    sx={{
                        position: 'absolute',
                        zIndex: 10,
                        borderRadius: '50%',
                        right: '1rem',
                        bottom: 0,
                        transform: 'translateY(50%)',
                    }}
                    disabled={user.fav === art.id}
                >
                    <MoreVert />
                </IconButton>
            </CardOverflow>
    )
}

export default ArtCardOverflow;