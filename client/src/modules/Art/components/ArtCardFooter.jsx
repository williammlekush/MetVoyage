import { CardContent, CardOverflow, Divider, IconButton, Tooltip, Typography } from "@mui/joy";
import { KeyboardDoubleArrowRight, KeyboardDoubleArrowLeft, Loyalty, PlaylistAddCheckCircle} from "@mui/icons-material";


function ArtCardFooter({ art, expanded, setExpanded }) {
    return (
        <CardOverflow variant="soft">
            <Divider inset="context" />
            <CardContent orientation="horizontal">
                <Typography 
                    startDecorator={
                        <Tooltip title="Number of users who have favorited this artwork">
                            <Loyalty />
                        </Tooltip>
                    }
                    level="body-xs"
                >
                    {art.favoriteCount || 0}
                </Typography>
                <Divider orientation="vertical" />
                <Typography startDecorator={
                        <Tooltip title="Number of users who have this artwork on their itinerary">
                            <PlaylistAddCheckCircle />
                        </Tooltip>
                    }
                    level="body-xs"
                >
                    {art.itineraryCount || 0}
                </Typography>
                {expanded !== undefined &&
                    <IconButton
                        aria-label="Artist Info"
                        title="Artist Info"
                        onClick={() => setExpanded(!expanded)}
                        size="md"
                        variant="soft"
                        color="neutral"
                        sx={{ position: 'absolute', bottom: 3, right: 3, zIndex: 10 }}
                    >
                        {expanded ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                    </IconButton>
                }
            </CardContent>
        </CardOverflow>
    )
}

export default ArtCardFooter;