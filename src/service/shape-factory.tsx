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