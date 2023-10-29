import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Auth0Provider
      domain="dev-8vpeifn5zjr10rrk.us.auth0.com"
      clientId="KeyCLgsg5zocbeC4ggP3qyHBLHJBv7E9"
      authorizationParams={{ redirect_uri: "https://roundrobinbackend.onrender.com/home" }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <>
            <Toaster />
            <Router />
          </>
        </BrowserRouter>
      </QueryClientProvider>
    </Auth0Provider>
  );
}
