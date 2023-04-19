import Web3 from "web3";
import { useState } from "react";
import { useWallet, UseWalletProvider } from "use-wallet";

import "./App.scss";
import logo_black from "./img/logo_cloak_black.png";
import qrcode from "./img/qrcode.png";

const tabs = ["Deposit CLOAK", "Withdraw wCLOAK", "History", "Farming"];

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const wallet = useWallet();

  const onConnect = () => {
    console.log("OnConnected");
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function () {
          wallet.connect();
        });
      } catch (e) {
        console.log("connection error");
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
    }
  };

  return (
    <>
      {wallet.status === "connected" ? (
        <>
          <div className="App-header">
            <img width={200} className="cloak-logo" src={logo_black} />
            <h1>Wrapped Cloak Coin Bridge</h1>
          </div>
          <div className="tabs">
            <ul className="tabs-nav">
              {tabs.map((it, index) => {
                return (
                  <li className={activeTab === index ? "active" : ""} onClick={() => setActiveTab(index)}>
                    <a>{it}</a>
                  </li>
                );
              })}
            </ul>
            <div className="tabs-stage">
              <div className="tabs-content" id="tab-1" style={{ display: activeTab === 0 ? "flex" : "none" }}>
                <p>Your current balance : 0 wCLOAK</p>
                <img
                  width={128}
                  className="cloak-qr"
                  src={qrcode}
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                />
                <p>Your CLOAKcoin deposit address: </p>
                <p>CkBHXydPVNRbBdEEG2KXWLFtQwbqc2odPS </p>
                <p style={{ marginTop: "1rem" }}>Coins sent to this address will be swapped automatically to wCLOAK.</p>
                <p>A fee will be deducted to cover the gas costs for minting.</p>
                <p style={{ marginTop: "1rem" }}>
                  Estimated gas cost: 1 CLOAK. Deposits smaller than this amount will be considered lost and won't be
                  credited.
                </p>
                <a href="" style={{ marginTop: "2rem" }}>
                  Add token to Metamask
                </a>
              </div>
              <div className="tabs-content" id="tab-2" style={{ display: activeTab === 1 ? "flex" : "none" }}>
                <p>Amount to swap</p>
                <input className="withdraw-input" placeholder={"wCLOAK amount"} />
                <p>
                  You will receive: <strong>0 wCLOAK</strong>
                </p>
                <p>
                  Available balance: <strong>0 wCLOAK</strong>
                </p>
                <br />
                <p>Withdraw to:</p>
                <input className="withdraw-input" placeholder={"CLOAK address"} />
                <p>Address where you want to receive the CLOAK</p>
                <br />
                <button>SWAP</button>
              </div>
              <div className="tabs-content" id="tab-3" style={{ display: activeTab === 2 ? "flex" : "none" }}>
                <p>No transactions yet.</p>
              </div>
              <div className="tabs-content" id="tab-4" style={{ display: activeTab === 3 ? "flex" : "none" }}>
                <p>Coming soon ...</p>
              </div>
            </div>
          </div>
          <div className="App-footer">
            <p>
              Contract supply: <strong>0 wCLOAK</strong> - Cold storage supply: <strong>0 CLOAK</strong> - Pending
              withdrawls from cold storage: <strong>0 CLOAK</strong>
            </p>
            <p>
              Contract address: <strong>0x23853fde632616E7f3BBa4C7662b86A21A326A89</strong>
            </p>
            <p>
              Network: <strong>Binance Smart Chain Testnet</strong>
            </p>
            <br />
            <p style={{ fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>The CLOAK Core development team 2021 - Contact : </span>
              <a href="">&nbsp;info@cloakcoin.com</a>
            </p>
          </div>
        </>
      ) : (
        <div className="App">
          <div className="App-header"></div>
          <img width={200} className="cloak-logo" src={logo_black} />
          <h2 className="title">Wrapped CLOAK coin Bridge</h2>
          <button onClick={() => onConnect()}>CONNECT</button>

          <div className="App-footer">
            <p style={{ fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>The CLOAK Core development team 2021 - Contact : </span>
              <a href="">&nbsp;info@cloakcoin.com</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default () => (
  <UseWalletProvider
    chainId={56}
    connectors={{
      // This is how connectors get configured
      metamask: { dAppId: "my-dapp-id-123-xyz" },
    }}
  >
    <App />
  </UseWalletProvider>
);
