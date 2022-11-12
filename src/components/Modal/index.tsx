import React, { Fragment, FC, PropsWithChildren } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";

type IModalProps = PropsWithChildren<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}>;

const Modal: FC<IModalProps> = ({ setOpen, open, children }) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        handler={setOpen}
        size="xl"
        className="bg-indigo-900 min-w-[25%] md:max-w-[35%] lg:max-w-[20rem]"
      >
        <DialogFooter>
          <IconButton
            onClick={() => setOpen(!open)}
            color="red"
            className="mr-1"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </IconButton>
        </DialogFooter>
        <DialogBody>{children}</DialogBody>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
