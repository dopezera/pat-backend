import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id, 
            username: user.username, 
            email: user.email,
        }, 
        'somethingsecret', 
        {
            expiresIn: '30d',
        }
    );
};