import { Button } from "@mui/joy";
import { Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { formatDate } from "../../Shared/utils/stringHelpers";

function ItineraryListItem({ itinerary }) {
    const [hovered, setHovered] = useState(false);

    function getIcon() {
        return itinerary.isOwner && !itinerary.isPast ? <Edit fontSize="md" /> : <Visibility fontSize="md" />;
    }

  return (
    <Button
      variant="plain"
      color="soft"
      startDecorator={hovered ? getIcon() : null}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
      size="sm"
      sx={{
        borderRadius: "xl",
      }}
    >
      {formatDate(itinerary.date)}
    </Button>
  );
}

export default ItineraryListItem;