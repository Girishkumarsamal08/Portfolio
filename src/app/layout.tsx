import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import ClientLayout from "@/components/ClientLayout"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata = {
  title: "Girish's Portfolio",
  description: "Portfolio of Girish Kumar Samal — AI Developer, building intelligent systems, automation tools, and scalable web applications.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} bg-black text-white antialiased cursor-none`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}