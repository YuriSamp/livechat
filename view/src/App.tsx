import { useEffect, useState } from 'react';
import { socket } from './socket';
import { DialogComponent } from './components/Dialog';
import { v4 as uuidv4 } from 'uuid'
import Chat from './components/Chat';
import Title from './components/Title';

export type message = {
  message: string
  userId: string
  time: string
}

type socketResponse = {
  message: message
  userName: string
}

function App() {
  const [yourId, setYourId] = useState<string>('')
  const [messages, setMessages] = useState<message[]>([]);
  const [isUserSetted, setIsUserSetted] = useState(false)
  const [otherPersonName, setOtherPersonName] = useState('')
  const [userName, setUserName] = useState('')

  const onNewMessage = (Response: socketResponse) => {
    setMessages(prev => [...prev, Response.message])
  }

  const onNewUser = (user: { username: string }) => {
    setOtherPersonName(user.username)
  }

  useEffect(() => {
    setYourId(uuidv4())

    socket.on('new message', onNewMessage);
    socket.on('user joined', onNewUser)
    return () => {
      socket.off('new message', onNewMessage);
      socket.off('user joined', onNewUser)
    };
  }, []);

  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      <DialogComponent
        isUserSetted={isUserSetted}
        setIsUserSetted={setIsUserSetted}
        setUserName={setUserName}
        userName={userName}
      />
      <div className={`${!isUserSetted ? 'blur-md' : ''}`}>
        <Title otherPersonName={otherPersonName} />
        <Chat
          messages={messages}
          setMessages={setMessages}
          yourId={yourId}
        />
      </div>
    </main>
  )
}

export default App
