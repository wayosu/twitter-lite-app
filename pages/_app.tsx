import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";

export const metadata = {
  title: 'Twitter Lite App',
  description: 'A Twitter Lite App built with Next.js, Tailwind CSS, Prisma & MongoDB.',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
