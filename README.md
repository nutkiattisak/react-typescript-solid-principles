# React TypeScript SOLID Principles

```ts
// file: src/interface/shape.interface.ts
export interface Shape {
  area(): number; // คำนวณพื้นที่รูปร่าง
  render(): React.ReactNode; // เรนเดอร์รูปร่างเป็น React element
}
```

ในไฟล์นี้เราได้กำหนด Interface Shape ซึ่งเป็นการใช้ Interface Segregation Principle (ISP) โดยแยกหน้าที่ออกเป็น Interface เฉพาะงาน คือ คำนวณพื้นที่และ Render รูปร่าง

```tsx
// file: src/service/rectangle.tsx
import { Shape } from "@/interface/shape.interface"

export class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area() {
    return this.width * this.height;
  }

  render() {
    return <rect width={this.width} height={this.height} />
  }
}
```

Class Rectangle ถูกสร้างขึ้นโดยยึดหลัก Single Responsibility Principle (SRP) โดยมีหน้าที่รับผิดชอบแค่คำนวณพื้นที่และ Render สี่เหลี่ยมผืนผ้า และ class นี้ implement จาก Interface Shape เพื่อให้เป็นไปตาม Liskov Substitution Principle (LSP) ที่ว่า class ลูกควรสามารถใช้งานแทน class พ่อได้ทุกสถานการณ์

```tsx
// file: src/service/shape-factory.tsx
import { Shape } from "@/interface/shape.interface"
import { Rectangle } from "@/service/rectangle"
import { Circle } from "@/components/circle"

export class ShapeFactory {
  static createShape(type: string, ...args: number[]): Shape {
    if (type === "rectangle") {
      return new Rectangle(args[0], args[1])
    } else if (type === "circle") {
      return new Circle(args[0])
    }
    throw new Error("Invalid shape type")
  }
}
```

Class ShapeFactory ถูกสร้างขึ้นตาม Open/Closed Principle (OCP) ที่ว่าซอฟต์แวร์เอนทิตี้ควรเปิดให้สามารถขยายความสามารถได้ แต่ปิดไม่ให้แก้ไขซอร์สโค้ดเดิม โดยเราสามารถเพิ่มประเภทของรูปร่างใหม่ได้โดยไม่ต้องแก้ไขโค้ดของ ShapeFactory เอง

```tsx
// file: src/components/canvas.tsx
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
```

Components Canvas มีหน้าที่รับ Array ของ Shape และเรนเดอร์รูปร่างเหล่านั้นออกมา โดยไม่จำเป็นต้องรู้รายละเอียดว่ารูปร่างนั้นคืออะไร เนื่องจากมันได้ทำงานผ่านอินเทอร์เฟส Shape ซึ่งเป็นการใช้ Dependency Inversion Principle (DIP) ที่ว่าคลาสระดับสูง (Canvas) ไม่ควรพึ่งพาคลาสระดับล่าง (Rectangle หรือ Circle) โดยตรง แต่ควรพึ่งพาอินเทอร์เฟสร่วมกัน

```tsx
// file: App.tsx
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

```

ในไฟล์ App.tsx เราใช้ ShapeFactory ในการสร้างวัตถุรูปร่างแบบต่างๆ และส่งไปให้คอมโพเนนท์ Canvas เพื่อเรนเดอร์ออกมา โดยไม่จำเป็นต้องรู้รายละเอียดว่ารูปร่างนั้นคืออะไร ซึ่งเป็นการใช้ Open/Closed Principle (OCP) ที่ว่าเราสามารถเพิ่มรูปร่างใหม่ๆ ได้โดยไม่ต้องแก้ไขโค้ดของ App เอง
