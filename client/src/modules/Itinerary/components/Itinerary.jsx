import { Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFeedback } from "../../Shared/hooks/useFeedback";

function Itinerary() {
  // #region navigation/location
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const [itinerary, setItinerary] = useState({});

  const { setErrorMessage, setSuccessMessage } = useFeedback();
  // #endregion

  // #region useEffects
      useEffect(() => {
      if (id > 0 && !isNaN(id)) {
          //loadItinerary(id);
      } else {
          setErrorMessage("Invalid ID provided.");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      // #endregion

  return (  
    <Typography level="h1" sx={{ textAlign: 'center', mt: 4 }}>
      Itinerary ID: {id}
    </Typography>
  );
}

export default Itinerary;
