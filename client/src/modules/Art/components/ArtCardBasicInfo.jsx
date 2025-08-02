import { CardContent, Tooltip, Typography } from "@mui/joy";
import { Person } from "@mui/icons-material";
import capitalize from "../../Shared/utils/stringHelpers";

function ArtCardBasicInfo({ art, artist }) {
    const artistCaption =
        capitalize((artist.artist_prefix ? artist.artist_prefix + " " : "") + artist.name);

    return (
        <>
            <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography level="h3" color="primary">
                    {art.title ? art.title : "No title on record."}
                </Typography>
                <Typography
                    startDecorator={
                        <Tooltip title={artistCaption}><Person /></Tooltip>
                    }
                    level="h5"
                    color="neutral"
                >
                    {artist.id ? artist.name : "No artist on record."}
                </Typography>
            </CardContent>
        </>
    )
}

export default ArtCardBasicInfo;