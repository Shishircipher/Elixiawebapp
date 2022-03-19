require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 
const contractABI = require("../contract-abi.json");
const contractAddress = "0xbf78799b434f3983dd1418eff170ad3f4251666d";
//import {useState} from 'react';


export const helloWorldContract = new web3.eth.Contract(
    contractABI,
    contractAddress
  );
 
export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  
  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " ,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  
  export const addDocHash = async (address, newMessage) => {
    //input error handling
    if (!window.ethereum || address === null) {
      return {
        status:
          "💡 Connect your Metamask wallet to add the file on the blockchain.",
      };
    }
    //set up transaction parameters
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: address, // must match user's active address.
      data: helloWorldContract.methods.addDocHash(newMessage).encodeABI(),
      

    };
  
    //sign the transaction
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return {
        status: (
          <span>
            ✅{" "}
            <a target="_blank" href={`https://ropsten.etherscan.io/tx/${txHash}`}>
              View the status of your transaction on Etherscan!
            </a>
            <br />
            ℹ️ Once the transaction is verified by the network, the message will
            be updated automatically.
          </span>
        ),
      };
    } catch (error) {
      return {
        status: "😥   Rejected by wallet's user"  ,
      };
    }
  };

  export const findDocHash= async (newMessaged) => {
  //const [time, settime] = useState("");
  const message = await helloWorldContract.methods.findDocHash(newMessaged).call();
  //settime(resultObj[0]);
    let resultObj = {
        mineTime:  new Date(message[0] * 1000),
        blockNumber: message[1]
      }
    console.log(resultObj);

    let a =  Object.keys(message[1]).length;
    let b =  Object.keys(message[1]);
    //console.log(a);
    //console.log(b);
    const aa = resultObj.mineTime.toString();
    if (a > 1) {
         return {
             stat:(
                <span>
                <p>
                  
                  Document verified  
                  <br />
                  { aa }
                </p>
              </span>

             ),
         }
      } else {
        return {
          
          stat: (
            <span>
              <p>
                Document is not verified.
              </p>
            </span>
          ),
        };
      }
    
    

    
    
  };



  



