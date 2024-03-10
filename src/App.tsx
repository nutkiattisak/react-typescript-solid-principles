import React from "react"
import { ShapeFactory } from "@/service/shape-factory"
import { Canvas } from "@/components/canvas"

const App: React.FC = () => {
  const rectangle = ShapeFactory.createShape("rectangle", 50, 100);
  const circle = ShapeFactory.createShape("circle", 75);

  return (
    <>
      <Canvas shapes={[rectangle]} />
      <Canvas shapes={[circle]} />
    </>
  )
}

export default App
