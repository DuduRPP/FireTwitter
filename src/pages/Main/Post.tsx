import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post as IPost } from "./Main";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}


export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null);
    
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => {
            return ({userId: doc.data().userId, likeId: doc.id})
        }));
    }

    const addLike = async () => {
        try{
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
            if(user){
                setLikes((prevLikes) => 
                    prevLikes ? [...prevLikes, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]
                );
            }
        } catch (error) {
            console.error("Error adding like: ", error);
        }
        
    }

    const removeLike = async () => {
        try{
            const likeToDeleteQuery = query(likesRef, where("userId", "==", user?.uid),
                where("postId", "==", post.id));

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db,"likes", likeId);

            await deleteDoc(likeToDelete);
            if(user){
                setLikes((prevLikes) => 
                   prevLikes && prevLikes.filter((like) => like.likeId !== likeId)
                );
            }
        } catch (error) {
            console.error("Error adding like: ", error);
        }
    }

    
    
    const hasUserLiked = likes?.some((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div>
            <div className="post-header">
                <p>{post.username}</p>
            </div>
            <div className="post-body">
                <p>{post.content}</p>
            </div>
            <div className="post-footer">
                <button onClick={hasUserLiked ? removeLike : addLike}>
                    <span>{likes ? likes.length : 0}</span>
                    <span>{hasUserLiked ?  <>&#128078;</> :  <>&#128077;</>}</span>
                </button>
            </div>
        </div>
        
    )
}
