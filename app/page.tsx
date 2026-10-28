// Todos componentes do next por padrão são server components
// É um componente executado do lado do servidor por padrão
// No sever component, não consigo adicionar interações do lado do cliente diretamente
// Para adicionar interações do lado do cliente, é necessário usar client components
// Basta adicionar "use client" no topo do arquivo do componente que precisa ser client component
import { db } from "@/app/lib/prisma"
import BarbershopItem from "@/app/_components/ui/Barbershop-item"

// import { useState } from "react"
import { quickSearchList } from "@/app/_constants/search"
import { buttonVariants } from "@/app/_components/ui/ui/button"
import Search from "@/app/_components/ui/search"
import Header from "@/app/_components/ui/header"
import Image from "next/image"
import Link from "next/link"
import BookingItem from "./_components/ui/booking-item"

const Home = async () => {
  // Chamando meu banco
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
    take: 5,
  })

  return (
    <div>
      <Header />

      {/* Texto */}
      <div className="p-5 text-xl font-bold">
        <h2 className="text-xl font-bold">Olá, Ana jeize!</h2>
        <p>Quarta-feira, 30 de setembro.</p>

        {/* Busca */}
        <div className="mt-6">
          <Search />
        </div>

        {/* Busca rápida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchList.map((item) => (
            <Link
              key={item.title}
              href={`/barbershops?service=${encodeURIComponent(item.title)}`}
              className={buttonVariants({
                variant: "secondary",
                className: "gap-2",
              })}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={14}
                height={16}
              />
              {item.title}
            </Link>
          ))}
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-37.5 w-full">
          <Image
            src="/banner-02.png"
            fill
            alt="Banner"
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
        </div>

        {/* Agenda */}

        <BookingItem />

        <h2 className="mt-6 text-lg font-bold uppercase">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mt-6 text-lg font-bold uppercase">Populares</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
