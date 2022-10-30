import React from "react";

type DataType = {
  userId: string;
  title: string;
  subject: string;
};

interface Props {
  columns: string[];
  data: DataType[];
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
        {data.map(({ userId, title, subject }, index) => (
          <tr key={userId + title}>
            <td>{index}</td>
            <td>{userId}</td>
            <td>{title}</td>
            <td>{subject}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
