import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="favicon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/next.svg" />
      </Head>
      <body
        className="!block bg-black"
        style={{
          display: "none",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
