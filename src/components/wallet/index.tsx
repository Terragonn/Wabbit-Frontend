import { injected } from "./connectors";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

export default function Wallet() {
  const { active, activate, deactivate } = useWeb3React();

  const CONNECTED = "connected";

  useEffect(() => {
    const connected = localStorage.getItem(CONNECTED);
    if (connected && JSON.parse(connected) && !active) connect();
  }, []);

  //   **** HOW TO CHECK IF ON NETWORK AND HOW TO SWITCH NETWORK

  async function connect() {
    localStorage.setItem(CONNECTED, JSON.stringify(true));
    try {
      await activate(injected);
    } catch (e) {
      console.error(e);
    }
  }

  function disconnect() {
    localStorage.setItem(CONNECTED, JSON.stringify(false));
    deactivate();
  }

  return (
    <button
      className="bg-neutral-900 lg:px-12 px-8 lg:py-6 py-4 lg:text-3xl text-2xl rounded-xl text-white font-bold hover:bg-fuchsia-700 glow"
      onClick={(e) => {
        !active ? connect() : disconnect();
      }}
    >
      {!active ? "Connect" : "Disconnect"}
    </button>
  );
}
