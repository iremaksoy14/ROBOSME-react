import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import AuthGuard from "./components/AuthGuard";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/posts"
        element={
          <AuthGuard>
            <Posts />
          </AuthGuard>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <AuthGuard>
            <PostDetail />
          </AuthGuard>
        }
      />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
