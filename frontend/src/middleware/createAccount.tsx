import { ethers } from "ethers";

export async function createAccount(): Promise<[string, string]> {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const id = Array.from(array, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  const privateKey = "0x" + id;
  // console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);

  const wallet = new ethers.Wallet(privateKey);
  // console.log("Address: " + wallet.address);

  return [wallet.address, privateKey];
}
