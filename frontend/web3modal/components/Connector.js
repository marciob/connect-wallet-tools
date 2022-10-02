import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

const WEB3_PROJECT_ID = process.env.NEXT_PUBLIC_WEB3_PROJECT_ID;

const INFURA_KEY_URL = `https://goerli.infura.io/v3/${INFURA_KEY}`;

function printsomething() {
  console.log("printing");
}

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Demo",
      infuraId: { 5: INFURA_KEY_URL },
    },
  },
};

function Connector(props) {
  return <div>{props.children}</div>;
}

export default Connector;
