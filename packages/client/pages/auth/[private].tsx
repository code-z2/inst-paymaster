import { NextPage } from "next";
import { Auth } from "../../components";
import { SecureLandingPage } from "../../components";

interface ID {
  authId?: string;
}

const PrivateRoute: NextPage<ID> = ({ authId }) => {
  return <SecureLandingPage />;
};

PrivateRoute.getInitialProps = async ({ query }) => {
  const id = query.private as string;
  return {
    authId: id,
  };
};

export default Auth(PrivateRoute);
