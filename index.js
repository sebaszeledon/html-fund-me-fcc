import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({method : "eth_requestAccounts"});
    document.getElementById("connectButton").innerHTML = "Connected!";
    } else {
        document.getElementById("connectButton").innerHTML = "Please install Metamask";
    }
}

async function fund(ethAmount) {
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to the blockchain
    }
}

//fund function


//withdraw