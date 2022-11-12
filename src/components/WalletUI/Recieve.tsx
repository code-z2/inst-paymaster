import { Card } from "@material-tailwind/react";
import React from "react";
import QRCode from "react-qr-code";

export const Recieve = ({ address }: { address: string }) => {
  return (
    <Card className="mx-auto p-2 min-w-[15rem]">
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={address}
        viewBox={`0 0 256 256`}
      />
    </Card>
  );
};
