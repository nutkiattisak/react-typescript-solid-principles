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