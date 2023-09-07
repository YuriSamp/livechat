import { SendHorizonal } from 'lucide-react'

function App() {
  return (
    <main className='flex justify-center items-center h-screen'>
      <div className='w-[400px] h-[500px] border border-black rounded-md '>
        <div className='w-full h-[450px] py-2 px-3'>
          <div className='h-full overflow-y-auto border border-red-600 '>
          </div>
        </div>
        <div className='flex justify-around px-2'>
          <input className='w-[300px] border border-black rounded-lg p-2 max-h-52' />
          <button className=''>
            <SendHorizonal className='w-6 h-6' />
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
