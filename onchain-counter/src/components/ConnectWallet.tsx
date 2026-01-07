/* eslint-disable */
import React, { useEffect, useState } from "react";
import { ccc } from "@ckb-ccc/connector-react";
import { truncateAddress } from "../utils/stringUtils";

const ConnectWallet: React.FC = () => {
  const { open, disconnect } = ccc.useCcc();
  const signer = ccc.useSigner();

  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (!signer) {
      setAddress("");
      return;
    }

    (async () => {
      const addr = await signer.getRecommendedAddress();
      setAddress(addr);
    })();
  }, [signer]);

  return (
    <div className="p-4">
      {!signer ? (
        <button className="border rounded px-2 bg-blue-800 hover:bg-blue-900" onClick={open}>
          Connect Wallet
        </button>
      ) : (
        <>

         <button className="border rounded md:px-11 px-4 md:mr-16 mr-12 bg-red-700 hover:bg-red-900" onClick={disconnect}>
            Disconnect
          </button>
        <div className="flex mt-3">
          <p className="text-green-600 mr-2">Wallet Connected:</p>
          <p className=""> {truncateAddress(address)}</p>
          </div>
          
        </>
      )}      

      <hr className="mt-9" />
    </div>

    
  );
};

export default ConnectWallet;
