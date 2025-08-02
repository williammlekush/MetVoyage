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
    <CssVarsProvider sx={{ margin: 6, maxWidth: "100vw", p: 2 }}>
        <ArtCard id={id} user={{ id: userId, fav: 33 }} />
    </CssVarsProvider>
  );
}

export default Art;
