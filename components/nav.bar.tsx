import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { isLogin } from "../store/auth";

const NavBar = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLogin);
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) setIsLoggedIn(true);
  }, [isLoggedIn]);

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
        <a onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
          hi
        </a>
        <div>
          {!isLoggedIn ? (
            <button
              type={"button"}
              style={{ height: 20 }}
              onClick={() => router.push("login")}
            >
              login
            </button>
          ) : (
            <button
              type={"button"}
              style={{ height: 20 }}
              onClick={() => {
                localStorage.clear();
                setIsLoggedIn(false);
                router.push("login");
              }}
            >
              logout
            </button>
          )}

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
