'use client'

import { Provider } from 'react-redux'
import { store } from "@/app/lib/store";
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  //Il provider rende redux store disponibile in ogni componente figlio che ne ha bisogno, quindi avvolge l'applicazione
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}