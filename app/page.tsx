// Todos componentes do next por padrão são server components
// É um componente executado do lado do servidor por padrão
// No sever component, não consigo adicionar interações do lado do cliente diretamente
// Para adicionar interações do lado do cliente, é necessário usar client components
// Basta adicionar "use client" no topo do arquivo do componente que precisa ser client component
// "use client"

import { useState } from "react"
import { Button } from "@/app/_components/ui/button"

const Page = () => {
  const [] = useState()

  return <Button>Teste</Button>
}

export default Page
