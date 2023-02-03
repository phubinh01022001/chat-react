import { async } from '@firebase/util';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useState, useContext } from 'react'
import { db } from '../firebase';
import { AuthContext } from "../context/AuthContext"

const Search = () => {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }
  const handleSelect = async () => {
    //Check user chat exits
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (err) { }
    setUser(null);
    setUserName("");
  }
  return (
    <div className='search'>
      <div className="searchForm">
        <input type='text/' placeholder='Tìm kiếm'
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>Người dùng không tồn tại!</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search