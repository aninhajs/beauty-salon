import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "@/app/_components/ui/ui/card"
import { Button } from "@/app/_components/ui/ui/button"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-41.75 py-0">
      <CardContent className="p-0 px-1 pt-1">
        {/* Imagem do barbershop */}
        <div className="relative h-39.75 w-full rounded-2xl">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          {/* Estrelas de avaliação do barbershop */}
          <Badge variant="secondary" className="absolute top-2 left-2">
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="ml-1 text-sm font-medium">5,0</p>
          </Badge>
        </div>

        {/* Texto do barbershop */}
        <div className="py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>

          <Button variant="secondary" className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
