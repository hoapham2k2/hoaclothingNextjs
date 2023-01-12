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
import "../styles/globals.css";
export default function App({ Component, pageProps, router }: AppProps) {
  const getLayout = router.pathname.includes("admin")
    ? (page: React.ReactElement) => <AdminLayout children={page} />
    : (page: React.ReactElement) => <UserLayout children={page} />;
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          {getLayout(<Component {...pageProps} />)}
        </ColorSchemeProvider>
      </MantineProvider>
    </>
  );
}
