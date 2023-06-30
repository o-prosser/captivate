import { Button, Heading, Text } from "@/ui";
import { getCurrentUser } from "@/util/session";
import { format } from "date-fns";
import weeks from "@/data/weeks.json";
import Link from "next/link";

const getCurrentWeek = () => {
  const currentDate = new Date();
  const diff =
    currentDate.getDate() -
    currentDate.getDay() +
    (currentDate.getDay() === 0 ? -6 : 1);
  const startOfWeek = new Date(currentDate.setDate(diff)).setHours(0, 0, 0, 0);

  const currentWeek = weeks.find(
    (week) => new Date(week.date).setHours(0, 0, 0, 0) == startOfWeek,
  );

  return currentWeek?.week;
};

const Dashboard = async () => {
  const user = await getCurrentUser();
  const currentWeek = getCurrentWeek();

  return (
    <>
      <Text className="text-muted-foreground space-x-2 flex">
        <span>{format(new Date(), "EEEE do MMMM, y")}</span>
        {currentWeek ? (
          <>
            <span>&bull;</span>
            {currentWeek === 0 ? (
              <span>Half Term</span>
            ) : (
              <Button asChild variant="link" size={null}>
                <Link href="/timetable">Week {currentWeek}</Link>
              </Button>
            )}
          </>
        ) : (
          ""
        )}
      </Text>
      <Heading className="mt-3">
        Hello{user?.name ? `, ${user.name}` : ""}!
      </Heading>
    </>
  );
};

export default Dashboard;
