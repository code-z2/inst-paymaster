import React from "react";
import { NextPage } from "next";
import { LandingPage } from "..";

/* HOC for authentication using private id
 * @params PrivateComponent
 */

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
