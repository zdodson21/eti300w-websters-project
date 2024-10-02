import { LitElement, css, html } from "lit";
import { sql } from "@vercel/postgres";

export class WriteDatabase extends LitElement {
  constructor() {
    super();
    this.test = "Hello Write Database!"
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <p>${this.test}</p>
    `;
  }

  static get properties() {
    return {
      test: { type: String },
    }
  }

}

globalThis.customElements.define('write-database', WriteDatabase)