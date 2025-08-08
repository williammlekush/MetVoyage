import { useEffect } from "react";
import { Button, CircularProgress, Sheet, Stack, Typography } from "@mui/joy";
import { useSearch } from "../hooks/useSearch";
import ArtCard from "../../Art/components/ArtCard";

const RESULT_INCREMENT = 21;

export default function List() {
  const { objects, search, searchIsPending } = useSearch();

  useEffect(() => {
    if (!objects.length) search({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "120px", marginTop: 2 }}>
      {searchIsPending && (
        <Sheet
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "lg",
            background: "rgba(24, 94, 165, 0.05)",
            overflow: "hidden",
          }}
        >
          <CircularProgress size="lg" variant="plain" />
        </Sheet>
      )}
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={2}
        useFlexGap
        justifyContent="center"
        marginTop={2}
      >
        {objects.length ? (
          objects.map((object) => {
            const art = {
              id: object.id,
              title: object.title,
              artist: object.artist,
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

            const images = object.images;
            const artists = object.artists;

            return (
              <ArtCard
                art={art}
                images={images}
                artists={artists}
                isPending={searchIsPending}
              />
            );
          })
        ) : searchIsPending ? (
          <></>
        ) : (
          <Typography level="body-xs">No results found</Typography>
        )}
      </Stack>
      {!!objects.length && objects.length % RESULT_INCREMENT === 0 && (
        <Button
          onClick={() => search({ resetCache: false })}
          loading={searchIsPending}
          sx={{ width: "100%", marginY: 2 }}
        >
          Load More
        </Button>
      )}
    </div>
  );
}
