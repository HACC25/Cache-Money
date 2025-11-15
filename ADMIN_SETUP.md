# Admin Setup Instructions

## Initial Setup: Creating the First Admin

### Step 1: Deploy Firestore Rules

First, make sure the latest Firestore rules are deployed:

```bash
firebase deploy --only firestore:rules
```

### Step 2: Create Your Account

1. Run the application locally or go to the deployed app
2. Sign up for an account with your admin email
3. Complete the signup process
4. Log in to the application

### Step 3: Get Your User ID (UID)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Authentication** in the left sidebar
4. Find your email in the users list that you want to set as an admin
5. Copy the **User UID**

### Step 4: Add Yourself to Admins Collection

Now add your UID to the `admins` collection in Firestore:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Firestore Database** in the left sidebar
4. Click **Start collection** (if admins collection is not already created)
5. Collection ID: `admins`
6. Document ID: **Paste your User UID here**
7. Add field:
   - Field: `email`
   - Type: `string`
   - Value: The email address you signed up with that you want to designate as an admin
8. Add another field:
   - Field: `createdAt`
   - Type: `timestamp`
   - Value: Enter current date/time
9. Click **Save**

### Step 5: Verify Admin Access

1. Refresh your application (or log out and log back in)
2. You should now see **"Admin Approval"** in the menu sidebar
3. Click on it - you should have full access to a list of users who signed up with the ETS or Vendor role.
4. You're now an admin and can approve or deny accounts that signed up as an ETS or Vendor.

---

## Adding Additional Admins

Once you have admin access, you can add other admins:

1. Ask the new admin to create an account first
2. Get their User UID (from Firebase Console > Authentication > Users)
3. Go to Firestore Database
4. Open the `admins` collection
5. Click **Add document**
6. Document ID: Their User UID
7. Add fields: `email` (string) and `createdAt` (timestamp)
8. Save

---

## Removing Admin Access

To remove admin privileges:

1. Go to Firebase Console > Firestore Database
2. Open the `admins` collection
3. Find the document with the user's UID
4. Click the three dots menu on the left-hand side → **Delete document**
5. Confirm deletion

---

## Troubleshooting

### "Admin Approval" Not Showing in Menu

**Problem:** Logged in but don't see the admin menu option

**Solutions:**
1. Verify your UID matches the document ID in the `admins` collection
2. Make sure the `admins` collection exists in Firestore
3. Check that Firestore rules are deployed (`firebase deploy --only firestore:rules`)
4. Try logging out and back in
5. Check browser console for errors

### "Access Denied" When Visiting Admin Page

**Problem:** Can see the menu but get access denied

**Solutions:**
1. Verify the document ID in `admins` collection matches your User UID exactly
2. Check that the document exists and isn't empty
3. Firestore rules might not be deployed - run `firebase deploy --only firestore:rules`
4. Clear browser cache and reload

### Can't Add Document to Admins Collection

**Problem:** Firebase Console won't let you create the admins collection

**Solutions:**
1. Make sure you have Owner/Editor role in Firebase project
2. Check that Firestore is enabled for your project
