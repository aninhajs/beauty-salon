import { Card, CardContent } from "@/app/_components/ui/ui/card"
import Image from "next/image"
import Link from "next/link"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/ui/avatar"
import { Button, buttonVariants } from "@/app/_components/ui/ui/button"
import { Calendar1Icon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/app/_components/ui/ui/sheet"
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/_components/ui/ui/sheet"
import { quickSearchList } from "@/app/_constants/search"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src="/logo-02.png"
          alt="Beauty Salon Logo"
          width={120}
          height={120}
        />
        {/* <h1>Beauty Salon</h1> */}

        <Sheet>
          <SheetTrigger render={<Button size="icon" variant="outline" />}>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left font-bold">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center border-b border-solid py-5">
              <Avatar>
                <AvatarImage src="/Ana01.png" alt="User Avatar" />
              </Avatar>

              <div className="ml-4">
                <p className="font-bold">Ana Jeize</p>
                <p className="text-muted-foreground text-sm">ana@example.com</p>
              </div>
            </div>

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
      </CardContent>
    </Card>
  )
}

export default Header
