// frontend/src/app/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voyager',
  description: "Aryan's personal chatbot that knows everything about him",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
