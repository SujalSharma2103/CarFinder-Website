import { NextResponse } from "next/server"
import { cars } from "../data"

export async function GET(request, { params }) {
  const { id } = params

  // Find the car with the matching ID
  const car = cars.find((car) => car.id === id)

  if (!car) {
    return NextResponse.json(
      { error: "Car not found" },
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }

  return NextResponse.json(car, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
