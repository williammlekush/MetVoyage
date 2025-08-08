import { Divider, Stack } from "@mui/joy";
import Header from "../../Header/components/Header";
import Search from "../../Seach/components/Search";
import ItineraryList from "../../Itinerary/components/ItineraryList";

export default function Overview() {
  return (
    <Stack direction="column" spacing={2}>
      <Header />
      <ItineraryList />
      <Divider sx={{ "--Divider-childPosition": "5%" }}>
        Discover the Met Collection
      </Divider>
      <Search />
    </Stack>
  );
}
