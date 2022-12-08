import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import { app } from '../../../app'
import { mockedAlternativeUser, mockedUser, mockedUserWithInvalidEmail, mockedUserWithInvalidPassword } from '../../mocks' 

describe('Integration tests (e2e)', () => {
    const prisma = new PrismaClient()
    let token: string
    let alternativeUserToken: string

    afterAll(async () => {
        await prisma.$disconnect()
    })

    describe('/session', () => {
        describe('POST ---> /session/register', () => {
            it('Should be able to register a user', async () => {
                const response = await request(app).post('/session/register').send(mockedUser)

                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('id')
                expect(response.body).toHaveProperty('email')
                expect(response.body).not.toHaveProperty('password')
            })
    
            it('Should not be able to register a user with invalid email', async () => {
                const response = await request(app).post('/session/register').send(mockedUserWithInvalidEmail)
    
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
    
            it('Should not be able to register a user with invalid password', async () => {
                const response = await request(app).post('/session/register').send(mockedUserWithInvalidPassword)
    
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
    
            it('Should not be able to register with a email that already exists', async () => {
                const response = await request(app).post('/session/register').send(mockedUser)
    
                expect(response.status).toBe(409)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
        })
    
        describe('POST ---> /session/login', () => {
            it('Should be able to login', async () => {
                const response = await request(app).post('/session/login').send(mockedUser)
                token = response.body.token
                
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('token')
            })
    
            it('Should not be able to login with invalid email', async () => {
                const response = await request(app).post('/session/login').send(mockedUserWithInvalidEmail)
    
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
    
            it('Should not be able to login with invalid password', async () => {
                const response = await request(app).post('/session/login').send(mockedUserWithInvalidPassword)
    
                expect(response.status).toBe(403)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
        })
    })

    describe('/todos', () => {
        let toDoId: string

        describe('GET ---> /todos', () => {
            it('Should be able to get all to-dos', async () => {
                await request(app).post('/todos').send({ title: 'Do the homework' }).set('Authorization', `Bearer ${token}`)

                const response = await request(app).get('/todos').set('Authorization', `Bearer ${token}`)
    
                expect(response.status).toBe(200)
                expect(response.body).toHaveLength(1)
            })
    
            it('Should not be able to get to-dos without token', async () => {
                const response = await request(app).post('/todos')
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
            
            it('Should not be able to get to-dos with invalid token', async () => {
                const response = await request(app).post('/todos').set('Authorization', `Bearer invalidtoken`)
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
        })

        describe('POST ---> /todos', () => {
            it('Should be able to create a to-do', async () => {
                const response = await request(app).post('/todos').send({ title: 'Do the homework' }).set('Authorization', `Bearer ${token}`)
                toDoId = response.body.id
    
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('id')
                expect(response.body).toHaveProperty('title')
                expect(response.body).toHaveProperty('isComplete', false)
                expect(response.body).toHaveProperty('userId')
            })

            it('Should not be able to create a to-do without token', async () => {
                const response = await request(app).post('/todos')
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })

            it('Should not be able to create a to-do with invalid token', async () => {
                const response = await request(app).post('/todos').set('Authorization', `Bearer invalidtoken`)
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
        })

        describe('PATCH ---> /todos/:id', () => {
            it('Should be able to update a to-do', async () => {
                const response = await request(app).patch(`/todos/${toDoId}`).send({ title: 'Do the homework TODAY!', isComplete: true }).set('Authorization', `Bearer ${token}`)
    
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('id')
                expect(response.body).toHaveProperty('title', 'Do the homework TODAY!')
                expect(response.body).toHaveProperty('isComplete', true)
                expect(response.body).toHaveProperty('userId')
            })

            it('Should not be able to update a to-do without token', async () => {
                const response = await request(app).patch(`/todos/${toDoId}`)
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })

            it('Should not be able to update a to-do with invalid token', async () => {
                const response = await request(app).patch(`/todos/${toDoId}`).set('Authorization', `Bearer invalidtoken`)
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })

            it('Should not be able to update a not owned to-do', async () => {
                await request(app).post('/session/register').send(mockedAlternativeUser)
                const loggedAlternativeUser = await request(app).post('/session/login').send(mockedAlternativeUser)
                alternativeUserToken = loggedAlternativeUser.body.token

                const response = await request(app).patch(`/todos/${toDoId}`).set('Authorization', `Bearer ${alternativeUserToken}`)
    
                expect(response.status).toBe(403)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
        })

        describe('DELETE ---> /todos/:id', () => {
            it('Should not be able to delete a not owned to-do', async () => {
                const response = await request(app).delete(`/todos/${toDoId}`).set('Authorization', `Bearer ${alternativeUserToken}`)
    
                expect(response.status).toBe(403)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })

            it('Should not be able to delete a to-do without token', async () => {
                const response = await request(app).delete(`/todos/${toDoId}`)
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })

            it('Should not be able to update a to-do with invalid token', async () => {
                const response = await request(app).delete(`/todos/${toDoId}`).set('Authorization', `Bearer invalidtoken`)
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })

            it('Should be able to delete a to-do', async () => {
                const response = await request(app).delete(`/todos/${toDoId}`).set('Authorization', `Bearer ${token}`)
    
                expect(response.status).toBe(204)
            })
        })
    })
})