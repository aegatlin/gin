import { Header } from '..'

export function Page({ children }) {
  return (
    <>
      <Header.Main />
      <div className="flex flex-col items-center mt-16">{children}</div>
    </>
  )
}
