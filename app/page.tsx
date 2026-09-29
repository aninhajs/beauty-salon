// Todos componentes do next por padrão são server components
// É um componente executado do lado do servidor por padrão
// No sever component, não consigo adicionar interações do lado do cliente diretamente
// Para adicionar interações do lado do cliente, é necessário usar client components
// Basta adicionar "use client" no topo do arquivo do componente que precisa ser client component
"use client";

import { useState } from "react";

const Page = () => {
  const [] = useState();

  return (
    <div>
      <h1 className="text-3xl font-bold">Beauty Salon</h1>
    </div>
  );
};

export default Page;
