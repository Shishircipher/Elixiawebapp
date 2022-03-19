import React from "react";
import { useEffect, useState } from "react";
import {sha256} from "js-sha256";
import {
  //helloWorldContract,
  connectWallet,
  findDocHash,
  addDocHash,
  getCurrentWalletConnected,
  
} from "./util/interact.js";

//import alchemylogo from "./alchemylogo.svg";
//import logo from "./logo.png";




const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  //const [message, setMessage] = useState("No connection to the network."); //default message
  const [stat, setstat] = useState("");
  
  const[newMessage, setNewMessage] = useState("");
  
  const [newMessaged, setNewMessaged] = useState("");
  //called only once
  useEffect(async () => {
    //const message = await loadCurrentMessage();
    async function fetchWallet() {
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
       
    }
    fetchWallet();
    addWalletListener();
    setstat(stat);
    

    

    
  }, []);
  

  

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          //setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onUpdatePressed = async () => {
    const { status } = await addDocHash(walletAddress, newMessage);
    setStatus(status);
  };
  
  const onUpdatePressedd = async () => {
    
    const { stat } = await findDocHash(newMessaged);
    setstat(stat);
  };
  const onChange = (e) => {
    //let files = e.target.files[0];
    let fr = new FileReader();
    
    fr.readAsArrayBuffer(e.target.files[0])

    //reader.readAsDataURL(files[0]);
    fr.onload = (e) => {
      let content = e.target.result;
      //console.log(content);
      var hash = sha256(content);

      
      console.log(hash);
      let newMess  = "0x" + hash;
      console.log(newMess);
      newMess.toString();
      console.log(newMess);

      setNewMessage(newMess);
      setNewMessaged(newMess);
      
    };
    
    
  };
  
    

      
  
    
    

  
  


  // the UI of our component
  return (

     <div class="login-box">
    
      <h2>Elixia</h2>
      
      
      
      <div class="user-box">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      
      
        <input
          type="file" required
          placeholder="Update the message in your smart contract."
          onChange={onChange}
          //value={newMessage}
        />
        
        <button id="publishButton" onClick={onUpdatePressed}>
          Add Document
        </button>
      
      <p id="status">{status}</p>
      </div>
      <div class="user-box">


      
        <input
          type="file" required
          placeholder="Update the message in your smart contract."
          onChange={onChange}
          //value={newMessage}
        />
        <p id="status">{stat}</p>
        <button id="publishButton" onClick={onUpdatePressedd}>
          Verify Document
        </button>
      
      </div>
      
    </div>
    
  );

};


export default HelloWorld;
