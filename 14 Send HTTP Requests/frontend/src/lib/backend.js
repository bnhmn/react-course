export class BackendClient {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async fetchAllPlaces() {
    const response = await this.fetch({ method: 'GET', uri: `/places` });
    return response.places;
  }

  async fetchSelectedPlaces() {
    const response = await this.fetch({ method: 'GET', uri: `/places/selected` });
    return response.places;
  }

  async updateSelectedPlaces(selectedPlaces) {
    await this.fetch({ method: 'PUT', uri: `/places/selected`, body: selectedPlaces });
  }

  /**
   * @param {{method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; uri: string} & RequestInit} request
   */
  async fetch(request) {
    request.url = `${this.baseUrl}${request.uri}`;

    if (request.body) {
      request.headers['Content-Type'] = 'application/json';
      request.body = JSON.stringify(request.body);
    }

    const resp = await fetch(request.url, request);

    if (resp.ok) {
      const responseBody = await resp.json();
      return responseBody;
    } else {
      const responseBody = await resp.text();
      throw `<== Received error: ${resp.status} - ${resp.statusText}\n${responseBody}`;
    }
  }
}
