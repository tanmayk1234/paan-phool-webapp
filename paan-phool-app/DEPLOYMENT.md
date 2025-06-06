# Deploying Paan Phool App to Vercel

Follow these steps to deploy your Paan Phool app to Vercel for free:

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com)
2. Create a new repository
3. Push your code to the repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/paan-phool-app.git
   git push -u origin main
   ```

## Step 2: Sign Up for Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up with your GitHub account

## Step 3: Import Your Repository

1. Click "Add New..." → "Project"
2. Select your GitHub repository
3. Vercel will automatically detect that it's a Next.js project

## Step 4: Configure Environment Variables

1. In the project settings, go to "Environment Variables"
2. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://jzczgbannvohulpeinng.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Y3pnYmFubnZvaHVscGVpbm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjk2MjcsImV4cCI6MjA2NDcwNTYyN30.2IEzv0ipyDYuOMondcNIInDGuvN10fdiDQyA6nCn8Gk`

## Step 5: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be deployed to a URL like: `https://paan-phool-app.vercel.app`

## Step 6: Set Up Custom Domain (Optional)

1. In your project settings, go to "Domains"
2. Add your custom domain
3. Follow the instructions to configure DNS settings

## Updating Your App

Any time you push changes to your GitHub repository, Vercel will automatically rebuild and deploy your app.

## Troubleshooting

If you encounter any issues:

1. Check the build logs in Vercel
2. Make sure your environment variables are set correctly
3. Verify that your Supabase project is set up properly
4. Check that your database tables and RLS policies are configured correctly