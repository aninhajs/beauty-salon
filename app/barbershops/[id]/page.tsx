import { db } from "@/app/lib/prisma"
import { Button } from "@base-ui/react"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarberShops {
  params: Promise<{
    id: string
  }>
}
const BarberShops = async ({ params }: BarberShops) => {
  const { id } = await params
  const BarberShopPage = await db.barbershop.findUnique({
    where: {
      id,
    },
  })

  if (!BarberShopPage) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-62.5 w-full">
        <Image
          src={BarberShopPage.imageUrl}
          alt={BarberShopPage.name}
          fill
          className="object-cover"
        />

        <Link
          href="/"
          aria-label="Voltar para a página inicial"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 absolute top-4 left-4 inline-flex h-9 w-9 items-center justify-center rounded-md"
        >
          <ChevronLeftIcon aria-hidden="true" />
        </Link>

        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-md">
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-2xl font-bold">{BarberShopPage.name}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-primary h-4 w-4" />
          <p className="ml-1 text-sm text-gray-400">{BarberShopPage.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="text-primary fill-primary h-4 w-4" />
          <p className="ml-1 text-sm text-gray-400">5,0</p>
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="mb-3 text-lg font-bold">Sobre nós</h2>
        <p className="text-justify text-sm text-gray-400">
          {BarberShopPage.description}
        </p>
      </div>
    </div>
  )
}

export default BarberShops
