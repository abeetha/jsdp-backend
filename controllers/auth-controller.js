const pool = require('../db/db.js');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        // 1. Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Name, email and password are required'
            });
        }

        // 2. Check whether email already exists
        const [existingUsers] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                error: 'Email already exists'
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Set role
        const userRole = role || 'job_seeker';

        // 5. Insert user
        const [result] = await pool.query(
            `INSERT INTO users
            (name, email, password, role)
            VALUES (?, ?, ?, ?)`,
            [
                name,
                email,
                hashedPassword,
                userRole
            ]
        );

        // 6. Send response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: result.insertId,
                name: name,
                email: email,
                role: userRole
            }
        });

    } catch (err) {

        console.error('Registration error:', err);

        res.status(500).json({
            error: 'Error registering user'
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // 1. Check required fields
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // 2. Find user by email
        const [users] = await pool.query(
            `SELECT *
             FROM users
             WHERE email = ?`,
            [email]
        );

        // 3. User not found
        if (users.length === 0) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }

        const user = users[0];

        // 4. Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        // 5. Password incorrect
        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }

        // 6. Login successful
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {

        console.error('Login error:', err);

        res.status(500).json({
            error: 'Error logging in'
        });
    }
};

module.exports = {
    register,
    login
};