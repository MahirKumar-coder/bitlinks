import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  const body = await request.json()
  const client = await clientPromise
  const db = client.db("bitlinks")
  const collection = db.collection("url")

  // MongoDB me document insert karein
  const result = await collection.insertOne({
    url: body.url,
    shorturl: body.shorturl
  })

  // Inserted document ka ID return karein, ya ek success message
  return Response.json({
    message: 'URL generated successfully!',
    // Yahan generated short URL bhi bhej sakte hain
    shorturl: body.shorturl
  })
}