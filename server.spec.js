const server = require('./server');
const request = require('supertest');
const db = require('./dbConfig');

beforeEach(async () => {
    await db('games').truncate();
});

describe('games database', () => {
    describe('get req to /', () => {
        it('should return status code 200', async () => {
            let res = await request(server).get('/')
            expect(res.status).toBe(200)
        })
    })
    describe('get req to /games', () => {
        it('should return status code 200', async () => {
            let res = await request(server).get('/games')
            expect(res.status).toBe(200)
        })
        it('should return an empty array for game without data', async () => {
            let res = await request(server).get('/games')
            expect(res.body).toEqual([])
        })
        it('should return an array data for the game', async () => {
            await request(server)
                .post('/games')
                .send({ title: 'City of Heroes', genre: 'mmorpg', releaseYear: 2005 })
            let res = await request(server).get('/games')
            expect(res.body).toEqual([{ "id": 1, title: 'City of Heroes', genre: 'mmorpg', releaseYear: 2005 }])
        })
    })
    describe('post req to /games', () => {
        it('should return status code 201 if all fields are completed', async () => {
            let res = await request(server)
                .post('/games')
                .send({ title: 'Shadowbane', genre: 'mmorpg', releaseYear: 2003 })
            expect(res.status).toBe(201)
        })
        it('should return status code 422 if data is not complete', async () => {
            let res = await request(server)
                .post('/games')
                .send({ title: 'ArcheAge' })
            expect(res.status).toBe(422)        })
        
        it('should return json', async () => {
            let res = await request(server)
                .post('/games')
                .send({ title: 'City of Heroes', genre: 'mmorpg', releaseYear: 2005 })
            expect(res.type).toBe('application/json')
        })
    })    
}) 

