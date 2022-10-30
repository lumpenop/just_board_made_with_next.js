import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  userId: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });
  const onChange: SubmitHandler<Inputs> = (data) => console.log(data);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section style={{ marginTop: 100 }}>
      <div style={{ width: "45%", margin: "0 auto" }}>
        <h1>login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div>
            <label>id </label>
            <input
              {...register("userId", {
                pattern: { value: /^[A-Za-z]+$/i, message: "아이디는 영어만" },
                required: true,
              })}
            />
            <span>{errors.userId?.message}</span>
          </div>
          {/* include validation with required or other standard HTML validation rules */}
          <div>
            <label>pw </label>
            <input
              type={"password"}
              {...register("password", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>This field is required</span>}
          </div>
          <input type="submit" />
        </form>
      </div>
    </section>
  );
};

export default Login;
