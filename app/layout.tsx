import './globals.css';
import NavigationBar from "./components/NavigationBar";

export const metadata = {
  title: "Spy Cats App",
  description: "CRUD for Spy Cats",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Spy Cats App</title>
        <meta name="description" content="CRUD for Spy Cats" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NavigationBar />
        {children}</body>
    </html>
  );
}
