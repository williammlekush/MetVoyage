import { Grid, Typography} from "@mui/joy";

function MetadataItem({ label, value }) {
  return (
    <Grid container spacing={2} textAlign="left">
      <Grid item xs={5}>
        <Typography level="body-xs">{label}:</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography level="body-xs" color="neutral">
          {value ? value : "No data available."}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MetadataItem;
