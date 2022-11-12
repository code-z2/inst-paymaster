import React, { FC } from "react";
import {
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { formatAddress } from "../../lib/formatAddress";

interface IProps {
  route: React.Dispatch<React.SetStateAction<string>>;
}

const Paymasters: FC<IProps> = ({ route }) => {
  const paymasters: { [key: string]: string }[] | undefined = [
    {
      logo: "logo",
      name: "Sync Wallet",
      address: "0x70E2D5aA970d84780D81a2c4164b984Abaa94527",
    },
  ];

  const setGlobalPaymaster = () => true;
  const renderList = (): JSX.Element[] => {
    return paymasters?.map((el, idx) => {
      return (
        <Card key={idx} className="flex flex-row justify-between">
          <Avatar src="/zkSync_logo.svg" alt="avatar" />
          <div className="w-full px-3 pt-1">
            <Typography variant="h6" className="text-left truncate">
              {el?.name}
            </Typography>
            <Typography
              color="blue"
              className="text-left truncate text-xs font-bold"
            >
              {formatAddress(el?.address)}
            </Typography>
          </div>
          <Typography
            as="button"
            onClick={setGlobalPaymaster}
            color="blue"
            className="pr-3"
          >
            {/* if global paymaster.address = el.address ? using : use*/}
            use
          </Typography>
        </Card>
      );
    });
  };
  return (
    <Card className="w-96 max-h-[100%] bg-inherit shadow-none">
      <div className="absolute z-10 p-2">
        <Tooltip content="go back">
          <IconButton onClick={() => route("account")}>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </IconButton>
        </Tooltip>
      </div>
      <CardHeader
        floated={false}
        variant="gradient"
        color="white"
        className="grid h-6 place-items-center shadow-none bg-inherit"
      >
        <Typography variant="h5" color="white" className="px-4">
          Paymasters
        </Typography>
      </CardHeader>
      <CardBody className="space-y-2 overflow-y-auto md:max-h-96 max-h-[78vh] px-0">
        {paymasters !== undefined ? (
          renderList()
        ) : (
          <div className="flex h-full m-auto text-white">
            no paymasters have be added yet. pay for your fees!
          </div>
        )}
      </CardBody>
      <div className="absolute bottom-3 right-3">
        <Tooltip content="Add your own paymaster">
          <IconButton onClick={() => route("newpaymaster")}>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </IconButton>
        </Tooltip>
      </div>
    </Card>
  );
};

export default Paymasters;
