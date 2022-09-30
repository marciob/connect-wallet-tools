import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, erc721ABI } from "wagmi";

function Info() {
  const { address } = useAccount();
  const [walletInfo, setWalletInfo] = useState("");

  function getInfo() {
    setWalletInfo(resizeAddress(address));
  }

  function resizeAddress(_addr) {
    const initialStr = String(_addr).substring(0, 4);
    const lastStr = String(_addr).slice(-4);
    const entireResize = initialStr + "..." + lastStr;
    return entireResize;
  }

  useEffect(() => {
    getInfo();
  }, [walletInfo]);

  const resized = resizeAddress(address);

  return (
    <div className="m-6 md:hidden">
      <h1>Your wallet address: {walletInfo}</h1>
    </div>
  );
}

export default Info;
