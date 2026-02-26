import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  as?: 'button'
  href?: never
  download?: never
}

interface ButtonAsAnchor extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {
  as: 'a'
  href: string
  download?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variants = {
  primary:
    'bg-primary-600 text-primary-50 hover:bg-primary-700',
  secondary:
    'bg-surface-inset text-secondary-900 hover:bg-secondary-200',
  ghost:
    'bg-transparent text-secondary-700 hover:bg-surface-inset',
  outline:
    'border-2 border-primary-600 text-primary-600 bg-transparent hover:bg-primary-100',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  as,
  href,
  download,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (as === 'a' && href) {
    const { type, form, formAction, ...anchorProps } = props as ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <a href={href} download={download} className={cls} {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
