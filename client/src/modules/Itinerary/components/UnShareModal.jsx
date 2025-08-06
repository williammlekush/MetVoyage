import { Button, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy';

function UnShareModal({ isOpen, onClose, onUnShare, user }) {

    const handleUnShare = () => {
        onUnShare(user);
        onClose();
    };

    return (
        <Modal open={isOpen}>
            <ModalDialog>
                <ModalClose onClick={onClose} />
                <DialogTitle>Un-Share Itinerary</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography>
                            Are you sure you want to un-share this itinerary with {user?.userName}?
                        </Typography>
                        <Button variant="solid" color="danger" onClick={handleUnShare}>
                            Un-Share
                        </Button>
                    </Stack>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}

export default UnShareModal;