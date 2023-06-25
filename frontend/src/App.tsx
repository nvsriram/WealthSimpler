import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login/Login";
import "./styles.css";
import {
  getEmailKeys,
  checkEmailExists,
  addFieldsToDatabase,
} from "./middleware/store";
import { createAccount } from "./middleware/createAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";
import CreateOrg from "./pages/CreateOrg/CreateOrg";

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const { user, isAuthenticated } = useAuth0();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);

  // console.log("User", user);
  // console.log(createAccount());

  useEffect(() => {
    const handleUserData = async () => {
      if (user && user.email) {
        try {
          const emailExists = await checkEmailExists(user.email);
          if (emailExists) {
            const { publicKey, privateKey, organization } = await getEmailKeys(
              user.email
            );
            console.log("pubKey", publicKey);
            console.log("priKey", privateKey);
            setPublicKey(publicKey);
            setPrivateKey(privateKey);
            if (organization) {
              setCurrentStep(4);
              setName(organization);
            }
          } else {
            const [pubKey, privKey] = await createAccount();
            setPublicKey(pubKey);
            setPrivateKey(privKey);
            await addFieldsToDatabase(user.email, pubKey, privKey);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    handleUserData();
  }, [user]);

  return (
    <div className="app">
      <Navbar />
      {isAuthenticated ? (
        <div className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                currentStep >= 4 ? (
                  <Dashboard org={name} />
                ) : (
                  <CreateOrg
                    org={name}
                    setOrg={setName}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                  />
                )
              }
            />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
