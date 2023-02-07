import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { modalStyle } from "../shared/constants";

interface Props {
    open: boolean;
    onClose: () => void;
    children: JSX.Element;
}

export const ModalSkeleton: React.FC<Props> = ({ open, onClose, children }) => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...modalStyle, minWidth: 250, padding: 0 }}>{children}</Box>
        </Fade>
      </Modal>
    );
  };