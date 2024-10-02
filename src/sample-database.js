import { LitElement, css, html } from "lit";
import { sql } from "@vercel/postgres";

export class SampleDatabase extends LitElement {
  constructor() {
    super();
    this.header = "SAMPLE DATABASE";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .sample-database-wrapper {
        border: 1px solid black;
        padding: 12px;
        margin: 12px 0px;
      }

      * {
        color: red;
      }

      th, td {
        padding: 16px;
        border: 1px solid red;
        margin: 0px;
      }
    `;
  }

  render() {
    return html`
      <div class="sample-database-wrapper">
        <h3>${this.header}</h3>
        <div class="data-written">
          <table class="data-table">
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>Zach Dodson</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Tyler Struben</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Sean Murphy</td>
              <td>30</td>
            </tr>
          </table>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      header: { type: String, reflect: true },
    }
  }

}

globalThis.customElements.define('sample-database', SampleDatabase)