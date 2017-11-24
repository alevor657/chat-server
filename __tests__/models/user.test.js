import 'jest';
import User from '../../src/api/models/User';

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
