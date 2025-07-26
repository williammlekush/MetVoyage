import {Grid} from '@mui/joy';

function MetadataItem({ label, value }) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <strong>{label}:</strong>
            </Grid>
            <Grid item xs={8}>
                {value ? value : "No data available."}
            </Grid>
        </Grid>
    );
}

export default MetadataItem;
