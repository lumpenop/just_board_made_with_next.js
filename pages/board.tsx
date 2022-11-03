import { useState, useLayoutEffect, ChangeEvent, FormEvent } from "react";
import Table from "../components/table";
import { useRouter } from "next/router";
import Auth from "../api/auth";
import { AxiosResponse } from "axios";

const columns = ["id", "nickname", "subject"];

type UserType = {
  id: number;
  createdAt: string;
  nickname: string;
  password: string;
  email: string;
};

type ResponseType = {
  data: { response: UserType };
};

export type InputDataType = {
  nickname: string;
  input: string;
};

const Board = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState<InputDataType[]>([]);
  const [inputData, setInputData] = useState<InputDataType>({
    nickname: "",
    input: "",
  });
  const [nickName, setNickName] = useState("");

  const getAccessToken = async () => {
    const accessToken = await localStorage.getItem("access_token");
    return accessToken;
  };
  useLayoutEffect(() => {
    getAccessToken().then((res) => {
      console.log(res);
      if (!res) router.push("/login");
      try {
        Auth.getUser(res)
          .then((res: ResponseType) => {
            const { nickname } = res.data.response;
            setNickName(nickname);
          })
          .catch((res) => {
            console.log("hi");
            const { code } = res;
            if (code === 401) {
              console.log(code, "401");
            }
          });
      } catch (e) {
        throw Error("알 수 없는 서버 에러");
      }
    });
  }, []);

  if (!nickName) return;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTableData((prev) => [...prev, inputData]);
    setInputData({ nickname: "", input: "" });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setInputData({ nickname: nickName, input: value });
  };
  return (
    <section style={{ width: "40%", margin: "0 auto" }}>
      <div style={{ marginTop: "100px" }}>
        <h1>게시판</h1>
        <form onSubmit={onSubmit}>
          <input type="text" value={inputData.input} onChange={onChange} />
          <button type={"submit"}>작성완료</button>
        </form>
        <Table columns={columns} data={tableData} />
      </div>
    </section>
  );
};

export default Board;
