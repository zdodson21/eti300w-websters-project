// import { sql } from "@vercel/postgres";
import { LitElement, css, html } from "lit";
import {writeHandler, readHandler} from "../api/request.js";

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

  readDatabase() {
  
  }

  render() {
    return html`
      <div class="access-database-wrapper">
        <slot name="title"></slot>
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