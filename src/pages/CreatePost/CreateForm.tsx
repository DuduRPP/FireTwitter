import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreatePostData {
  content: string;
}


export const CreateForm = () => {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    content: yup.string().required("Content is required"),
  });

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  })

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: CreatePostData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    })
  }

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
        <p style={{color: "red"}}>{errors.content?.message} </p>
        <textarea placeholder="What is happening?!" {...register("content")}/>
        <input type="submit" />
    </form>
  )
}