type Props = {
  otherPersonName: string
}

const Title = ({ otherPersonName }: Props) => {

  const TitleRendering = () => {
    if (otherPersonName) {
      return (
        <>
          <h1 className='text-3xl'>You are chat with </h1>
          <h2 className='text-2xl'>{otherPersonName}</h2>
        </>
      )
    }
    return <h1 className='text-3xl'>Waiting someone enter the room</h1>
  }


  return (
    <div className='flex flex-col items-center justify-center gap-1 py-5 '>
      {TitleRendering()}
    </div>
  )
}

export default Title
