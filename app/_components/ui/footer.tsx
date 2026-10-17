import { Card, CardContent } from "@/app/_components/ui/ui/card"

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-500">
            &copy; 2026 Beauty Salon. Todos os direitos reservados.
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
