// Todos componentes do next por padrão são server components
// É um componente executado do lado do servidor por padrão
// No sever component, não consigo adicionar interações do lado do cliente diretamente
// Para adicionar interações do lado do cliente, é necessário usar client components
// Basta adicionar "use client" no topo do arquivo do componente que precisa ser client component
import { db } from "@/app/lib/prisma"
import BarbershopItem from "@/app/_components/ui/Barbershop-item"

// import { useState } from "react"
import { Button } from "@/app/_components/ui/ui/button"
import Header from "@/app/_components/ui/header"
import { Input } from "@/app/_components/ui/ui/input"
import Image from "next/image"
import { Avatar, AvatarImage } from "@/app/_components/ui/ui/avatar"
import { Badge } from "@/app/_components/ui/ui/badge"
import { SearchIcon } from "lucide-react"
import { Card, CardContent } from "@/app/_components/ui/ui/card"

const Home = async () => {
  // Chamando meu banco
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      <Header />

      {/* Texto */}
      <div className="p-5 text-xl font-bold">
        <h2 className="text-xl font-bold">Olá, Ana jeize!</h2>
        <p>Quarta-feira, 30 de setembro.</p>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input
            className="border border-gray-200"
            placeholder="Faça sua busca..."
          />
          <Button className="ml-auto bg-purple-600">
            <SearchIcon />
          </Button>
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

        <h2 className="mt-6 text-lg font-bold uppercase">Agendamentos</h2>

        <Card className="mt-6">
          <CardContent className="flex justify-between">
            {/* Div esdquerda */}
            <div className="flex flex-col gap-2 py-5">
              <Badge className="w-fit bg-purple-600 text-white">
                Confirmado
              </Badge>
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

        <h2 className="mt-6 text-lg font-bold uppercase">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
