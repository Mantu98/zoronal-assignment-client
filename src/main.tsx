import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { store } from "./redux/store";
import App from "./App";

import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
    />
  </Provider>,
);
