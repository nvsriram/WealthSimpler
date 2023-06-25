import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-g6fciGANHIF7FND_pYJvIUXCHUXjHhY",
  authDomain: "wealthsimpler-875f9.firebaseapp.com",
  projectId: "wealthsimpler-875f9",
  storageBucket: "wealthsimpler-875f9.appspot.com",
  messagingSenderId: "34696672176",
  appId: "1:34696672176:web:5b682b7b9f330522d79c75",
  measurementId: "G-C1Q14ZJ2VZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to add fields to the database
export async function addFieldsToDatabase(
  email: string,
  publicKey: string,
  privateKey: string,
  organization?: string
): Promise<void> {
  const hashedEmail = await hashEmail(email);
  set(ref(database, `users/${hashedEmail}`), {
    email,
    publicKey,
    privateKey,
    organization,
  });
}

async function hashEmail(email: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// Function to check if hashed email exists in the database
export async function checkEmailExists(email: string): Promise<boolean> {
  const hashedEmail = await hashEmail(email);
  const snapshot = await get(ref(database, `users/${hashedEmail}`));
  return snapshot.exists();
}

// Function to get publicKey and privateKey from the database
export async function getEmailKeys(
  email: string
): Promise<{
  publicKey: string | null;
  privateKey: string | null;
  organization: string | null;
}> {
  const hashedEmail = await hashEmail(email);
  const snapshot = await get(ref(database, `users/${hashedEmail}`));
  const userData = snapshot.val();
  if (userData) {
    const { publicKey, privateKey } = userData;
    if (userData.organization) {
      return { publicKey, privateKey, organization: userData.organization };
    }
    return { publicKey, privateKey, organization: null };
  } else {
    return { publicKey: null, privateKey: null, organization: null };
  }
}

// Usage examples
// addFieldsToDatabase("user@example.com", "publicKey123", "privateKey456");

// checkEmailExists(SHA256("user@example.com").toString()).then((exists) => {
//   console.log(exists); // true
// });

// getEmailKeys("user@example.com").then(({ publicKey, privateKey }) => {
//   console.log(publicKey, privateKey); // publicKey123 privateKey456
// });
