import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isUserSetted: boolean
  setIsUserSetted: Dispatch<SetStateAction<boolean>>
  setUserName: Dispatch<SetStateAction<string>>
}


export const DialogComponent = ({ isUserSetted, setIsUserSetted, setUserName }: Props) => {


  const setUser = () => {
    setIsUserSetted(true)
  }


  return (
    <Dialog.Root open={!isUserSetted}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Create a chat room
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            To start a conversation please enter your name
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="text-violet11 w-[30px] text-left text-[15px]" htmlFor="name">
              Name
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              defaultValue="Pedro Duarte"
              onChange={e => setUserName(e.target.value)}
            />
          </fieldset>
          <div className="mt-[25px] flex justify-center">
            <Dialog.Close asChild>
              <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none" onClick={setUser}>
                Enter the chat room
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
