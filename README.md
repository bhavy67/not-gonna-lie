# Not Gonna Lie 🎭

An anonymous feedback and messaging application built with Next.js, allowing users to send and receive anonymous messages.

## Features

- 🔐 **User Authentication** - Secure signup/login with NextAuth.js
- 📧 **Email Verification** - Email verification using Resend
- 💬 **Anonymous Messaging** - Send and receive anonymous messages
- 🎛️ **Message Controls** - Toggle accepting messages on/off
- 🔄 **Real-time Updates** - Dynamic message management
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui
- 🤖 **AI Suggestions** - Get AI-powered message suggestions

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Email**: Resend
- **AI**: OpenAI API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Resend account
- OpenAI API key (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bhavy67/not-gonna-lie.git
cd not-gonna-lie
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your-mongodb-connection-string
RESEND_API_KEY=your-resend-api-key
OPENAI_API_KEY=your-openai-api-key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is licensed under the MIT License.

## Author

**bhavy67** - [GitHub](https://github.com/bhavy67)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
