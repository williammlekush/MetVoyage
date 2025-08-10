import { Box, Button, IconButton } from "@mui/joy";
import { ArrowDropUp, ArrowDropDown, Close } from "@mui/icons-material";
import { useForm, useFieldArray } from "react-hook-form";
import ArtCardMini from "../../Art/components/ArtCardMini";

function ItineraryForm({ objects, isEditEnabled, handleSave }) {

    const { control, handleSubmit } = useForm(
            {defaultValues: { obj: objects.map(object => ({ ...object, objectId: object.id, isExpanded: false }))
        }});

    const {fields, remove, move, update } = useFieldArray({
        control,
        name: "obj",
    });

    const toggleExpand = (index) => {
        update(index, { ...fields[index], isExpanded: !fields[index].isExpanded });
    };

    return (
        <form onSubmit={handleSubmit(data => handleSave(data.obj.map(o => (o.objectId))))}>
            {fields.length > 0 && fields.map((field, index) => (
                <ArtCardMini
                    key={index}
                    object={field}
                    toggleExpanded={() => toggleExpand(index)}
                    actionChild={isEditEnabled && (
                        <Box sx={{ display: "flex", direction: "row", alignItems: "center", gap: 1 }}>
                            <IconButton
                                variant="solid"
                                color="neutral"
                                onClick={() => move(index, index - 1)}
                                disabled={index === 0}
                            >
                                <ArrowDropUp />
                            </IconButton>
                            <IconButton
                                variant="solid"
                                color="neutral"
                                onClick={() => move(index, index + 1)}
                                disabled={index === fields.length - 1}
                            >
                                <ArrowDropDown />
                            </IconButton>
                            <IconButton
                                variant="soft"
                                color="danger"
                                onClick={() => remove(index)}
                            >
                                <Close />
                            </IconButton>
                        </Box>
                    )} 
                />
            ))}
            {isEditEnabled && 
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button
                        variant="solid"
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                </Box>
            }
        </form>
    );
};

export default ItineraryForm;