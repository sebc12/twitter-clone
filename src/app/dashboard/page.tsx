import CreatePost from "./CreatePost";
import Posts from "./posts";

export default function Dashboard() {
  return (
    <div className="py-16">
      <h1>Dashboard</h1>
      <CreatePost />
      <Posts />
    </div>
  );
}
