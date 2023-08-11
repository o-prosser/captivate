import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { eventsTable, insertEventSchema } from "@/drizzle/schema";

import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const { date, subjectId, ...jsonWithoutDate } = json;
    const body = insertEventSchema.parse({
      date: new Date(json.date),
      subjectId: subjectId === "" ? null : subjectId,
      ...jsonWithoutDate,
    });

    const event = await db
      .insert(eventsTable)
      .values(body)
      .returning({ id: eventsTable.id });
    console.log(event);
    revalidatePath("/calendar");
    return NextResponse.json({ event: event[0] });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
