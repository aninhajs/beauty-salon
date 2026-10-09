import { Avatar, AvatarImage } from "@/app/_components/ui/ui/avatar"
import { Badge } from "@/app/_components/ui/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/ui/card"

// TODO: receber agendamento como prop e renderizar dinamicamente
const BookingItem = () => {
  return (
    <>
      {/* Agenda */}

      <h2 className="mt-6 text-lg font-bold uppercase">Agendamentos</h2>

      <Card className="mt-6">
        <CardContent className="flex justify-between">
          {/* Div esdquerda */}
          <div className="flex flex-col gap-2 py-5">
            <Badge className="w-fit bg-purple-600 text-white">Confirmado</Badge>
            <h3 className="font-bold">Corte de Cabelo</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/Ana01.png" alt="Ana Jeize" />
              </Avatar>
              <p className="text-sm">Beauty Salon</p>
            </div>
          </div>

          {/* Div direita */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Setembro</p>
            <p className="text-2xl font-bold">30</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
