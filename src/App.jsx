import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App w-full">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
