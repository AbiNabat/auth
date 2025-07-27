import {getMemberById} from "@/app/actions/membersActions";
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";

export default async function MemberPage({params}: { params: { userId: string }}) {
    const { userId } = await params;
    const member = await getMemberById(userId);
    if (!member) {
        return <div>Member not found</div>
    }
    return (
        <>
        <CardHeader className='text-2xl font-semibold text-secondary'>
            Profile
        </CardHeader>
            <Divider />

            <CardBody>
                {member.description}
            </CardBody>
        </>
    );
}