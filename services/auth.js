const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Replace with your own secret key

function setUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload, secretKey); // type of this function is string
}

function getUser(token) {  // we use try catchh because jwt.verify throws an error if the token is invalid
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}



module.exports = {
    setUser,
    getUser,
};