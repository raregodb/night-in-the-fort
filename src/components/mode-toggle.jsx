import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="size-4.5 scale-100 rotate-0 dark:scale-0 dark:-rotate-90 transition-all" />
      <Moon className="absolute size-4.5 scale-0 rotate-90 dark:scale-100 dark:rotate-0 transition-all" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
