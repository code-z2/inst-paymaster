import { Fragment, useState, FC, PropsWithChildren } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

type IModalProps = PropsWithChildren<{
  callback: () => void;
  isOpen: boolean;
}>;

const Modal: FC<IModalProps> = ({ callback, isOpen = false, children }) => {
  const [open, setOpen] = useState(isOpen);

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogBody divider>{children}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={callback}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
