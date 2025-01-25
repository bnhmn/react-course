export class BackendClient {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async fetchAvailablePlaces() {
    const response = await this.fetch({ method: 'GET', uri: `/places` });
    return response.places;
  }

  async fetchSelectedPlaces() {
    const response = await this.fetch({ method: 'GET', uri: `/places/selected` });
    return response.places;
  }

  async setSelectedPlaces(selectedPlaces) {
    const response = await this.fetch({ method: 'PUT', uri: `/places/selected`, body: { places: selectedPlaces } });
    return response.places;
  }

  /**
   * @param {{method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; uri: string} & RequestInit} request
   */
  async fetch(request) {
    request.url = `${this.baseUrl}${request.uri}`;

    if (request.body) {
      request.headers = request.headers ?? {};
      request.headers['Content-Type'] = 'application/json';
      request.body = JSON.stringify(request.body);
    }

    const resp = await fetch(request.url, request);

    if (resp.ok) {
      if (resp.headers.get('Content-Type')?.includes('application/json')) {
        return await resp.json();
      } else {
        return null;
      }
    } else {
      const responseBody = await resp.text();
      const error = `<== Received error ${resp.status} (${resp.statusText})\n${responseBody}`;
      console.error(error);
      throw error;
    }
  }
}
