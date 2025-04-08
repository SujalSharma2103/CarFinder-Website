import { NextResponse } from "next/server"
import { cars } from "./data"

export async function GET() {
  // Add proper headers and status code
  return NextResponse.json(cars, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
