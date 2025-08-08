import { Grid, Typography } from "@mui/joy";

function MetadataItem({ label, value }) {
  return (
    <Grid container spacing={2} textAlign="left">
      <Grid xs={5}>
        <Typography level="body-xs">{label}:</Typography>
      </Grid>
      <Grid xs={7}>
        <Typography
          level="body-xs"
          color="neutral"
          sx={{
            fontStyle: value ? "normal" : "italic",
            opacity: value ? 1 : 0.6,
          }}
        >
          {value ? value : "No data"}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MetadataItem;
