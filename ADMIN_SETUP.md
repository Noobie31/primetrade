# Admin User Setup Guide

## 🔐 Creating Admin Users Securely

Instead of manually editing MongoDB, you can create admin users through a secure API endpoint that requires a secret key.

---

## Method 1: Using Swagger UI (Easiest)

1. **Open Swagger Docs**: http://localhost:5000/api-docs

2. **Find** `POST /api/v1/auth/register-admin` endpoint

3. **Click "Try it out"**

4. **Fill in the request body**:
   ```json
   {
     "name": "Admin User",
     "email": "admin@primetrade.com",
     "password": "Admin123",
     "adminSecret": "primetrade-admin-secret-2026"
   }
   ```

5. **Click "Execute"**

6. **Copy the token** from the response and you're logged in as admin!

---

## Method 2: Using cURL

```bash
curl -X POST http://localhost:5000/api/v1/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@primetrade.com",
    "password": "Admin123",
    "adminSecret": "primetrade-admin-secret-2026"
  }'
```

---

## Method 3: Using Postman

1. Create a **POST** request to: `http://localhost:5000/api/v1/auth/register-admin`

2. Set **Headers**:
   - `Content-Type: application/json`

3. Set **Body** (raw JSON):
   ```json
   {
     "name": "Admin User",
     "email": "admin@primetrade.com",
     "password": "Admin123",
     "adminSecret": "primetrade-admin-secret-2026"
   }
   ```

4. **Send** the request

---

## 🔑 Admin Secret Key

The admin secret is stored in your `.env` file:

```env
ADMIN_SECRET=primetrade-admin-secret-2026
```

**⚠️ Important for Production:**
- Change this secret to something very strong and random
- Never commit the `.env` file to GitHub
- Share the secret only with authorized personnel

---

## ✅ Verify Admin Access

After creating an admin account:

1. **Login** at http://localhost:3000/login with your admin credentials

2. **Check the Dashboard** - You should see:
   - 👑 **Admin** badge (yellow/gold) instead of 👤 User badge
   - Ability to view **ALL users' tasks**, not just your own

3. **Test Permissions**:
   - Create a regular user account
   - Login as that user and create some tasks
   - Logout and login as admin
   - You should see tasks from all users!

---

## 🎯 Differences: USER vs ADMIN

| Feature | USER Role | ADMIN Role |
|---------|-----------|------------|
| View own tasks | ✅ | ✅ |
| Create own tasks | ✅ | ✅ |
| Edit own tasks | ✅ | ✅ |
| Delete own tasks | ✅ | ✅ |
| **View all tasks** | ❌ | ✅ |
| **Edit any task** | ❌ | ✅ |
| **Delete any task** | ❌ | ✅ |

---

## 📝 Example Response

Successful admin registration:

```json
{
  "success": true,
  "message": "Admin user registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "admin@primetrade.com",
      "name": "Admin User",
      "role": "ADMIN"
    }
  }
}
```

Notice the `"role": "ADMIN"` in the response!

---

## 🛡️ Security Notes

- The admin secret prevents unauthorized admin account creation
- Regular users cannot become admins without the secret
- The secret is only known to developers/administrators
- In production, use environment variables and never hardcode secrets
- Consider additional security like IP whitelisting for admin registration

---

## 🔄 Changing Admin Secret

To change the admin secret:

1. Edit `backend/.env`:
   ```env
   ADMIN_SECRET=your-new-super-secure-secret-here
   ```

2. Restart backend server

3. Use new secret when creating admin users

---

**Now you can easily create admin users for testing without touching the database!** 🎉
