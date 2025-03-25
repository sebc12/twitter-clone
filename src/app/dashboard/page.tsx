import CreatePost from "./CreatePost";
import Posts from "./posts";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <CreatePost />
      <Posts />
    </div>
  );
}
