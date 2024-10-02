import { sql } from "@vercel/postgres";

// https://vercel.com/docs/storage/vercel-postgres/quickstart
export async function writeHandler(request, response) {
  try {
    // Get the information to be written to DB
    const customerName = request.query.customerName;
    const customerAge = request.query.customerAge;
    
    // Check that we have the required information
    if (!customerName) throw new Error("Missing customer name");
    if (!customerAge) throw new Error("Missing customer age");

    // Write to DB
  } catch(error) {
    return response.status(500).json({ error });
  }
}

export async function readHandler(request, response) {

}