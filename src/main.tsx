import React from "react";
import App from "./App.tsx";

import ReactDOM from "react-dom/client";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import AuthProvider from "./apis/user/index.tsx";

import { ThemeProvider } from "styled-components";
import { theme } from "./assets/styles/theme";
import GlobalStyles from "./assets/styles/GlobalStyles";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
