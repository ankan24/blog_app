# Quick Start Guide - Koko's World

## Your Website is Live! 🚀

Your website is running at: **http://localhost:3000**

---

## What You Have

A fully functional website with:
- **Public Gallery** - Where visitors see your articles
- **Admin Dashboard** - Where only you manage content
- **Responsive Design** - Works on all devices
- **Article Types** - Poems, Prose, Essays, Writings

---

## Navigation URLs

### Public Pages (Everyone can see)
| Page | URL |
|------|-----|
| Home Gallery | http://localhost:3000 |
| View Article | http://localhost:3000/articles/[id] |

### Admin Pages (Only for you)
| Page | URL |
|------|-----|
| Dashboard | http://localhost:3000/admin |
| Create Article | http://localhost:3000/admin/create |
| Edit Article | http://localhost:3000/admin/edit/[id] |

---

## 5 Minute Getting Started

### Step 1: Add Your First Poem
1. Go to http://localhost:3000/admin
2. Click **"+ New Article"** button
3. Fill in:
   - Title: "My First Poem"
   - Type: "Poem"
   - Excerpt: "A short preview..."
   - Content: "Your full poem text here..."
4. Click **"Create Article"**

### Step 2: View on Home Page
1. Go back to http://localhost:3000
2. See your poem in the gallery
3. Click the title to read the full content

### Step 3: Edit Your Content
1. Go to http://localhost:3000/admin
2. Find your article
3. Click **"Edit"**
4. Make changes
5. Click **"Update Article"**

### Step 4: Delete if Needed
1. Go to http://localhost:3000/admin
2. Click **"Delete"** next to an article
3. Click **"Confirm"** to remove

---

## Site Features

### Home Page Features
✅ Article gallery with beautiful cards  
✅ Filter by type (Poem, Prose, Essay, Writing)  
✅ Shows article excerpt  
✅ Publication date  
✅ "Read more" links  
✅ Featured article star  

### Article Page Features
✅ Full article display  
✅ Large, readable text  
✅ Color-coded by type  
✅ Publication date info  
✅ Back to gallery link  

### Admin Dashboard Features
✅ Table view of all articles  
✅ Edit button for each article  
✅ Delete button with confirmation  
✅ Create new article button  
✅ Shows article type and date  

---

## Form Fields Explained

When creating or editing an article:

**Title** (Required)
- The name of your piece
- Shows in gallery and at top of article page
- Examples: "I am total lost, heehee", "Downtown Train"

**Type** (Required)
- Choose one: Poem, Prose, Essay, Writing
- Controls the color theme on display
- Helps visitors filter articles

**Excerpt** (Required)
- 1-3 sentence preview
- Shown in the gallery cards
- Helps visitors decide if they want to read the full piece

**Content** (Required)
- Your full article text
- Can be multiple paragraphs
- Preserves line breaks and formatting
- Shows in large, readable format

---

## Tips & Tricks

### Organization
- Use consistent naming for similar works
- Use excerpts that capture the essence
- Keep types consistent for better organization

### Design
- Gallery shows newest articles first
- Featured articles get a star (✭)
- Color-coding helps identify article types
- Mobile-friendly layout adapts to all screens

### Content Ideas
Start by adding:
1. Your best poem
2. Your favorite prose piece
3. An essay
4. A short writing sample

Then keep adding more!

---

## Customization Ideas (Later)

When you want to personalize further:

1. **Change Site Name**
   - Edit `src/components/Navigation.tsx`
   - Change "Koko's World" to your title

2. **Change Colors**
   - Edit `tailwind.config.ts`
   - Modify primary and secondary colors

3. **Add Social Links**
   - Edit footer in `src/app/page.tsx`
   - Add links to social media

4. **Add New Article Types**
   - Edit `src/types/article.ts`
   - Add to article type options

---

## Important Notes

### Data
- Articles are currently stored in memory
- **Data resets when you restart the server**
- For permanent storage, add a database later

### Security
- Admin pages are **not password-protected yet**
- Only share the URL with people you trust
- Add authentication before deploying publicly

### Deployment
When ready to go live:
- Use Vercel (easiest for Next.js)
- Or any Node.js hosting provider
- Must add database and authentication first

---

## Troubleshooting

### Website not loading?
1. Check that server is running (should see "npm run dev" in terminal)
2. Refresh the page
3. Try http://localhost:3000/admin

### Changes not showing?
1. Click refresh in browser
2. Check the admin dashboard
3. Make sure you clicked save/submit

### Need to restart?
1. Stop the server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. Wait for "Ready in X.Xs" message
4. Refresh browser

---

## File Structure (For Reference)

```
copilot-poem/
├── src/app/              ← Pages
├── src/components/       ← UI Components
├── src/lib/             ← Article logic
├── src/types/           ← Type definitions
├── public/              ← Images/static files
├── package.json         ← Dependencies
├── tsconfig.json        ← TypeScript config
├── tailwind.config.ts   ← Styles config
└── README.md            ← Full documentation
```

---

## Next Steps

1. **Add your first article** - Start with your favorite piece
2. **Customize colors** - Make it your own
3. **Add more articles** - Build up your collection
4. **Set up database** - When ready for permanent storage
5. **Deploy online** - Share with the world!

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

Enjoy building your personal publishing platform! 🎉
