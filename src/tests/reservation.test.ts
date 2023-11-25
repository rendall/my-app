import { describe, it, expect } from 'vitest';
import { handler as reservationHandler } from '../functions/reservation'; // Update the file path if necessary

describe('reservation api tests', () => {
  it('should return 200 and []', async () => {
    const result = await reservationHandler({
      httpMethod: 'GET',
    });
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe('[]');
  })

  it('should accept a reservation', async () => {
    const postResult = await reservationHandler({
      httpMethod: 'POST',
      path: '/reservation/A1',
      body: 'test',
    });
    expect(postResult.statusCode).toBe(201);
    expect(postResult.body).toBe('{"seat":"A1","name":"test"}');

    const getResult = await reservationHandler({
      httpMethod: 'GET',
      path: '/reservation',
    });

    expect(getResult.statusCode).toBe(200);
    expect(getResult.body).toBe('[{"seat":"A1","name":"test"}]');
  })



  it('should return 405 if method is not allowed', async () => {
    const result = await reservationHandler({
      httpMethod: 'PUT',
      path: '/reservation',
      body: '',
    });
    expect(result.statusCode).toBe(405);
    expect(result.body).toBe('{"message":"Method Not Allowed"}');
  }
  )

  it('should return 400 if seat is reserved already', async () => {

    await reservationHandler({ httpMethod: 'DELETE' });

    const postResult = await reservationHandler({
      httpMethod: 'POST',
      path: '/reservation/A1',
      body: 'test',
    });


    expect(postResult.statusCode).toBe(201);
    expect(postResult.body).toBe('{"seat":"A1","name":"test"}');

    const postResult2 = await reservationHandler({
      httpMethod: 'POST',
      path: '/reservation/A1',
      body: 'test2',
    });
    expect(postResult2.statusCode).toBe(400);
    expect(postResult2.body).toBe('{"message":"Seat A1 is already reserved"}');
  }
  )

  it('should return 400 if seat is invalid', async () => {
    const postResult = await reservationHandler({
      httpMethod: 'POST',
      path: '/reservation/1',
      body: 'test',
    });
    expect(postResult.statusCode).toBe(400);
    expect(postResult.body).toBe('{"message":"Invalid seat number"}');
  }
  )


  it('hello world', () => {
    expect(true).toBe(true);
  });
});
