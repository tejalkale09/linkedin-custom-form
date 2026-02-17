export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("query")

    if (!query) {
      return Response.json(
        { error: "Query is required" },
        { status: 400 }
      )
    }

    const res = await fetch(
      https://api.pexels.com/v1/search?query=${query}&per_page=9,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY as string,
        },
      }
    )

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch images" },
        { status: res.status }
      )
    }

    const data = await res.json()
    return Response.json(data)

  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
