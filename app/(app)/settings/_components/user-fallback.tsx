import * as Card from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";

const UserFallback = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Update your information</Card.Title>
        <Card.Description>Update your name or email address.</Card.Description>
      </Card.Header>

      <Card.Content>
        <Skeleton className="w-[40px] h-[17.5px] mb-1" />
        <Skeleton className="h-10 w-full" />

        <Skeleton className="w-[93px] h-[17.5px] mb-1 mt-6" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-5 mt-1 w-3/5" />
      </Card.Content>

      <Card.Footer>
        <Skeleton className="w-[105px] h-10" />
      </Card.Footer>
    </Card.Root>
  );
};

export default UserFallback;
