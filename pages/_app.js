import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import {
  CurrencyContext,
  AdEmailContext,
  GoldContext,
  CustomerEmailContext,
  CustomerAuthContext,
  CustomerRecoveredPassword,
} from "../store/store";
import { useState } from "react";
import { ShopProvider } from "../context/ShopProvider";
import shopReducer, { initialState } from "../context/ShopReducer";
import Processing from "../components/Processing";

function MyApp({ Component, pageProps, session }) {
  const [currency, setCurrency] = useState({ curr: "usd", rate: 1 });
  const [adEmail, setAdEmail] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [sellGold, setSellGold] = useState([]);
  const [passReset, setPassReset] = useState(false);
  const [customerAuth, setCustomerAuth] = useState(null);

  return (
    <SessionProvider session={session}>
      <AdEmailContext.Provider value={{ adEmail, setAdEmail }}>
        <CustomerAuthContext.Provider value={{ customerAuth, setCustomerAuth }}>
          <ShopProvider initialState={initialState} reducer={shopReducer}>
            <CurrencyContext.Provider value={{ currency, setCurrency }}>
              <GoldContext.Provider value={{ sellGold, setSellGold }}>
                <CustomerRecoveredPassword.Provider
                  value={{ passReset, setPassReset }}
                >
                  <CustomerEmailContext.Provider
                    value={{ customerEmail, setCustomerEmail }}
                  >
                    <Processing />

                    <Component {...pageProps} />
                  </CustomerEmailContext.Provider>
                </CustomerRecoveredPassword.Provider>
              </GoldContext.Provider>
            </CurrencyContext.Provider>
          </ShopProvider>
        </CustomerAuthContext.Provider>
      </AdEmailContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
