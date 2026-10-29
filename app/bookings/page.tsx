import Header from "@/app/_components/ui/header"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { db } from "../lib/prisma"
import BookingItem from "../_components/ui/booking-item"

const Booking = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return null
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as { id: string }).id,
      date: {
        gte: new Date(),
      },
    },

    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as { id: string }).id,
      date: {
        lt: new Date(),
      },
    },

    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })
  return (
    <>
      <Header />
      <div className="space-y-4 p-5">
        <h1 className="text-xl font-bold">Agendamentos </h1>
        <h2 className="text-lg font-semibold">Confirmados</h2>

        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
        <h2 className="text-lg font-semibold">Finalizados</h2>
        {concludedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  )
}

export default Booking
