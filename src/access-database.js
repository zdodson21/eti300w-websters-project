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

      tr {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      td, th {
        border: 1px solid black;
        padding: 12px;
      }
    `;
  }

  /**
   * @description Writes data from HTML form / input tags to the database, then displays database with changes
   */
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

    fetch(`https://eti300w-websters-project.vercel.app/api/server?bookName=${BOOK_NAME}&bookAuthor=${BOOK_AUTHOR}&bookPrice=${BOOK_PRICE}&bookGenre=${BOOK_GENRE}&customerName=${CUSTOMER_NAME}&customerEmail=${CUSTOMER_EMAIL}&customerPhone=${CUSTOMER_PHONE}`).then(d => d.ok ? d.json(): {}).then(data => {
      console.log(data);
      this.displayDatabase(data);
    })
  }

  helpDisplayButton() {
    fetch(`https://eti300w-websters-project.vercel.app/api/server?`).then(d => d.ok ? d.json(): {}).then(data => {
      console.log(data);
      this.displayDatabase(data);
    })
  }

  /**
   * @description Displays the table in HTML
   */
  displayDatabase(dataset) {
    this.busser();

    let index = 0;
    let tuples = dataset.data.rows;
    const TABLE = this.shadowRoot.querySelector(".data-table");

    for (let i = 0; i < tuples.length; i++) {
      let tupleData = tuples[i];
      const bookName = tupleData.bookname;
      console.log(bookName);
      const bookAuthor = tupleData.bookauthor;
      const bookPrice = tupleData.bookprice;
      const bookGenre = tupleData.bookgenre;
      const customerName = tupleData.customername;
      const customerEmail = tupleData.customeremail;
      const customerPhone = tupleData.customerphone;

      // TODO fix this so it actually functions
      TABLE.innerHTML += `
        <tr>
          <td>${bookName}</td>
          <td>${bookAuthor}</td>
          <td>${bookPrice}</td>
          <td>${bookGenre}</td>
          <td>${customerName}</td>
          <td>${customerEmail}</td>
          <td>${customerPhone}</td>
        </tr>
      `;

      index++;
    }

    this.requestUpdate();
  }

  /**
   * @description Eliminates the table
   */
  busser() {
    const TABLE = this.shadowRoot.querySelector(".data-table");
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
            <button id="display-table" class="ctrl-pnl-btn" @click="${this.helpDisplayButton}">Display Table</button>
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
            <tr>
              <th>Index</th>
              <th>Book Name</th>
              <th>Book Author</th>
              <th>Book Price</th>
              <th>Book Genre</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Phone</th>
            </tr>
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