import BarbershopItem from "@/app/_components/ui/Barbershop-item"
import Header from "@/app/_components/ui/header"
import Search from "@/app/_components/ui/search"
import { db } from "@/app/lib/prisma"

interface BarbershopsPageProps {
  searchParams: Promise<{
    title?: string
    service?: string
  }>
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const params = await searchParams
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        params?.title
          ? {
              name: {
                contains: params?.title,
                mode: "insensitive",
              },
            }
          : {},
        params.service
          ? {
              services: {
                some: {
                  name: {
                    contains: params.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para &quot;{params?.title || params?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
