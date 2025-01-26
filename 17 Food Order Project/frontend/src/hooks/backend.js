import { useCallback, useEffect, useState } from 'react';

export function useMealsBackend() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function replaceMealImages(meals) {
    return meals.map((meal) => ({
      ...meal,
      image: `http://localhost:3000/${meal.image}`,
    }));
  }

  useEffect(() => {
    fetchFromBackend({ method: 'GET', uri: '/meals' })
      .then(replaceMealImages)
      .then(setMeals)
      .finally(() => setIsLoading(false));
  }, []);

  return [meals, isLoading];
}

export function useOrderBackend() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const placeOrder = useCallback((order) => {
    setIsLoading(true);
    fetchFromBackend({ method: 'POST', uri: '/orders', body: order })
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return [placeOrder, isLoading, isSuccess, isError];
}

/**
 * @param {{method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; uri: string} & RequestInit} request
 */
async function fetchFromBackend(request, baseUrl = 'http://localhost:3000') {
  request.url = `${baseUrl}${request.uri}`;

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
