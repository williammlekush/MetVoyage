import { Autocomplete, Button, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy';
import { useState } from 'react';

function ShareModal({ isOpen, onClose, onShare, userOptions }) {

    const [user, setUser] = useState(null);

    const handleShare = () => {
        onShare(user);
        onClose();
    };

    return (
        <Modal open={isOpen}>
            <ModalDialog>
                <ModalClose onClick={onClose} />
                <DialogTitle>Share Itinerary</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography>
                            Select a user to share this itinerary with.
                        </Typography>
                        <Autocomplete
                            options={userOptions}
                            getOptionLabel={(option) => option.userName}
                            onChange={(event, newValue) => {
                                setUser(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="User" />}
                        />
                        <Button variant="solid" color="primary" onClick={handleShare}>
                            Share
                        </Button>
                    </Stack>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}

export default ShareModal;