import { Avatar, AvatarImage } from "@/app/_components/ui/ui/avatar"
import Image from "next/image"
import { Badge } from "@/app/_components/ui/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/ui/card"
import { Booking, Prisma } from "@prisma/client"
import { isFuture } from "date-fns"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import BookingSummary from "./booking-summary"
import PhoneItem from "./phone-items"

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
  const {
    service: { barbershop },
  } = booking
  const inConfirmed = isFuture(booking.date)
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        {/* Agenda */}

        <Card className="mt-4 min-w-full">
          <CardContent className="flex justify-between">
            {/* Div esdquerda */}
            <div className="flex flex-col gap-2 py-5">
              <Badge
                className="w-fit"
                variant={inConfirmed ? "default" : "secondary"}
              >
                {inConfirmed ? "Confirmado" : "finalizado"}
              </Badge>
              <h3 className="font-bold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
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
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Detalhes do Agendamento</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-45 w-full items-end">
          <Image
            src="/public/map(1).png"
            alt={`Mapa do local do agendamento ${barbershop.name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-xl object-cover"
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 mb-3">
          <Badge
            className="w-fit"
            variant={inConfirmed ? "default" : "secondary"}
          >
            {inConfirmed ? "Confirmado" : "finalizado"}
          </Badge>
        </div>

        <BookingSummary
          service={booking.service}
          barbershop={barbershop}
          selectedDate={booking.date}
        />

        <div className="space-y-3">
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
