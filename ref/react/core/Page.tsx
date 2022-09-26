import { Header } from './Header'

export function Page({ children }) {
  return (
    <>
      <Header />
      <div className="mt-16 flex flex-col items-center">{children}</div>
    </>
  )
}
