import React, {ReactNode} from 'react';
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";

type Props = {
    header: ReactNode | string;
    body: ReactNode;
    footer?: ReactNode;
}

export default function CardInnerWrapper({header, body, footer}: Props) {
    return (
        <>
            <Card className='w-full'>
                <CardHeader>
                    {typeof header === 'string' ? (
                        <div className='text-2xl font-semibold text-secondary'>
                            {header}
                        </div>
                    ): (
                        <>{header}</>
                    )}

                </CardHeader>
                <Divider />
                <CardBody>
                    {body}
                </CardBody>
                {footer && (
                    <CardFooter>
                        {footer}
                    </CardFooter>
                )}
            </Card>

        </>
    );
}

