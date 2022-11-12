import React, { useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Alert,
} from "@material-tailwind/react";

const DeployAccount = () => {
  const [deployError, setDeployError] = useState();
  const DeployStatusElement = (status: string): JSX.Element => {
    if (status === "error")
      return (
        <Alert color="red" className="px-3">
          An Error Occured While deploying wallet.
        </Alert>
      );
    return (
      <Alert color="blue" className="px-3">
        Unknown Error occured please try again or create an issue.{" "}
        <span className="text-blue-900">
          <a href="https://github.com/peteruche21/inst-paymaster/issues">
            here
          </a>
        </span>
      </Alert>
    );
  };
  return (
    <div className="text-center m-auto">
      {deployError && DeployStatusElement(deployError)}
      you have not deployed any smart-contract wallet. Click the buttons below
      to deploy one or recover an existing wallet
      <div className="flex justify-between p-4">
        <Button variant="gradient" className="px-3" color="teal">
          Deploy Wallet
        </Button>
        <Popover>
          <PopoverHandler>
            <Button variant="gradient" className="px-3" color="red">
              Recover Wallet
            </Button>
          </PopoverHandler>
          <PopoverContent>Account recovery not yet surpported.</PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DeployAccount;
