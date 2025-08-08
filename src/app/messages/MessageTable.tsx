"use client"

import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {useRouter, useSearchParams} from "next/navigation";
import {MessageDto} from "@/types";
import {Avatar, getKeyValue} from "@heroui/react";
import {Key, useCallback} from "react";
import {Card} from "@heroui/card";
import {Button} from "@heroui/button";
import {AiFillDelete} from "react-icons/ai";

type Props = {
    messages: MessageDto[];
}
export default  function MessageTable({messages}: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isOutbox = searchParams.get('container') === 'outbox';
    const columns = [
        {key: isOutbox ? 'recipientName' : 'senderName', label: isOutbox ? 'Recipient' : 'Sender'},
        {key: 'text', label: 'Message'},
        {key: 'createdAt', label: isOutbox ? 'Date sent' : 'Date Received'},
        {key: 'actions', label: 'Actions'},
    ]

    const handleRowSelect = (key: Key)=> {
        const message = messages.find(m => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}/chats` : `/members/${message?.senderId}/chats`;

        router.push(url);
    }
    const renderCell = useCallback((item: MessageDto, columnKey: keyof MessageDto) => {
            const cellValue = item[columnKey];
            switch (columnKey) {
                case 'recipientName':
                case 'senderName':
                    return (
                        <div className={`flex items-center gap-2 cursor-pointer ${!item.dateRead && !isOutbox ? 'font-semibold text-green-900' : ''}`}>
                            <Avatar alt='Image of member' src={(isOutbox ? item.recipientImage : item.senderImage) || 'images/user.png'} />
                            <span className='ml-2'>{cellValue}</span>
                        </div>
                    )
                case 'text':
                    return (
                        <div className='truncate'>
                            {cellValue}
                        </div>
                    )
                case 'createdAt':
                    return cellValue;
                default:
                    return (
                        <Button isIconOnly variant='light'>
                            <AiFillDelete size={24} className='text-red-500'/>
                        </Button>
                    )
            }
    }, [isOutbox])
    return (
        <>
           <Card className='flex flex-col gap-3 h-[80vh] overflow-auto'>
               <Table aria-label="Messages table" selectionMode="single" onRowAction={(key) => handleRowSelect(key)} className="w-full">
                   <TableHeader columns={columns}>
                       {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                   </TableHeader>
                   <TableBody items={messages}>
                       {(item) => (
                           <TableRow key={item.id}>
                               {(columnKey) => <TableCell>
                                   {renderCell(item, columnKey as keyof MessageDto)}
                               </TableCell>}
                           </TableRow>
                       )}
                   </TableBody>
               </Table>
           </Card>
        </>
    )
}