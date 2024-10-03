import { sql } from "@vercel/postgres";

// https://vercel.com/docs/storage/vercel-postgres/quickstart
export default async function writeHandler(request, response) {
  try {
    // Get the information to be written to DB
    const bookName = request.query.bookName;
    const bookGenre = request.query.bookGenre;

    // Check that we have the required information
    if (!bookName) throw new Error("Missing customer name");
    if (!bookGenre) throw new Error("Missing customer age");
    // Write to DB
    await sql`
      INSERT INTO Books (name, genre) VALUES (
        ${bookName}, 
        ${bookGenre}
      );
    `;
  } catch(error) {
    return response.status(500).json({ error });
  }

  const books = await sql`
    SELECT * FROM Books;
  `;
  return response.status(200).json({ books});
}

// Test URL to add to DB
// http://localhost:3000/api/server?bookName=fluffy&bookGenre=John

// export async function readHandler(request, response) {
  
// }