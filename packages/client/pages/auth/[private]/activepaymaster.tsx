import { NextPage } from "next";
import { Auth } from "../../../components";
import { PaymastersList } from "../../../components";

interface ID {
  authId?: string;
}

const Activepaymaster: NextPage<ID> = ({ authId }) => {
  return <PaymastersList />;
};

Activepaymaster.getInitialProps = async ({ query }) => {
  const id = query.private as string;
  return {
    authId: id,
  };
};

export default Auth(Activepaymaster);
