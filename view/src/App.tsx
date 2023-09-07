import { SendHorizonal } from 'lucide-react'
import { useEffect, useState } from 'react';
import { socket } from './socket';
import { DialogComponent } from './components/Dialog';
import { v4 as uuidv4 } from 'uuid'


type message = {
  message: string
  userId: string
  time: string
}

function App() {
  const date = new Date()

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [yourId, setYourId] = useState<string>('')
  const [messages, setMessages] = useState<message[]>([]);
  const [isUserSetted, setIsUserSetted] = useState(false)
  const [userName, setUserName] = useState('')
  const [messageTosend, setMessageToSend] = useState('')


  const onConnect = () => {
    console.log('conectado')
    setIsConnected(true);
  }

  const onDiscoonect = () => {
    console.log('desconectado')
    setIsConnected(false);
  }

  const onNewMessage = (Response: any) => {
    console.log(Response.message.data)
    setMessages(prev => [...prev, Response.message.data])
  }

  useEffect(() => {
    setYourId(uuidv4())

    socket.on('connect', onConnect);
    socket.on('disconnect', onDiscoonect);
    socket.on('new message', onNewMessage);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDiscoonect);
      socket.off('new message', onNewMessage);
    };
  }, []);

  const sendMessage = () => {
    const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    setMessages(prev => [...prev, { message: messageTosend, userId: yourId, time }])
    socket.emit('new message', { message: messageTosend, userId: yourId, time })
    setMessageToSend('')
  }

  console.log(messages)

  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      <DialogComponent
        isUserSetted={isUserSetted}
        setIsUserSetted={setIsUserSetted}
        setUserName={setUserName}
      />
      <div className={`${!isUserSetted ? 'blur-md' : ''}`}>
        <div className='flex flex-col items-center justify-center gap-1 py-5 '>
          <h1 className='text-3xl'>You are chat with </h1>
          <h2 className='text-2xl'>{userName}</h2>
        </div>
        <div className='w-[400px] h-[500px] border border-black rounded-md '>
          <div className='h-[450px] py-2 px-5'>
            <div className='h-full overflow-y-auto'>
              {messages.map((message, i) => (
                <div key={i} className='px-3'>
                  <div className='w-fit border border-black my-2 px-2 gap-2 flex py-1  rounded-md max-w-[350px]'>
                    <p className=' '>{message.message}</p>
                    <p className='text-xs self-end'>{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-around px-2'>
            <input className='w-[300px] border border-black rounded-lg p-2 max-h-52' onChange={(e) => setMessageToSend(e.target.value)} value={messageTosend} />
            <button onClick={sendMessage}>
              <SendHorizonal className='w-6 h-6' />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
