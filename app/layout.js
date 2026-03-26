import "./globals.css";

export const metadata = {
  title: "MicroMind",
  description: "Execution system for builders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}