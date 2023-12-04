/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {

    intercept(method: string, url: string, options: any): Chainable;

    intercept(method: string, url: string, alias: string, options?: any): Chainable;
  }
}
