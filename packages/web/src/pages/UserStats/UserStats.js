import React from "react";

// !
import { Elements } from "../../components/elements";
// !
const UserStats = () => {
  const { Button, Title, Label, Input, ErrorMsg, Card } = Elements;

  return (
    <>
      <div>
        <Label>Your favourite </Label>
        <div className="flex">
          <div className="flex-auto p-4 ">
            <img src="/images/logo.png" className="light" alt="logo" />
          </div>
          <div className="flex-auto p-4 ">
            <img src="/images/logo.png" className="light" alt="logo" />
          </div>
          <div className="flex-auto p-4 ">
            <img src="/images/logo.png" className="light" alt="logo" />
          </div>
        </div>

        <Label>Followed</Label>
        <div className="flex  ">
          <div className="flex-auto p-4 ">
            <img src="/images/logo.png" className="light" alt="logo" />
          </div>
          <div className="flex-auto p-4 ">
            <img src="/images/logo.png" className="light" alt="logo" />
          </div>
          <div className="flex-auto p-4 ">
            <img src="/images/logo.png" className="light" alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStats;
