import { install } from "@twind/core";
import config from "../twind.config";
import "../styles/style.css";
// activate twind - must be called at least once
install(config);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
