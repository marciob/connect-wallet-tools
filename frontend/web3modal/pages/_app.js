import "../styles/globals.css";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Connector from "../components/Connector";
// import { ConfigOptions } from "@web3modal/react";
// import { Web3ModalProvider } from "@web3modal/react";

// const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

// const WEB3_PROJECT_ID = process.env.NEXT_PUBLIC_WEB3_PROJECT_ID;

// const providerOptions = {};

// const config = {
//   projectId: WEB3_PROJECT_ID,
//   theme: "dark",
//   accentColor: "default",
//   ethereum: {
//     appName: "web3Modal",
//   },
// };

function MyApp({ Component, pageProps }) {
  return (
    <Connector>
      <Component {...pageProps} />
    </Connector>
  );
}

export default MyApp;
