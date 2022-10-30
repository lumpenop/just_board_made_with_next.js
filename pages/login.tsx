import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import Auth from "../api/auth";
import { AxiosError } from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isLogin } from "../store/auth";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [isLoggedIn, setIsloggedIn] = useRecoilState(isLogin);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsloggedIn(true);
      router.push("/board");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange", shouldFocusError: false });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      Auth.login(data)
        .then((res) => {
          const { access_token } = res.data.response;
          localStorage.setItem("access_token", access_token);
          if (access_token) {
            setIsloggedIn(true);
            return router.push("/board");
          }
        })
        .catch((e) => {
          if (e instanceof AxiosError && e.response) {
            const { status } = e.response;
            if (status === 400) console.log("password check");
            if (status === 404) console.log("not found");
          }
        });
    } catch (e) {
      throw new Error("알 수 없는 서버 에러");
    }
  };
  if (isLoggedIn) return;
  return (
    <section style={{ marginTop: 100 }}>
      <div style={{ width: "35%", margin: "0 auto" }}>
        <h1>login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>id </label>
            <input
              {...register("email", {
                pattern: { value: /^[A-Za-z]+$/i, message: "아이디는 영어만" },
                required: true,
              })}
            />
            <span>{errors.email?.message}</span>
          </div>
          <div>
            <label>pw </label>
            <input
              type={"password"}
              {...register("password", { required: true })}
            />
            {errors.password && <span>비밀번호를 입렵해주세요</span>}
          </div>
          <input type="submit" />
        </form>
      </div>
    </section>
  );
};

export default Login;
