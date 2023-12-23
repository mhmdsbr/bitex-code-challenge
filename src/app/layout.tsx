import { Providers } from './providers'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss';

export const metadata = {
  title: 'React Form - ERC20 - Mint | Transfer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
