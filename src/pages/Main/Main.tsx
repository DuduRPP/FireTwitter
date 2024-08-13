import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Post } from "./Post"

export interface Post {
  id: string;
  content: string;
  username: string;
  userId: string;
}

export const Main = () => {
  const [postsList, setPostList] = useState<Post[] | null>(null)

  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const posts = await getDocs(postsRef);
    const postsArray = posts.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Post[];
    setPostList(postsArray);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div>
      {postsList?.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  )
}