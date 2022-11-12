import React, { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Loading from "../components/LoadingUI";
import { useAccount } from "wagmi";
import DeployAccount from "../components/DeployUI/Deploy";
import PaymasterForm from "../components/FormUI/Form";

const SyncWallet = () => {
  const { isConnected } = useAccount();
  return (
    <Card color="indigo" className="md:w-96 w-screen md:h-144 h-screen">
      <Suspense fallback={<Loading />}>
        <CardHeader
          floated={false}
          className="h-14 shadow-none bg-inherit mx-auto"
        >
          <ConnectButton chainStatus="icon" />
        </CardHeader>
        <CardBody className="flex h-full w-full">
          {/* card body logic */}
          {isConnected ? (
            <PaymasterForm />
          ) : (
            <Typography className="h-fit">wallet is offline ...</Typography>
          )}
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Typography className="inline-flex space-x-2">
            with
            <span>
              <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            by
            <a
              href="https://twitter.com/peteranyaogu"
              className="text-blue-500"
            >
              peso
            </a>
          </Typography>
        </CardFooter>
      </Suspense>
    </Card>
  );
};

export default SyncWallet;
