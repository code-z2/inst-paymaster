import { NextPage } from "next";
import { Auth } from "../../components";

interface ID {
  authId?: string;
}

const PrivateRoute: NextPage<ID> = ({ authId }) => {
  return (
    <div>
      <h2>Private route</h2>
    </div>
  );
};

PrivateRoute.getInitialProps = async ({ query }) => {
  const id = query.private as string;
  return {
    authId: id,
  };
};

export default Auth(PrivateRoute);
