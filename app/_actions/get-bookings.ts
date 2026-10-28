"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ serviceId, date }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
