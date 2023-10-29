import Header from 'src/components/Header'
import Footer from 'src/components/RegisterFooter'
type HeaderProps = {
  children: React.ReactNode
}
export default function MainLayout({ children }: HeaderProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
