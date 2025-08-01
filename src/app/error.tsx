'use client'


import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {BiSolidError} from "react-icons/bi";
import {Button} from "@heroui/button";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {


    return (
        <div className='flex items-center justify-center vertical-center'>
            <Card className='w-2/5 mx-auto'>
                <CardHeader className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center text-secondary'>
                        <BiSolidError size={30}/>
                        <h1 className='text-3xl'>Error</h1>

                    </div>
                </CardHeader>
                <CardBody className='flex justify-center text-danger'>
                    {error.message}
                </CardBody>
                <CardFooter className='flex justify-center'>
                    <Button onPress={reset} color='secondary' variant='bordered'>Refresh</Button>
                </CardFooter>

            </Card>

        </div>
    )
}