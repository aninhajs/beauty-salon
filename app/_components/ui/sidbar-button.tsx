"use client"

import { quickSearchList } from "@/app/_constants/search"
import Image from "next/image"
import Link from "next/link"
import {
  MenuIcon,
  HomeIcon,
  Calendar1Icon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button, buttonVariants } from "./button"
import { Avatar, AvatarImage } from "./ui/avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

const SidebarButton = () => {
  return (
    <Sheet>
      <SheetTrigger render={<Button size="icon" variant="outline" />}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left font-bold">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          <h2 className="font-bold">Olá, faça seu login</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <LogInIcon size={18} />
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%]">
              <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                  Por favor, insira suas credenciais para acessar a plataforma.
                </DialogDescription>
              </DialogHeader>

              <Button variant="outline" className="w-full gap-1 font-bold">
                <Image
                  src="/google.svg"
                  height={18}
                  width={18}
                  alt="Login Icon"
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* <div className="flex items-center border-b border-solid py-5">
          <Avatar>
            <AvatarImage src="/Ana01.png" alt="User Avatar" />
          </Avatar>

          <div className="ml-4">
            <p className="font-bold">Ana Jeize</p>
            <p className="text-muted-foreground text-sm">ana@example.com</p>
          </div>
        </div> */}

        <div className="flex flex-col gap-1 border-b border-solid py-5">
          <SheetClose
            render={<Link href="/" />}
            nativeButton={false}
            className={buttonVariants({
              variant: "ghost",
              className: "w-full justify-start gap-2",
            })}
          >
            <HomeIcon size={18} />
            Inicio
          </SheetClose>

          <Button variant="ghost" className="justify-start gap-2">
            <Calendar1Icon size={18} />
            Agendamentos
          </Button>
        </div>

        <div className="flex flex-col gap-1 border-b border-solid py-5">
          {quickSearchList.map((option) => (
            <Button
              key={option.title}
              className="justify-start gap-2"
              variant="ghost"
            >
              <Image
                src={option.imageUrl}
                height={18}
                width={18}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-1 py-5">
          <Button variant="ghost" className="justify-start gap-2">
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarButton
