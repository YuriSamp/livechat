import { Dispatch, SetStateAction, useState } from 'react'
import { message } from '../App'
import { SendHorizonal } from 'lucide-react'
import { socket } from '../socket'

type Props = {
  messages: message[]
  yourId: string
  setMessages: Dispatch<SetStateAction<message[]>>
}


const Chat = ({ messages, yourId, setMessages }: Props) => {
  const date = new Date()
  const [messageTosend, setMessageToSend] = useState('')

  const sendMessage = () => {
    const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    setMessages(prev => [...prev, { message: messageTosend, userId: yourId, time }])
    socket.emit('new message', { message: messageTosend, userId: yourId, time })
    setMessageToSend('')
  }


  return (
    <div className='w-[400px] h-[500px] border border-black rounded-md '>
      <div className='h-[450px] py-2 px-5'>
        <div className='h-full overflow-y-auto flex flex-col'>
          {messages.map((message, i) => (
            <div key={i} className={`px-3 ${message.userId === yourId && 'self-end'}`}>
              <div className={`w-fit border border-black my-1 px-2 gap-2 flex py-1  rounded-md max-w-[350px] `}>
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
  )
}

export default Chat
