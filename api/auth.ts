import axios from "axios";

interface ISignUpData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

type LoginDataType = Pick<ISignUpData, "email" | "password">;

class Auth {
  api = axios.create({
    baseURL:
      "http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999",
  });
  signUp({ email, nickname, password, confirmPassword }: ISignUpData) {
    return this.api.post("/api/users/register", {
      email,
      nickname,
      password,
      confirmPassword,
    });
  }

  login({ email, password }: LoginDataType) {
    return this.api.post("/api/users/login", {
      email,
      password,
    });
  }

  getUser(accessToken: string) {
    return this.api.get("/api/users", {
      headers: { Authorization: accessToken },
    });
  }
}

export default new Auth();
