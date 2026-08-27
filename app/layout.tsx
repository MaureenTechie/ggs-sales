import "./globals.css";

export const metadata = {
  title: "Geoda Green Suppliers Limited",
  description: "Geoda Green Suppliers Sales & Invoicing System",
};

export default function RootLayout({children}) {
 return(
  <html lang="en">
    <body>{children}</body>
  </html>
 );
}