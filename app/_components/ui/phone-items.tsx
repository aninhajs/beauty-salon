"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  // função para copiar o número de telefone para a área de transferência
  const copyToClipboard = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Número copiado com sucesso!")
  }
  return (
    <div className="flex items-center gap-2">
      {/* esquerda */}
      <SmartphoneIcon />
      <p className="text-sm text-gray-400">{phone}</p>

      <div className="ml-auto justify-between">
        {/* direita */}
        <Button variant="outline" onClick={() => copyToClipboard(phone)}>
          Copiar
        </Button>
      </div>
    </div>
  )
}

export default PhoneItem
