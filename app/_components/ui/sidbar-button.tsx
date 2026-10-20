"use client"

import { quickSearchList } from "@/app/_constants/search"
import { useSession } from "next-auth/react"
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { signIn, signOut } from "next-auth/react"
import { Avatar } from "@base-ui/react"

const SidebarButton = () => {
  const { data, status } = useSession()
  // Função para chamar o botão do google login
  const handleGoogleLogin = async () => {
    await signIn("google")
  }
  return (
    <Sheet>
      <SheetTrigger render={<Button size="icon" variant="outline" />}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left font-bold">Menu</SheetTitle>
        </SheetHeader>

        {status === "loading" ? (
          <div className="border-b border-solid py-5">
            <p className="font-bold">Carregando sessão...</p>
          </div>
        ) : status === "authenticated" ? (
          <div className="flex items-center gap-3 border-b border-solid py-5">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar.Root className="border-primary size-10 shrink-0 overflow-hidden rounded-full border-2">
                <Avatar.Image
                  src={data.user?.image ?? ""}
                  alt="Foto do usuário"
                  className="size-full rounded-full object-cover"
                />
                <Avatar.Fallback>
                  {data.user?.name?.charAt(0) ?? "U"}
                </Avatar.Fallback>
              </Avatar.Root>

              <div className="min-w-0">
                <p className="truncate font-bold">
                  {data.user?.name || "Usuário"}
                </p>
                <p className="text-muted-foreground truncate text-sm">
                  {data.user?.email || "email@example.com"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
            <h2 className="font-bold">Olá, faça seu login</h2>
            <Dialog>
              <DialogTrigger render={<Button size="icon" />}>
                <LogInIcon size={18} />
              </DialogTrigger>

              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Por favor, insira suas credenciais para acessar a
                    plataforma.
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline"
                  className="w-full gap-1 font-bold"
                  onClick={handleGoogleLogin}
                >
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
        )}

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

        {status === "authenticated" && (
          <div className="flex flex-col gap-1 py-5">
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => signOut()}
            >
              <LogOutIcon size={18} />
              Sair da conta
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default SidebarButton
