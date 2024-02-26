import AuthProvider from "./context/AuthProvider"
import "../styles/globals.css"

export const metadata = {
  title: 'BeatleMania',
  description: 'Test your knowledge of beatles album covers',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="main">
            <div className="gradient"/>
          </div>
          <main className="app">
            {children}   
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
