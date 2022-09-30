import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useContract, useProvider, erc721ABI } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "../constants/contractABI";
import { ethers } from "ethers";

function Form() {
  const { register, handleSubmit, errors, reset } = useForm();

  const { address } = useAccount();

  const [price, setPrice] = useState("");
  const [uri, setUri] = useState("");

  function onSubmitForm(values) {
    const { price, ipfs } = values;

    setPrice(price.toString());
    setUri(ipfs.toString());
  }

  const { config } = usePrepareContractWrite({
    addressOrName: "0xcf5c9BAb07D7F63847348F4B4e06F2e7bdcAB240",
    contractInterface: abi,
    functionName: "safeMint",
    args: ["0x95a548A77f41d64f5F0d6905f8F9CD3aeFe972A9", uri],
    chainId: 5,
    overrides: {
      from: "0x95a548A77f41d64f5F0d6905f8F9CD3aeFe972A9",
      value: ethers.utils.parseEther("0.01"),
      // value: ethers.utils.parseEther(price),
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
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="m-2">
                {/* name field */}
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
                      {...register("price", {
                        required: "Required",
                      })}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                {/* email field */}
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
                      {...register("ipfs", {
                        required: "Required",
                        message: "testing",
                      })}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                {/* button field */}
                <div className="p-2 w-full">
                  <button
                    onClick={() => safeMint?.()}
                    className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none border-blue-600 rounded text-lg"
                  >
                    Mint
                  </button>
                </div>
                {/* footer field */}
                {/* <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-indigo-500">example@email.com</a>
                <p className="leading-normal my-5">
                  49 Smith St.
                  <br />
                  Saint Cloud, MN 56301
                </p>
                <span className="inline-flex">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Form;
