import {getMemberById} from "@/app/actions/membersActions";
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";
import CardInnerWrapper from "@/components/CardInnerWrapper";

export default async function MemberPage({params}: { params: { userId: string }}) {
    const { userId } = await params;
    const member = await getMemberById(userId);
    if (!member) {
        return <div>Member not found</div>
    }
    return (
      <CardInnerWrapper header='Profile' body={<div>{member.description}</div>} />
    );
}