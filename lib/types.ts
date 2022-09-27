interface GinOption {
  flags: string
  description: string
  default?: string
}

export interface GinAction {
  description: string
  action: (options?: any) => void
}

export interface GinCommand {
  name: string
  description?: string
  subCommands?: GinCommand[]
  options?: GinOption[]
  actions?: GinAction[]
}
