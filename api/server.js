import { sql } from "@vercel/postgres";

// https://vercel.com/docs/storage/vercel-postgres/quickstart
export default async function handler(request, response) {
  
  // console.table(request);
  try {
    // Get the information to be written to DB
    const bookName = request.query.bookName;
    const bookAuthor = request.query.bookAuthor;
    const bookPrice = request.query.bookPrice;
    const bookGenre = request.query.bookGenre;
    const customerName = request.query.customerName;
    const customerEmail = request.query.customerEmail;
    const customerPhone = request.query.customerPhone;

    // Check that we have the required information
    if (!bookName) throw new Error("Missing book name");
    if (!bookAuthor) throw new Error("Missing book author");
    if (!bookPrice) throw new Error("Missing book price");
    if (!bookGenre) throw new Error("Missing book genre");
    if (!customerName) throw new Error("Missing customer name");
    if (!customerEmail) throw new Error("Missing customer email");
    if (!customerPhone) throw new Error("Missing customer phone");

    // Write to DB
    await sql`
      INSERT INTO Books (name, genre) VALUES (
        ${bookName}, 
        ${bookAuthor},
        ${bookPrice},
        ${bookGenre},
        ${customerName},
        ${customerEmail},
        ${customerPhone}
      );
    `;
  } catch(error) {
    return response.status(500).json({ error });
  }

  const books = await sql`
    SELECT * FROM Books;
  `;
  return response.status(200).json({ books });
}

// Test URL to add to DB
// http://localhost:3000/api/server?bookName=testBook&bookGenre=testGenre