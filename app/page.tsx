// Todos componentes do next por padrão são server components
// É um componente executado do lado do servidor por padrão
// No sever component, não consigo adicionar interações do lado do cliente diretamente
// Para adicionar interações do lado do cliente, é necessário usar client components
// Basta adicionar "use client" no topo do arquivo do componente que precisa ser client component
"use client"

import { useState } from "react"
import { Button } from "@/app/_components/ui/button"
import Header from "@/app/_components/ui/header"
import { Input } from "@base-ui/react"
import Image from "next/image"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Badge } from "@/app/_components/ui/badge"
import { SearchIcon } from "lucide-react"
import { Card, CardContent } from "./_components/ui/card"

const Home = () => {
  return (
    <div>
      <Header />

      {/* Texto */}
      <div className="p-5 text-xl font-bold">
        <h2 className="text-xl font-bold">Olá, Ana jeize!</h2>
        <p>Quarta-feira, 30 de setembro.</p>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-02.png"
            fill
            alt="Banner"
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
        </div>

        {/* Agenda */}
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
      </div>
    </div>
  )
}

export default Home
