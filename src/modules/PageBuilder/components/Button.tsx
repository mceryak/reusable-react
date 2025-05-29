import type { ReactNode } from "react"

interface Props {
  children: ReactNode;
  color?: 'white' | 'blue' | 'cyan' | 'green';
  twWidth?: string;
}

export default function Button({ color='white', twWidth='', children, ...props }: Props) {
  const twColor = color === 'white' 
    ? 'text-zinc-200' : color === 'blue'
    ? 'text-blue-400' : color === 'cyan'
    ? 'text-cyan-300' : color === 'green'
    ? 'text-green-500' : '';
  return (
    <button 
      {...props}
      className={`${twWidth} ${twColor} cursor-pointer py-2 px-4 border-2 rounded-lg text-blue-400 hover:scale-105 focus-visible:scale-105 outli transition-transform`}
    >
      {children}
    </button>
  )
}
