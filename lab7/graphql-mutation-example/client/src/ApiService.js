/**
 *
 * Small service for calling GraphQL API server
 */
class ApiService {
  /**
   * define base url and field schemas here
   * @returns {ApiService}
   */
  constructor() {
    this.apiUrl = "http://localhost:3001/graphql";
    this.quoteFields = `{id, quote}`;
  }

  /**
   * Generic function to fetch data from server
   * @param {string} query
   * @returns {unresolved}
   */
  async getGraphQlData(resource, params, fields) {
    const query = `{${resource} ${this.paramsToString(params)} ${fields}}`;
    const res = await fetch(this.apiUrl, {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify({ query })
    });
    if (res.ok) {
      const body = await res.json();
      return body.data;
    } else {
      throw new Error(res.status);
    }
  }

  /**
   * Generic function to mutate data on server
   * @param {string} query
   * @returns {unresolved}
   */
  async mutateGraphQlData(resource, params, fields) {
    const query = `mutation {${resource} ${this.paramsToString(
      params
    )} ${fields}}`;
    const res = await fetch(this.apiUrl, {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify({ query })
    });
    if (res.ok) {
      const body = await res.json();
      return body.data;
    } else {
      throw new Error(res.status);
    }
  }

  /**
   *
   * @param {object} params
   * @returns {array} quotes list or empty list
   */
  async getQuotes(params = {}) {
    const data = await this.getGraphQlData("quotes", params, this.quoteFields);
    //return users list
    return data.quotes;
  }

  async createQuote(params) {
    const data = await this.mutateGraphQlData(
      "createQuote",
      params,
      this.quoteFields
    );
    return data.createQuote;
  }

  async updateQuote(params) {
    const data = await this.mutateGraphQlData(
      "updateQuote",
      params,
      this.quoteFields
    );

    return data.updateQuote;
  }

  async deleteQuote(params) {
    return await this.mutateGraphQlData("deleteQuote", params, "{ id }");
  }

  /**
   *
   * @param {object} params
   * @returns {String} params converted to string for usage in graphQL
   */
  paramsToString(params) {
    let paramString = "";
    if (params.constructor === Object && Object.keys(params).length) {
      const tmp = this.ObjectToString(params);
      if (tmp.length) {
        paramString = `(${tmp.join()})`;
      }
    }
    return paramString;
  }

  ObjectToString(params) {
    let tmp = [];

    for (let key in params) {
      let paramStr = params[key];
      if (paramStr !== "") {
        if (typeof params[key] === "string") {
          paramStr = `"${paramStr}"`;
        } else if (typeof params[key] === "object") {
          paramStr = `{${this.ObjectToString(params[key])}}`;
        }
        tmp.push(`${key}:${paramStr}`);
      }
    }

    return tmp;
  }
}

export default new ApiService();
