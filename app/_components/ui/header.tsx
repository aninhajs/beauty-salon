import { Card, CardContent } from "@/app/_components/ui/card"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        {/* <Image
          src="/logo(1).png"
          alt="Beauty Salon Logo"
          width={18}
          height={120}
        /> */}
        <h1>Beauty Salon</h1>

        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
