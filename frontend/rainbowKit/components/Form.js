import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, erc721ABI } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "../constants/contractABI";
import { ethers } from "ethers";

function Form() {
  let { address } = useAccount();

  const [price, setPrice] = useState(0.001);
  const [uri, setUri] = useState("");

  const [inputData, setInputData] = useState({
    price: 0.001,
    ipfs: "",
  });

  function onSubmitForm(values) {
    const { price, ipfs } = values;

    setPrice(price.toString());
    setUri(ipfs.toString());
  }

  function updateOnChange(event) {
    console.log("values from onChange ", event.target.value);

    const { price, ipfs } = event.target.value;
  }

  function handleInputPrice(e) {
    e.preventDefault();
    console.log("handleInputPrice being called ", e.target.value);
    setPrice(e.target.value);
  }

  function handleInputIpfs(e) {
    e.preventDefault();
    console.log("handleInputIpfs being called ", e.target.value);
    setUri(e.target.value);
  }

  const { config } = usePrepareContractWrite({
    addressOrName: "0xcf5c9BAb07D7F63847348F4B4e06F2e7bdcAB240",
    contractInterface: abi,
    functionName: "safeMint",
    args: ["0x95a548A77f41d64f5F0d6905f8F9CD3aeFe972A9", uri], //change it later, not hard coded address
    chainId: 5,
    overrides: {
      from: "0x95a548A77f41d64f5F0d6905f8F9CD3aeFe972A9", //change it later, not hard coded address
      value: ethers.utils.parseEther(price.toString()),
    },
  });

  const {
    write: safeMint,
    data,
    isLoading,
    isSuccess,
  } = useContractWrite(config);

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Mint NFT
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Place your NFT price and metadata address (only CID).
              {isLoading && <div>Check Wallet</div>}
              {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            {/* form */}
            <form>
              <div className="m-2">
                {/* price field */}
                <div className="p-2 w-1/2 flex mx-auto">
                  <div className="mx-auto text-center">
                    <label
                      form="price"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="price"
                      name="price"
                      onBlur={handleInputPrice}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                {/* ipfs field */}
                <div className="p-2 w-1/2 flex mx-auto">
                  <div className="mx-auto text-center">
                    <label
                      form="ipfs"
                      className="leading-7 text-sm text-gray-600"
                    >
                      IPFS
                    </label>
                    <input
                      type="text"
                      id="ipfs"
                      name="ipfs"
                      onChange={handleInputIpfs}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                {/* button field */}
                <div className="p-2 w-full">
                  <button
                    onClick={(e) => {
                      console.log("onclick button clicked ");
                      e.preventDefault();

                      try {
                        safeMint?.();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none border-blue-600 rounded text-lg"
                  >
                    Mint
                  </button>
                </div>
                {/* footer field */}
                {/* <TheFoot /> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Form;
