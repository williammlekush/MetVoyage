import { CardContent, Stack, Button } from "@mui/joy";
function ArtCardImageSelector({ images, selectedImgIndex, setSelectedImageIndex }) {

    return (
        <CardContent
            sx={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            }}
        >
            <Stack direction="row" spacing={1}>
            {images.map((image, index) => (
                <Button
                key={index}
                color="primary"
                variant="soft"
                sx={{
                    width: 12,
                    height: 12,
                    padding: 0,
                    paddingBlock: 0,
                    paddingInline: 0,
                    minHeight: 0,
                    bgcolor:
                    index === selectedImgIndex ? "#4393E4" : "aliceblue",
                    borderRadius: "100%",
                    boxShadow: "0 0 2px 1px grey",
                }}
                onClick={() => setSelectedImageIndex(index)}
                />
            ))}
            </Stack>
        </CardContent>
    );
};

export default ArtCardImageSelector;