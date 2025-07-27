import {auth, signOut} from "@/auth";
import {Button} from "@heroui/button";
import {FaRegAngry} from "react-icons/fa";


export default async function Home() {
  const session = await auth();
  return (
  <div>
    <h3 className='text-2xl font-semibold'> Yser Session Data: </h3>
    {session? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form action={async () => {
            'use server'
            await signOut()
          }}>
            <Button type='submit' color='danger' variant='bordered' startContent={<FaRegAngry size={20} /> }>Sign Out</Button>

        </form>
        </div>
    ): (
        <div>
          No session
        </div>
    )}

  </div>
  );
}
