export type Post = {
    id: number;
    content: string;
    created_at: string;
    user: { name: string; email: string };
    comments: {
      id: number;
      content: string;
      created_at: string;
      user: { name: string };
    }[]; // Kommentars struktur
    likes: any[];
  };
  
  export type PostsProps = {
    posts: Post[];
  };
  