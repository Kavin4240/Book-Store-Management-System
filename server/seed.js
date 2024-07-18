import bcrypt from 'bcrypt';
import readlineSync from 'readline-sync';
import { Admin } from './models/Admin.js';
import './db.js';

async function AdminAccount() {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const plainTextPassword = readlineSync.question('Enter the password for the admin account: ', { hideEchoBack: true });
            const hashPassword = await bcrypt.hash(plainTextPassword, 10);
            const newAdmin = new Admin({
                username: 'admin',
                password: hashPassword,
                role:'admin'
            });
            await newAdmin.save();
            console.log("Account created");
        } else {
            console.log("Account already exists");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

AdminAccount();
