import Table from "../components/table";

const columns = ["id", "user id", "title", "subject"];
const Board = () => {
  return (
    <section style={{ width: "40%", margin: "0 auto" }}>
      <div style={{ marginTop: "100px" }}>
        <h1>게시판</h1>
        <Table columns={columns} data={[]} />
      </div>
    </section>
  );
};

export default Board;
