import { Button } from "@mui/joy";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import ArtCardMini from "../../Art/components/ArtCardMini";

function ItineraryForm( { objects } ) {

    const { setSuccessMessage } = useFeedback();

    return (
        <>
            {objects.length > 0 && objects.map((object) => (
                <ArtCardMini
                    key={object.id}
                    object={object}
                    actionChild={
                        <Button
                            variant="soft"
                            color="neutral"
                            onClick={() => setSuccessMessage("TODO: Real Actions")}
                        >
                            Actions
                        </Button>
                    }
                />
            ))}
            <Button
                variant="solid"
                color="primary"
                onClick={() => setSuccessMessage("TODO: Actually Save Itinerary")}
            >Save</Button>
        </>
    );
};

export default ItineraryForm;