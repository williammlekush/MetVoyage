import { useLocation } from "react-router-dom";
import ArtCard from "./ArtCard";
import { useCallback, useEffect, useState } from "react";
import { getArt, getArtAggregateData, getArtist } from "../api";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";

export default function Art() {
  // #region navigation/location
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  // #endregion

  // #region state
  const [art, setArt] = useState({});
  const [artist, setArtist] = useState({});

  // #endregion

  // #region API calls
  const { call, isPending } = usePending();

  // Track loading state separately to link API calls
  const { setErrorMessage } = useFeedback();

  const loadArt = useCallback(
    async (id) => {
      try {
        await call(() => getArt(id))
          .then(async (artResponse) => {
            const artData = artResponse.data[0][0];

            await call(() => getArtAggregateData(id))
              .then((artAggregateResponse) => {
                if (artAggregateResponse.status === 200) {
                  artData.favoriteCount =
                    artAggregateResponse.data[0][0].favorite_count;
                  artData.itineraryCount =
                    artAggregateResponse.data[0][0].itinerary_count;
                }
              })
              .catch((error) => {
                setErrorMessage(error);
              });

            setArt(artData);

            // Use artData directly here
            if (artData) {
              await call(() => getArtist(id))
                .then((artistResponse) => {
                  if (artistResponse.status === 200) {
                    setArtist(artistResponse.data[0][0]);
                  } else {
                    setErrorMessage("No artist found :-(");
                  }
                })
                .catch((error) => {
                  setErrorMessage(error);
                });
            }
          })
          .catch(() => {
            setErrorMessage(`Art ID ${id} not found :-(`);
          });
      } catch (error) {
        setErrorMessage(error);
      }
    },
    [call, setErrorMessage]
  );
  // #endregion

  // #region useEffects
  useEffect(() => {
    if (id > 0 && !isNaN(id)) {
      loadArt(id);
    } else {
      setErrorMessage("Invalid ID provided.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // #endregion

  return <ArtCard art={art} artist={artist} isPending={isPending} />;
}
