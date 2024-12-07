import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  className?: string
  children: React.ReactNode
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
}

const AccordionContext = React.createContext<{
  openItems: string[]
  toggle: (value: string) => void
}>({
  openItems: [],
  toggle: () => {},
})

export function Accordion({ 
  type = 'single', 
  collapsible = true, 
  children, 
  className 
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggle = React.useCallback((value: string) => {
    if (type === 'single') {
      setOpenItems(prev => 
        prev[0] === value && collapsible ? [] : [value]
      )
    } else {
      setOpenItems(prev => 
        prev.includes(value) 
          ? prev.filter(item => item !== value)
          : [...prev, value]
      )
    }
  }, [type, collapsible])

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn('space-y-1', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn('border-b', className)}>
      {children}
    </div>
  )
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { openItems, toggle } = React.useContext(AccordionContext)
  const value = React.useContext(AccordionItemValueContext)

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline',
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
          openItems.includes(value) && 'rotate-180'
        )}
      />
    </button>
  )
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { openItems } = React.useContext(AccordionContext)
  const value = React.useContext(AccordionItemValueContext)
  const isOpen = openItems.includes(value)

  return (
    <div
      className={cn(
        'overflow-hidden transition-all',
        isOpen ? 'max-h-96' : 'max-h-0',
        className
      )}
    >
      <div className="pb-4 pt-0">
        {children}
      </div>
    </div>
  )
}

const AccordionItemValueContext = React.createContext<string>('')

export function AccordionRoot({ children, ...props }: AccordionProps) {
  return <Accordion {...props}>{children}</Accordion>
}

export function AccordionItemRoot({ value, children, ...props }: AccordionItemProps) {
  return (
    <AccordionItemValueContext.Provider value={value}>
      <AccordionItem value={value} {...props}>
        {children}
      </AccordionItem>
    </AccordionItemValueContext.Provider>
  )
}
