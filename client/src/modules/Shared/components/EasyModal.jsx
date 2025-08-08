import { Button, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy';

function EasyModal({ title, body, buttonText, buttonProps, isOpen, onClose, buttonAction }) {

    const handleClick = () => {
        buttonAction();
        onClose();
    };

    return (
        <Modal open={isOpen}>
            <ModalDialog>
                <ModalClose onClick={onClose} />
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {body}
                        <Button {...buttonProps} onClick={handleClick}>
                            {buttonText}
                        </Button>
                    </Stack>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}

export default EasyModal;