# Koko's World - Personal Publishing Platform

A beautiful Next.js website for publishing poems, prose, essays, and writings with an admin dashboard for content management.

## Features

- **Public Gallery**: Browse all published articles with filtering by type (Poems, Prose, Essays, Writing)
- **Detailed View**: Click on any article to read the full content
- **Admin Dashboard**: Only accessible to you for managing content
- **Create Articles**: Add new poems, prose, essays, or writings
- **Edit Articles**: Update existing articles anytime
- **Delete Articles**: Remove articles you no longer want to publish
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd e:\copilot-poem
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Usage

### Public Pages

- **Home Page** (`/`): Browse all published articles with filtering options
- **Article Page** (`/articles/[id]`): Read full article content

### Admin Pages

- **Admin Dashboard** (`/admin`): View all articles and manage content
- **Create Article** (`/admin/create`): Add a new article
- **Edit Article** (`/admin/edit/[id]`): Edit existing article

### Adding an Article

1. Go to `/admin` or click "Admin" in the navigation
2. Click "+ New Article"
3. Fill in the form:
   - **Title**: Your article title
   - **Type**: Choose from Poem, Prose, Essay, or Writing
   - **Excerpt**: A short preview (shown in the gallery)
   - **Content**: The full article content
4. Click "Create Article"

### Editing an Article

1. Go to `/admin`
2. Find the article in the list
3. Click "Edit"
4. Update the information
5. Click "Update Article"

### Deleting an Article

1. Go to `/admin`
2. Find the article in the list
3. Click "Delete"
4. Click "Confirm" to delete

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── page.tsx           # Home page
│   ├── articles/
│   │   └── [id]/
│   │       └── page.tsx   # Article detail page
│   └── admin/
│       ├── page.tsx       # Admin dashboard
│       ├── create/
│       │   └── page.tsx   # Create article page
│       └── edit/
│           └── [id]/
│               └── page.tsx # Edit article page
├── components/            # React components
│   ├── Navigation.tsx     # Navigation bar
│   ├── ArticleCard.tsx    # Article preview card
│   ├── ArticleDisplay.tsx # Full article display
│   └── ArticleForm.tsx    # Article form for create/edit
├── lib/
│   └── articles.ts        # Article service and mock data
└── types/
    └── article.ts         # TypeScript interfaces
```

## Technologies Used

- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI library

## Data Storage

Currently, the project uses an in-memory data store. Articles are stored in the `src/lib/articles.ts` file.

**Note**: Data will be reset when the server restarts. For persistent storage, integrate a database like:
- MongoDB
- PostgreSQL
- Firebase
- Supabase

## Building for Production

```bash
npm run build
npm start
```

## Security Note

⚠️ **Important**: The admin pages are currently not password-protected. Before deploying to production, implement authentication such as:
- NextAuth.js
- Clerk
- Auth0
- Firebase Authentication

## Customization

### Colors and Branding

Edit `tailwind.config.ts` to customize colors and theme.

Edit `src/components/Navigation.tsx` to change the site title and navigation.

### Article Types

Modify the article types in `src/types/article.ts` to add new categories.

## License

This project is created for personal use. All poem content and text remain the property of Emily Lau.

## Support

For issues or feature requests, please contact the author.
