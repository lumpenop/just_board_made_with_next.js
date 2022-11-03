import { useForm, SubmitHandler } from "react-hook-form";
import Auth from "../api/auth";
import { AxiosError } from "axios";
import { instanceOf } from "prop-types";

type Inputs = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({ mode: "onChange", shouldFocusError: false });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      Auth.signUp(data)
        .then(() => console.log("hi"))
        .catch((e) => {
          if (e instanceof AxiosError && e.response) {
            const { status } = e.response;
            if (status === 400) console.log("password check");
            if (status === 409) console.log("exist");
          }
        });
    } catch (e) {
      throw new Error("알 수 없는 서버 에러");
    }
  };

  return (
    <section style={{ marginTop: 100 }}>
      <div style={{ width: "35%", margin: "0 auto" }}>
        <h1>sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>email</label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "아이디는 영어만",
                },
              })}
            />
            <span>{errors.email?.message}</span>
          </div>
          <div>
            <label>nickname</label>
            <input
              {...register("nickname", {
                required: true,
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "아이디는 영어만",
                },
              })}
            />
            <span>{errors.nickname?.message}</span>
          </div>

          <div>
            <div>
              <label>pw </label>
              <input
                type={"password"}
                {...register("password", { required: true })}
              />
              {errors.password?.message && <span>This field is required</span>}
            </div>
            <div>
              <label>confirm </label>
              <input
                type={"password"}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    return (
                      value === getValues("password") || "password not match"
                    );
                  },
                })}
              />
              {errors.confirmPassword?.message && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </div>
          </div>
          <input type="submit" />
        </form>
      </div>
    </section>
  );
};

export default SignUp;
