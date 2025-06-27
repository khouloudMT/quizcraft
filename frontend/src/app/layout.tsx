'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ApolloWrapper } from "../lib/apollo";
import { AuthProvider } from "../lib/AuthContext";
import NavBar from "../components/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ApolloWrapper>
          <AuthProvider>
            {!hideNavbar && <NavBar />}
            {children}
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}