import { Shape } from "@/interface/shape.interface"

export class Circle implements Shape {
  constructor(private radius: number) {}

  area() {
    return Math.PI * this.radius ** 2
  }

  render() {
    return <circle cx={this.radius} cy={this.radius} r={this.radius} />
  }
}
