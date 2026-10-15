import { BarberShopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "@/app/_components/ui/ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  services: BarberShopService
}

const ServiceItem = ({ services }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-2 p-3">
        <div className="relative h-27.5 min-h-27.5 w-27.5 max-w-27.5">
          <Image
            src={services.imageUrl}
            alt={services.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{services.name}</h2>
          <p className="text-sm text-gray-500">{services.description}</p>
          <div className="flex items-center">
            <p className="text-md text-primary font-bold">
              ${services.price.toFixed(2)}
            </p>

            <Button variant="secondary" className="ml-4" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
