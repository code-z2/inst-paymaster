import React from "react";
import { NextPage, NextComponentType, NextPageContext } from "next";
import LandingPage from "../landingpage/landing";

function Private(PrivateComponent: NextPage) {
  const Protected: NextPage = (props: any) => {
    const { authId } = props;

    if (authId !== process.env.NEXT_PUBLIC_AUTH_ID) {
      return <LandingPage />;
    }

    return <PrivateComponent {...props} />;
  };

  if (PrivateComponent.getInitialProps) {
    Protected.getInitialProps = PrivateComponent.getInitialProps;
  }

  return Protected;
}

export default Private;
