import React from "react"
import { Shape } from "@/interface/shape.interface"

interface CanvasProps {
  shapes: Shape[]
}

export const Canvas: React.FC<CanvasProps> = ({ shapes }) => {
  return (
    <svg>
      {shapes.map((shape, index) => (
        <g key={index}>{shape.render()}</g>
      ))}
    </svg>
  )
}