// By default all components in Next.js are server components. If you need some sort of interactive feature on the client side, you would have to turn it into a client component by using the "use client" directive at the top of the file.
// When used the "use client" directive, would bundle the entire component and the JavaScript and only run it in the browser.
// For SEO it is better to use server components, because it allows searchbots to follow navigation links and properly index them.
// If you need some sort of client side interaction it is better to create new, smaller components on the leaves of the component tree, which will provide that interactivity.
// You want to use server components as much as possible and only add interactivity when needed, because that will keep you JavaScript bundle as small as possible and thus improve performance of your application.
// "use client";

import "./globals.css";
import { Open_Sans } from "next/font/google";
import NavMenu from "./NavMenu";
import AuthProvider from "./AuthProvider";

const myFont = Open_Sans({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We couldn't use the SessionProvider component directly in the layout, because that component uses client side features, so we had to create a new separate client side component
    <AuthProvider>
      <html lang="en">
        <body className={myFont.className}>
          {/* By adding the NavMenu component here, it will be shared with all other pages and will be shown on every page in the entire application */}
          <NavMenu />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
