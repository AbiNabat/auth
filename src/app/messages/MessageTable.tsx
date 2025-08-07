"use client"

import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {useRouter, useSearchParams} from "next/navigation";
import {MessageDto} from "@/types";
import {getKeyValue} from "@heroui/react";
import {Key} from "react";
import {Card} from "@heroui/card";

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
    ]

    const handleRowSelect = (key: Key)=> {
        const message = messages.find(m => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}/chats` : `/members/${message?.senderId}/chats`;

        router.push(url);
    }
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
                               {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                           </TableRow>
                       )}
                   </TableBody>
               </Table>
           </Card>
        </>
    )
}