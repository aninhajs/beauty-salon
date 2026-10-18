import { Card, CardContent } from "@/app/_components/ui/ui/card"
import Image from "next/image"
import SidebarButton from "@/app/_components/ui/sidbar-button"

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

        <SidebarButton />
      </CardContent>
    </Card>
  )
}

export default Header
