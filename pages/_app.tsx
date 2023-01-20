import { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { NotificationsProvider } from "@mantine/notifications";
export default function App({ Component, pageProps, router }: AppProps) {
  const getLayout = router.pathname.includes("admin")
    ? (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>
    : (page: React.ReactElement) => <UserLayout>{page}</UserLayout>;
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Provider store={store}>
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <NotificationsProvider autoClose={3000}>
              {getLayout(<Component {...pageProps} />)}
            </NotificationsProvider>
          </ColorSchemeProvider>
        </MantineProvider>
      </Provider>
    </>
  );
}
