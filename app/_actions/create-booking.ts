"use server"

import { revalidatePath } from "next/cache"
import { db } from "../lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Usuário não autenticado")
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  await db.booking.create({
    data: {
      ...params,
      userId: user.id,
    },
  })
  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}
