import React, { ReactNode, useEffect, useRef } from "react"
import './styles.css'

interface IProps {
  children: ReactNode
  hiddenOnScroll?: boolean
  classNameShowEffect?: string
  classNameHiddenEffect?: string
}

export function ScrollReveal({ 
  children, 
  hiddenOnScroll, 
  classNameShowEffect = "show", 
  classNameHiddenEffect = "hidden" 
}: IProps) {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const observerRef = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && entry.target.classList.contains(classNameHiddenEffect)) {
      entry.target.classList.add(classNameShowEffect)
    }

    if (!entry.isIntersecting && hiddenOnScroll && entry.target.classList.contains(classNameShowEffect)) {
      entry.target.classList.remove(classNameShowEffect)
    }
  })

  useEffect(() => {
    if (containerRef.current && document.readyState === "complete") {
      const element = containerRef.current.getElementsByClassName(classNameHiddenEffect)[0]

      if (element) {
        observerRef.observe(element)
      }
    }
  }, [containerRef.current])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}
