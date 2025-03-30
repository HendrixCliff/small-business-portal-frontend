
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import { store } from "./redux/store.ts"; 
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(

    <Provider store={store}> {/* Wrap App with Provider */}
      <App />
    </Provider>

);

