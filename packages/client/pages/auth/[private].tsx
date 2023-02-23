import { NextPage } from "next";
import { Auth } from "../../components";
import { LandingPage } from "../../components";
import { LandingPageLayout } from "../../components";

interface ID {
  authId?: string;
}

const PrivateRoute: NextPage<ID> = ({ authId }) => {
  return (
    <LandingPageLayout>
      <LandingPage />
    </LandingPageLayout>
  );
};

PrivateRoute.getInitialProps = async ({ query }) => {
  const id = query.private as string;
  return {
    authId: id,
  };
};

export default Auth(PrivateRoute);
