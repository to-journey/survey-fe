"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Toaster } from "./toaster"
import { ColorModeProvider } from "./color-mode"
import type { ColorModeProviderProps } from "./color-mode"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
      <Toaster />
    </ChakraProvider>
  )
}
