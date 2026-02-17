export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  const res = await fetch(
    https://api.pexels.com/v1/search?query=${query}&per_page=9,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY as string
      }
    }
  )

  const data = await res.json()
  return Response.json(data)
}
