import React, { useState, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Amplify, { I18n } from "aws-amplify";
import { AmplifySignOut, AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";
import { vocabularies } from "./assets/amplify/vocabularies";
import "./App.css";

// Component
import ChartSection from "./components/ChartSection";
import TableSection from "./components/TableSection";
import SelectSection from "./components/SelectSection";

I18n.putVocabularies(vocabularies);
I18n.setLanguage("ja");
Amplify.configure(awsconfig);

const queryClient = new QueryClient();

function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [selectedOption, setSelectedOption] = useState({
    value: "440103225317103",
    label: "センサー１",
  });

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const options = [
    { value: "440103225317103", label: "センサー１" },
    { value: "440103225317104", label: "センサー２" },
    { value: "440103225317105", label: "センサー３" },
  ];

  function onChangeInput(value) {
    setSelectedOption(value);
  }

  return authState === AuthState.SignedIn && user ? (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <div className="App-header-inside">
            <h2>Sensor Data</h2>
            <div>
              <AmplifySignOut />
            </div>
          </div>
        </header>

        <ChartSection sensorId={selectedOption.value} />
        <TableSection sensorId={selectedOption.value} />
        <div className="selectBox">
          <SelectSection
            selectedOption={selectedOption}
            onChange={onChangeInput}
            options={options}
          />
        </div>
      </div>
    </QueryClientProvider>
  ) : (
    <AmplifyAuthenticator />
  );
}

export default App;
