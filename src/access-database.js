// import { sql } from "@vercel/postgres";
import { LitElement, css, html } from "lit";
import '../api/server.js';
import handler from "../api/server.js";
import { sql } from "@vercel/postgres";

export class AccessDatabase extends LitElement {
  constructor() {
    super();
    this.header = "Header text";
    this._tableName = null;
    this.developerMode = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .access-database-wrapper {
        border: 1px solid black;
        padding: 12px;
        margin: 12px 0px;
      }
    `;
  }

  writeDatabase(e) {
    e.preventDefault();
    // get the value from the input fields
    const BOOK_NAME = this.shadowRoot.querySelector("#book-name").value;
    const BOOK_AUTHOR = this.shadowRoot.querySelector("#book-author").value;
    const BOOK_PRICE = this.shadowRoot.querySelector("#book-price").value;
    const BOOK_GENRE = this.shadowRoot.querySelector("#book-genre").value;
    const CUSTOMER_NAME = this.shadowRoot.querySelector("#customer-name").value;
    const CUSTOMER_EMAIL = this.shadowRoot.querySelector("#customer-email").value;
    const CUSTOMER_PHONE = this.shadowRoot.querySelector("#customer-phone").value;

    // check that we have the required information
    if (!BOOK_NAME) {
      alert("Please enter a book name");
      return;
    }
    if (!BOOK_AUTHOR) {
      alert("Please enter a book author");
      return;
    }
    if (!BOOK_PRICE) {
      alert("Please enter a book price");
      return;
    }
    if (BOOK_GENRE === "none") {
      alert("Please enter a book genre");
      return;
    }
    if (!CUSTOMER_NAME) {
      alert("Please enter a customer name");
      return;
    }
    if (!CUSTOMER_EMAIL) {
      alert("Please enter a customer email");
      return;
    }
    if (!CUSTOMER_PHONE) {
      alert("Please enter a customer phone");
      return;
    }

    // Send to DB
    const query = [ {
      "bookName": BOOK_NAME,
      "bookAuthor": BOOK_AUTHOR,
      "bookPrice": BOOK_PRICE,
      "bookGenre": BOOK_GENRE,
      "customerName": CUSTOMER_NAME,
      "customerEmail": CUSTOMER_EMAIL,
      "customerPhone": CUSTOMER_PHONE
    }];

    handler(query);

    if (this.developerMode) console.table(query);
  }

  // TODO figure out if this would work here or if it needs to be in server.js
  async readDatabase() {
    const books = await sql`
      SELECT * FROM Books;
    `;
    // this needs to render array of objects from JSON
    // ! this should be done in this.displayDatabase() function
    console.table(books);
    return response.status(200).json({ books });
  }

  /**
   * @description Displays the table in HTML
   */
  displayDatabase(dataset) {
    this.busser();

    const TABLE = this.shadowRoot.querySelector(".table-data");

  }

  /**
   * @description Eliminates the table
   */
  busser() {
    const TABLE = this.shadowRoot.querySelector(".table-data");
    try {
      TABLE.innerHTML = "";
    } catch (error) {
      if(this.developerMode) console.log(error);
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="access-database-wrapper">
        <slot name="title"></slot>
        <form class="control-wrapper" @submit="${this.writeDatabase}">
          <div class="control-panel">
            <input type="submit" id="send-data" class="ctrl-pnl-btn" value="Send Data to Database"></input>
            <button id="display-table" class="ctrl-pnl-btn" @click="${this.readDatabase}">Display Table</button>
            <button id="clear-table" class="ctrl-pnl-btn" @click="${this.busser}">Clear Table</button>
          </div>
          <div class="data-entry">
            <input type="text" placeholder="Book title here..." class="data-entry-input" id="book-name">
            <input type="text" placeholder="Book author here..." class="data-entry-input" id="book-author">
            <input type="text" placeholder="Book price here..." class="data-entry-input" id="book-price">
            <select name="genre" id="book-genre" class="data-entry-input">
              <option value="none">---Pick a genre---</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-fiction</option>
              <option value="biography">Biography</option>
            </select>
            <input type="text" placeholder="Customer name here..." class="data-entry-input" id="customer-name">
            <input type="email" placeholder="Customer email here..." class="data-entry-input" id="customer-email">
            <input type="tel" placeholder="Customer phone here..." class="data-entry-input" id="customer-phone">
          </div>
        </form>
        <div class="data-wrapper">
          <h4 class="data-title">${this._tableName}</h4>
          <table class="data-table">
            <!-- Table rows will be added here utilizing JS -->
          </table>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      header: { type: String, reflect: true },
      _tableName: { type: String },
      developerMode: { type: Boolean, reflect: true, attribute: "developer-mode" },
    }
  }

}

globalThis.customElements.define('access-database', AccessDatabase)