# Paan Phool Green Space App

A web application for managing green spaces, built with Next.js, Supabase, and Tailwind CSS.

## Tech Stack

| Layer                | Tech/Tool                 | Why it's ideal                                      |
| -------------------- | ------------------------- | --------------------------------------------------- |
| **Frontend**         | **Next.js (React)**       | Fully supported by Vercel, fast setup, SEO-friendly |
| **Backend**          | **Next.js API routes**    | Serverless backend built into frontend              |
| **Database**         | **Supabase**              | Free, hosted PostgreSQL with auth & REST API        |
| **Auth**             | **Supabase Auth**         | Built-in user auth (email/password, social)         |
| **Deployment**       | **Vercel**                | Free hosting, 1-click deploy, serverless functions  |
| **Styling/UI**       | **Tailwind CSS**          | Minimal setup, beautiful UI quickly                 |
| **AI Assistant**     | **Amazon Q (in VS Code)** | Helps you write, debug, and explain your code       |
| **Optional Billing** | **Stripe Checkout**       | Free to set up, no upfront cost                     |

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Dashboard for plant management
- Plant tracking and scheduling
- User authentication
- Responsive design

## Deployment

This project is designed to be deployed on Vercel with a single click.