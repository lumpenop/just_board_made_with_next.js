import Head from "next/head";

import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  return (
    <header>
      <Head>
        <title>title</title>
      </Head>
      <div
        style={{
          color: "black",
          height: "40px",
          lineHeight: "40px",
          backgroundColor: "skyblue",
          padding: "0 40px 0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>hi</span>
        <div>
          <button
            type={"button"}
            style={{ height: 20 }}
            onClick={() => router.push("login")}
          >
            login
          </button>
          <button
            type={"button"}
            style={{ height: 20, marginLeft: 10 }}
            onClick={() => router.push("signup")}
          >
            sign up
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
