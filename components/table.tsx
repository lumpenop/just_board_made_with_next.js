import React from "react";
import { InputDataType } from "../pages/board";

interface Props {
  columns: string[];
  data: InputDataType[];
}

const Table = ({ columns, data }: Props) => {
  return (
    <table style={{ border: "1px solid #ececec" }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ nickname, input }, index) => (
          <tr key={nickname + index}>
            <td>{index}</td>
            <td>{nickname}</td>
            <td>{input}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
