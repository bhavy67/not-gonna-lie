# Production Deployment Guide

## 1. GitHub Setup

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## 2. Vercel Deployment

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Next.js project

## 3. Environment Variables in Vercel

In your Vercel project dashboard, go to Settings > Environment Variables and add:

### Required Variables:
- `NEXTAUTH_SECRET`: Generate a new secret with `openssl rand -base64 32`
- `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`)
- `MONGODB_URI`: Your MongoDB connection string (same as current)
- `RESEND_API_KEY`: Your Resend API key (same as current)
- `OPENAI_API_KEY`: Your OpenAI API key (same as current)

### Important Notes:
- ✅ MongoDB Atlas works in production (no changes needed)
- ✅ Resend API works in production (no changes needed)
- ⚠️ You MUST update `NEXTAUTH_URL` to your production domain

## 4. Domain Configuration for Resend (Optional but Recommended)

For production emails, you should:
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain (e.g., `yourapp.com`)
3. Verify with DNS records
4. Update `from` field in `sendVerificationEmail.ts` to use your domain

## 5. What Works Without Changes:

✅ **MongoDB**: Atlas works globally
✅ **Authentication**: NextAuth works automatically
✅ **Email**: Resend test domain works in production
✅ **API Routes**: All your API routes will work
✅ **File Structure**: No changes needed

## 6. After Deployment:

1. Test sign-up with your Resend email
2. Test verification process
3. Test login/logout functionality
4. Check all API endpoints work

## 7. Optional Improvements:

- Set up custom domain in Vercel
- Configure custom email domain in Resend
- Set up monitoring and analytics
- Add proper error logging

## Example Production Environment Variables:

```
NEXTAUTH_SECRET=your-new-production-secret
NEXTAUTH_URL=https://your-app.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
RESEND_API_KEY=re_your_api_key
OPENAI_API_KEY=sk-proj-your_openai_key
```

## Common Issues and Solutions:

### Issue: 500 errors after deployment
- Check all environment variables are set
- Ensure NEXTAUTH_URL matches your production domain

### Issue: Email verification not working
- Verify RESEND_API_KEY is set correctly
- Check you're using the email associated with your Resend account

### Issue: Authentication not working
- Verify NEXTAUTH_SECRET is set
- Ensure NEXTAUTH_URL is correct

## Security Notes:

- ✅ Never commit `.env` file to Git
- ✅ Use different secrets for production
- ✅ MongoDB credentials are already secured
- ✅ Resend API key is already secured
