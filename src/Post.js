import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import firebase from 'firebase';

function Post( { postId, user, username, caption, imageUrl } ) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState ('');  

    useEffect(()=> {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault(); 

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment(''); 
    }

    return (
        <div className="post">
            <div className="post-header">
            <Avatar
                className="post-avatar"
                alt="Guillem"
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
            />
            <h3>{username}</h3>
        </div>

            <img
            className="post-image" 
            src={imageUrl}
            alt="loading post"
            />

    <h4 className="post-text"><strong>{username}</strong>: {caption}</h4>

    <div className="post-comments">
        {comments.map((comment) => (
            <p>
                <b>{comment.username}</b> {comment.text}
            </p>
        ))}
    </div>

    {user && (
    <form className="post-commentbox">
        <input
            className="post-input"  
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />
        <button
            className="post-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
        >
        Post     
        </button>
    </form>
    )}

          </div>
    )
}

export default Post
