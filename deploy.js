import { connect, isConnected, request } from "https://esm.sh/@stacks/connect@latest";

const contractNameInput = document.querySelector("#contract-name");
const walletAddressInput = document.querySelector("#wallet-address");
const networkInput = document.querySelector("#network");
const connectButton = document.querySelector("#connect-wallet");
const deployForm = document.querySelector("#deploy-form");
const title = document.querySelector("#deploy-title");
const message = document.querySelector("#deploy-message");
const contractId = document.querySelector("#contract-id");
const txLink = document.querySelector("#tx-link");
const explorerLink = document.querySelector("#explorer-link");

function setStatus(nextTitle, nextMessage) {
  title.textContent = nextTitle;
  message.textContent = nextMessage;
}

function findStacksAddress(value, network) {
  const prefix = network === "mainnet" ? "SP" : "ST";

  if (typeof value === "string" && value.startsWith(prefix)) {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findStacksAddress(item, network);
      if (found) return found;
    }
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      const found = findStacksAddress(item, network);
      if (found) return found;
    }
  }

  return "";
}

function renderContractId() {
  const address = walletAddressInput.value.trim();
  const name = contractNameInput.value.trim();
  contractId.textContent = address && name ? `${address}.${name}` : "Pending";
}

async function connectWallet() {
  setStatus("Connecting", "Approve the connection in Xverse.");
  const response = isConnected() ? await connect() : await connect();
  const address = findStacksAddress(response, networkInput.value);

  if (address) {
    walletAddressInput.value = address;
    renderContractId();
    setStatus("Connected", `Wallet address detected for ${networkInput.value}.`);
    return;
  }

  setStatus("Connected", "Connection succeeded. Paste your wallet address above if it was not detected.");
}

async function deployContract(event) {
  event.preventDefault();

  const network = networkInput.value;
  const name = contractNameInput.value.trim();
  const expectedPrefix = network === "mainnet" ? "SP" : "ST";
  const address = walletAddressInput.value.trim();

  if (!address.startsWith(expectedPrefix)) {
    setStatus("Check address", `Use a ${expectedPrefix} address for ${network}.`);
    return;
  }

  setStatus("Preparing", "Loading the Clarity contract from this site.");
  const clarityCode = await fetch("contracts/proof-pad.clar").then((response) => {
    if (!response.ok) throw new Error("Could not load contracts/proof-pad.clar");
    return response.text();
  });

  renderContractId();
  setStatus("Sign in Xverse", "Confirm the contract deployment transaction.");

  const response = await request("stx_deployContract", {
    name,
    clarityCode,
    clarityVersion: 3,
    network
  });

  const txId = response.txId || response.txid || "";
  const txUrl = `https://explorer.stacks.co/txid/${txId}?chain=${network}`;
  const contractUrl = `https://explorer.stacks.co/address/${address}.${name}?chain=${network}`;

  txLink.innerHTML = txId ? `<a href="${txUrl}" target="_blank" rel="noreferrer">${txId}</a>` : "Broadcasted";
  explorerLink.innerHTML = `<a href="${contractUrl}" target="_blank" rel="noreferrer">Open contract</a>`;
  setStatus("Broadcasted", "Wait for confirmation in the Stacks Explorer.");
}

connectButton.addEventListener("click", () => {
  connectWallet().catch((error) => setStatus("Connection failed", error.message));
});

deployForm.addEventListener("submit", (event) => {
  deployContract(event).catch((error) => setStatus("Deploy failed", error.message));
});

walletAddressInput.addEventListener("input", renderContractId);
networkInput.addEventListener("change", renderContractId);
