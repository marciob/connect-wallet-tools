import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

const WEB3_PROJECT_ID = process.env.NEXT_PUBLIC_WEB3_PROJECT_ID;

const INFURA_KEY_URL = `https://goerli.infura.io/v3/${INFURA_KEY}`;

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Demo",
      infuraId: { 5: INFURA_KEY_URL },
    },
  },
};

export default function Connect(props) {
  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: "false",
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );

      console.log(web3ModalProvider);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>Connect</button>
    </div>
  );
}
