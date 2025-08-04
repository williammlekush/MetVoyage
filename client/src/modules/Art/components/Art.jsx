import { useLocation } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import ArtCard from "./ArtCard";

function Art({ userId }) {
  // #region navigation/location
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  // #endregion

  return (  
    <ArtCard id={id} user={{ id: userId, fav: 33 }} />
  );
}

export default Art;
