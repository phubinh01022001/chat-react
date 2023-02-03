import React, { useContext } from 'react'
import Cam from '../img/callcamera.png'
import Add from '../img/addfriend.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const { data } = useContext(ChatContext);
  const handleFunction = () => {
      alert("Chức năng hiện đang hoàn thiện!")
  }

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Add} alt="" onClick={handleFunction} />
          <img src={Cam} alt="" onClick={handleFunction} />
          <img src={More} alt="" onClick={handleFunction} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat