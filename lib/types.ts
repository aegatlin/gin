export interface GinInput {
  flags: string
  description: string
  default?: string
}

export interface GinAction {
  description: string
  inputs?: GinInput[]
  action: (options?: any) => void
}

export interface GinCommand {
  name: string
  description?: string
  subCommands?: GinCommand[]
  actions?: GinAction[]
}
