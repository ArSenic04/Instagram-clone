import React, { useEffect, useState } from 'react'
import './Post.css'
import firebase from 'firebase/compat/app';
import Avatar from '@mui/material/Avatar'
import { orange } from '@mui/material/colors'
import { db } from './firebase'
function Post({ postId, username, caption, user, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)

        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId])

  const postComment = (event) => {
    event.preventDefault();
    db.collection('posts').doc(postId).collection("comments").add({
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName
    })
    setComment('');
  }
  return (

    <div className='post'>
      <div className='post__header'>
        <Avatar className='post__avatar'
          sx={{ backgroundColor: orange[100] }}>S</Avatar>
        <h3>{username}</h3>
      </div>
      <img
        className='post__image'
        alt=''
        src={imageUrl}
      ></img>
      <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
      <div className="post__coments">
        {
          comments.map(comment => (
            <p>
              <strong>{comment.username}</strong>{comment.text}
            </p>
          ))
        }
      </div>
      {user && (
        <form className='post__CommentBox'>
          <input
            type='text'
            placeholder='Add a comment'
            name='comment'
            id='comment'
            className='post__input'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='post__button'
            type='submit'
            disabled={!comment}
            onClick={postComment}
          >Post</button>
        </form>
      )}

    </div>
  )
}

export default Post
