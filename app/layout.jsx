import "../styles/globals.css"
import Nav from "../components/Nav"


export const metadata = {
  title: 'BeatleMania',
  description: 'Test your knowledge of beatles album covers',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
          <div className="main">
            <div className="gradient"/>
          </div>
          <main className="app">
            <Nav/>
            {children}   
          </main>
      </body>
    </html>
  )
}
