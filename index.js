import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({method : "eth_requestAccounts"});
    connectButton.innerHTML = "Connected!";
    } else {
        connectButton.innerHTML = "Please install Metamask";
    }
}

async function fund() {
    const ethAmount = "1";
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to the blockchain
        // signer / wallet / someone with some gas
        // contract that we are interacting with
        // ^ ABI & Address
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const transactionResponse = await contract.fund({
            value: ethers.parseEther(ethAmount),
        }); // 13:18:25
    }
}

//fund function


//withdraw