interface Response {
  statusCode: number;
  body: string;
}

type Reservation = {
  seat: string;
  name: string;
};

type GETRequest = {
  httpMethod: "GET";
}

type DELETERequest = {
  httpMethod: "DELETE";
}

type POSTRequest = {
  httpMethod: "POST";
  path: string;
  body: string;
}
type RequestEvent = GETRequest | POSTRequest | DELETERequest;

let reservations: Reservation[] = []; // This will hold the reservations in memory

export const handler = async (event: RequestEvent): Promise<Response> => {
  // Handle GET request - Return current reservations
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(reservations),
    };
  }

  if (event.httpMethod === 'DELETE') {
    reservations = [];

    return {
      statusCode: 200,
      body: JSON.stringify(reservations),
    };
  }
  // Handle POST request - Make a new reservation
  if (event.httpMethod === 'POST') {
    const seat = event.path.split('/').pop(); // Extract the seat from the URL

    const isValidSeat = seat !== undefined && /^[A-F]\d{1,2}$/.test(seat);

    console.log("isValidSeat", { isValidSeat, seat })

    // seats should start with A-F and end with a number 1-24
    if (!isValidSeat) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid seat number" }),
      };
    }
    // Check if seat is already reserved
    const existingReservation = reservations.find(r => r.seat === seat);
    console.log("existingReservattion", { existingReservation })
    if (existingReservation) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Seat ${seat} is already reserved` }),
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
