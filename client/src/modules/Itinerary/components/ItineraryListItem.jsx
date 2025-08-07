import { Button, CardContent, Tooltip } from "@mui/joy";
import { Edit, Visibility } from "@mui/icons-material";
import { useUser } from "../../Shared/hooks/useUser";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../Shared/utils/stringHelpers";

function ItineraryListItem({ itinerary }) {
    const [hovered, setHovered] = useState(false);

    const { user } = useUser();

    const navigate = useNavigate();

    const handleNavigate = useCallback((itineraryId) => {
        navigate(`/itinerary?id=${itineraryId}`);
    }, [navigate]);

    function getIcon() {
        return itinerary.owner_id === user.id && !itinerary.isPast
          ? <Edit fontSize="md" />
          : <Visibility fontSize="md" />;
    }

  return (
    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Tooltip title={itinerary.owner_id === user.id
          ? "Edit Your Itinerary"
          : "View " + itinerary.ownerName + "'s Itinerary"} placement="right">
        <Button
          variant="plain"
          color="soft"
          startDecorator={hovered ? getIcon() : null}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => handleNavigate(itinerary.id)}
          size="sm"
          sx={{
            borderRadius: "xl",
          }}
        >
          {formatDate(itinerary.date)}
        </Button>
      </Tooltip>
    </CardContent>
  );
}

export default ItineraryListItem;