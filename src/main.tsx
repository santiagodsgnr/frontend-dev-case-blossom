import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./clients/apolloClient.ts";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import Character from "../components/Character.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path={`/character/:id`} element={<Character />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
