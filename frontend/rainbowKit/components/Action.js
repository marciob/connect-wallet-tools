import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount, useContract, useProvider, erc721ABI } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "../constants/contractABI";
import { ethers } from "ethers";

function Action(props) {
  const { register, handleSubmit, errors, reset } = useForm();

  const { address } = useAccount();

  const [price, setPrice] = useState(0.01);
  const [uri, setUri] = useState("");

  function onSubmitForm(values) {
    const { price, ipfs } = values;

    setPrice(price);
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
      value: ethers.utils.parseEther(props.myData.toString()),
    },
  });

  const {
    write: safeMint,
    data,
    isLoading,
    isSuccess,
  } = useContractWrite(config);

  return (
    <>
      <button
        onClick={(event) => {
          //   console.log("onclick safemint clicked. current state price :", price);
          //   var x = document.getElementsByName("price");
          //   console.log("validation ", x);
          //   console.log("event for onclick :", event);
          //   safeMint?.();

          console.log("my passed props: ", props);
          console.log("get from function: ", props.myDataF);
        }}
        className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none border-blue-600 rounded text-lg"
      >
        Mint
      </button>
    </>
  );
}

export default Action;
