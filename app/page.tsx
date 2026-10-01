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
import { SearchIcon } from "lucide-react"

const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5 text-xl font-bold">
        <h2 className="text-xl font-bold">Olá, Ana jeize!</h2>
        <p>Quarta-feira, 30 de setembro.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            alt="Banner"
            style={{ objectFit: "cover" }}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
