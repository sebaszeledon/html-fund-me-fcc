import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({method : "eth_requestAccounts"});
    connectButton.innerHTML = "Connected!";
    } else {
        connectButton.innerHTML = "Please install Metamask";
    }
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.formatEther(balance));
    }
}

//fund function

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}...`);
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to the blockchain
        // signer / wallet / someone with some gas
        // contract that we are interacting with
        // ^ ABI & Address
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try{
            const transactionResponse = await contract.fund({
                value: ethers.parseEther(ethAmount),
            }); 
            await listenForTransactionMine(transactionResponse, provider);
            console.log("Done!");
        } catch(error) {
            console.log(error);
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations`);
        resolve();
        });
    });
}

//withdraw

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        console.log("Withdrawing...")
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.cheaperWithdraw();
            await listenForTransactionMine(transactionResponse, provider);
        } catch(error){
            console.log(error)
        }
    }
}