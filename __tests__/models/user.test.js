import 'jest';
import request from 'supertest';
import User from '../../src/api/models/User';
import app from '../../src';

let token = '';

test('Model creates', () => {
    const req = {
        value: {
            body: {
                email: 'test@asd.a',
                username: 'test',
                password: '123'
            }
        }
    };

    const user = new User(req);

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(Object);
});

test('i can register a user and get a token back', (done) => {
    request(app)
        .post('/user/signup')
        .send({
            email: 'test@asd.a',
            username: 'test',
            password: '123'
        })
        .expect(201, done);
});

test('i can not create same user again', done => {
    request(app)
        .post('/user/signup')
        .send({
            email: 'test@asd.a',
            username: 'test',
            password: '123'
        })
        .expect(403, done);
});

test('i can get a token back by logging in', done => {
    token = request(app)
        .post('/user/signin')
        .send({
            username: 'test',
            password: '123'
        })
        .expect(202)
        .then(res => {
            const token = res.body.token;

            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');
            expect(token).not.toBeFalsy();

            return token;
        });

    done();
});

test('i can access the private routes', done => {
    token.then((res) => {
        console.log(res);
        request(app)
            .get('/user/profile')
            .set('Authorization', res)
            .expect(200, done);
    });
});

test('i can not access private resources with bullshit token', done => {
    token.then((res) => {
        console.log(res);
        request(app)
            .get('/user/profile')
            .set('Authorization', 'DEUSVULT')
            .expect(401, done);
    });
});

afterAll((done) => {
    request(app)
        .delete('/user')
        .expect(200)
        .end((err) => {
            if (err) {
                return done(err);
            }
            return done();
        });
});
