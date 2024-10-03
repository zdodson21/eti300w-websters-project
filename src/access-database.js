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
    this.accessType = null;
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

  writeDatabase() {

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
   * @description Clears the table in HTML
   */
  busser() {
    const TABLE = this.shadowRoot.querySelector(".table-data");
    TABLE.innerHTML = "";
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="access-database-wrapper">
        <slot name="title"></slot>
        <div class="control-panel">
          <button id="display-table" class="ctrl-pnl-btn" @click="${this.readDatabase}">Display Table</button>
        </div>
        <div class="data-wrapper">
          <table class="table-data">
  
          </table>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      header: { type: String, reflect: true },
      _tableName: { type: String },
      accessType: { type: String, reflect: true, attribute: "access-type" },
    }
  }

}

globalThis.customElements.define('access-database', AccessDatabase)