interface Response {
  statusCode: number;
  body: string;
}

type Reservation = {
  seat: string;
  name: string;
};

interface Event {
  httpMethod: string;
  path: string;
  body: string;
}

const reservations: Reservation[] = []; // This will hold the reservations in memory

export const handler = async (event: Event): Promise<Response> => {
  // Handle GET request - Return current reservations
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(reservations),
    };
  }

  // Handle POST request - Make a new reservation
  if (event.httpMethod === 'POST') {
    const seat = event.path.split('/').pop(); // Extract the seat from the URL
    if (!seat) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid seat number" }),
      };
    }

    const name = event.body; // Extract the name from the request payload

    // Add the reservation
    reservations.push({ seat, name });
    return {
      statusCode: 201,
      body: JSON.stringify({ seat, name }),
    };
  }

  // Handle other HTTP methods
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
};
