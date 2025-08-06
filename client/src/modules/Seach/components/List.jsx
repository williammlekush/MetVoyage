import { useEffect } from "react";
import { CircularProgress, Stack, Typography } from "@mui/joy";
import { useSearch } from "../hooks/useSearch";
import ArtCard from "../../Art/components/ArtCard";

export default function List() {
  const { objects, search, searchIsPending } = useSearch();

  useEffect(() => {
    if (!objects.length) search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return searchIsPending ? (
    <CircularProgress size="lg" variant="plain" />
  ) : (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={2}
      useFlexGap
      justifyContent="center"
    >
      {objects.length ? (
        objects.map((object) => {
          const art = {
            id: object.id,
            title: object.title,
            artist: object.artist,
            url: object.url,
            publicCaption: object.public_caption,
            date: object.date,
            medium: object.medium,
            dimensions: object.dimensions,
            classification: object.classification,
            credit_line: object.credit_line,
            number: object.number,
            country: object.country,
            region: object.region,
            period: object.period,
            dynasty: object.dynasty,
            reign: object.reign,
            culture: object.culture,
            locale: object.locale,
            favoriteCount: object.favorite_count,
            itineraryCount: object.itinerary_count,
          };

          const artist = {
            id: object.artist_id,
            name: object.artist_name,
            nationality: object.artist_nationality,
            begin_date: object.artist_begin_date,
            end_date: object.artist_end_date,
            artist_prefix: object.artist_prefix,
          };

          return (
            <ArtCard art={art} artist={artist} isPending={searchIsPending} />
          );
        })
      ) : (
        <Typography level="body-xs">No results found</Typography>
      )}
    </Stack>
  );
}
