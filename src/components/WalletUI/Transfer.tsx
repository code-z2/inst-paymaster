import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Eth } from "@web3uikit/icons";

const Transfer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Card className="m-auto">
      <CardHeader
        floated={false}
        variant="gradient"
        color="white"
        className="grid h-12 place-items-center shadow-none"
      >
        <Typography variant="h5" color="blue" className="px-4">
          Transfer ETH
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Input
            placeholder="0x...."
            size="lg"
            type="text"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Amount"
            size="lg"
            type="text"
            icon={<Eth />}
            {...register("token-address", {
              required: true,
            })}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth type="submit">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Transfer;
