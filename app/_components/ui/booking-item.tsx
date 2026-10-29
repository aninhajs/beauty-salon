import { Avatar, AvatarImage } from "@/app/_components/ui/ui/avatar"
import { Badge } from "@/app/_components/ui/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/ui/card"
import { Booking, Prisma } from "@prisma/client"
import { isFuture } from "date-fns"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

// TODO: receber agendamento como prop e renderizar dinamicamente
const BookingItem = ({ booking }: BookingItemProps) => {
  const inConfirmed = isFuture(booking.date)
  return (
    <>
      {/* Agenda */}

      <Card className="mt-4 min-w-full">
        <CardContent className="flex justify-between">
          {/* Div esdquerda */}
          <div className="flex flex-col gap-2 py-5">
            <Badge
              className="w-fit bg-purple-600 text-white"
              variant={inConfirmed ? "default" : "secondary"}
            >
              {inConfirmed ? "Confirmado" : "finalizado"}
            </Badge>
            <h3 className="font-bold">{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <p className="text-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>

          {/* Div direita */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", { locale: ptBR })}
            </p>
            <p className="text-2xl font-bold">
              {format(booking.date, "dd", { locale: ptBR })}
            </p>
            <p className="text-sm">
              {format(booking.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
