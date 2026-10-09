import { Card, CardContent } from "@/app/_components/ui/ui/card"
import Image from "next/image"
import { Button } from "@/app/_components/ui/ui/button"
import { MenuIcon } from "lucide-react"

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

        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
