# Koko's World - Visual Tour & Feature Guide

## 🏠 Home Page Tour

**URL**: http://localhost:3000

### Top Navigation
```
┌────────────────────────────────────────────────────┐
│  Koko's World              [Home] [Admin Button]  │
└────────────────────────────────────────────────────┘
```
- Left: Site title with gradient color
- Right: Navigation links (Home, Admin)

### Header Section
```
┌────────────────────────────────────────────────────┐
│                 Koko's World                       │
│     A collection of my poems, prose, essays,       │
│        and writings                                │
│                                                    │
│  Poems about myself, the world as I see it...     │
└────────────────────────────────────────────────────┘
```
- Large title with gradient background
- Site description
- Tagline explaining content

### Filter Section
```
┌────────────────────────────────────────────────────┐
│ [All (4)] [Poem (2)] [Prose (1)] [Essay (1)] ...   │
└────────────────────────────────────────────────────┘
```
- Filter buttons for each type
- Shows count of articles
- Active filter is highlighted in color
- Inactive filters have white background

### Article Gallery
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   [POEM] ⭐  │  │ [PROSE]      │  │  [ESSAY]     │  │
│  │              │  │              │  │              │  │
│  │ I am total   │  │ Churning     │  │ Downtown     │  │
│  │ lost, heehee │  │ (Paper White)│  │ Train        │  │
│  │              │  │              │  │              │  │
│  │ There is a   │  │ A piece      │  │ Urban poetry │  │
│  │ garden...    │  │ about...     │  │ piece...     │  │
│  │              │  │              │  │              │  │
│  │ 2019  Read→  │  │ 2020  Read→  │  │ 2019  Read→  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
- Grid layout (3 columns on desktop, 1 on mobile)
- Each card shows:
  - Article type (color-coded badge)
  - Featured star (if applicable)
  - Article title
  - Excerpt preview
  - Creation date
  - "Read more" link
- Cards have hover effect (lift up with shadow)
- Clicking card takes to article page

### Footer
```
┌────────────────────────────────────────────────────┐
│  Website by Emily Lau • 2025 • Poem content and   │
│  all text by Emily Lau 2018-2025                   │
  Website by Emily Lau • 2025 • Poem content and   │
  all text by Emily Lau 2018-2025                   │
└────────────────────────────────────────────────────┘
```

---

## 📖 Article Detail Page

**URL**: http://localhost:3000/articles/[id]

### Header Section
```
┌──────────────────────────────────────────────────────────┐
│ [POEM]                                              ⭐  │
│                                                         │
│           I am total lost, heehee                       │
│                                                         │
│        Published on January 15, 2019                    │
└──────────────────────────────────────────────────────────┘
```
- Color gradient background (matches article type)
- Article type badge
- Large title
- Publication date
- Featured star indicator

### Content Section
```
┌──────────────────────────────────────────────────────────┐
│                                                         │
│  There is a garden gnome                              │
│  in my stomach                                         │
│  taking a pair of shears                              │
│  up to the vines...                                   │
│                                                         │
│  [Full article content displayed here with]           │
│  [proper formatting and readability]                  │
│                                                         │
└──────────────────────────────────────────────────────────┘
```
- Content displayed in large, readable font
- Preserved line breaks
- Professional white background
- Proper spacing
- Serif font for poetry/prose

### Back Button
```
┌─────────────────────┐
│ ← Back to Articles  │
└─────────────────────┘
```
- Takes reader back to gallery
- Positioned below article

### Footer
- Same as home page

---

## 🛠️ Admin Dashboard

**URL**: http://localhost:3000/admin

### Header with Action Button
```
┌─────────────────────────────────────────────────────┐
│ Admin Dashboard                  [+ New Article]    │
└─────────────────────────────────────────────────────┘
```
- Large title on left
- Green "+ New Article" button on right

### Articles Table
```
┌──────────────────────────────────────────────────────────┐
│ Title            │ Type  │ Created   │ Actions         │
├──────────────────────────────────────────────────────────┤
│ I am total lost  │ Poem  │ 1/15/2019 │ [Edit] [Delete] │
│ Churning         │ Prose │ 6/10/2020 │ [Edit] [Delete] │
│ Downtown Train   │ Poem  │ 11/20/19  │ [Edit] [Delete] │
│ Cardiovascular   │ Essay │ 3/15/2021 │ [Edit] [Delete] │
└──────────────────────────────────────────────────────────┘
```

Columns show:
- **Title**: Article title
- **Type**: Color-coded type badge
- **Created**: Publication date
- **Actions**: Edit and Delete buttons

Button Behaviors:
- **Edit**: Opens edit page with form
- **Delete**: Shows confirmation
  - First click: "Delete" → "Confirm" / "Cancel" buttons appear
  - Second click: Confirms and removes article

---

## ✍️ Create Article Page

**URL**: http://localhost:3000/admin/create

### Form Layout
```
┌────────────────────────────────────────────┐
│ ← Back to Admin                            │
│                                            │
│ ┌──────────────────────────────────────┐  │
│ │ Create New Article                   │  │
│ │                                      │  │
│ │ Title *                              │  │
│ │ [_________________________________]  │  │
│ │                                      │  │
│ │ Type *                               │  │
│ │ [Poem ▼ (dropdown with options)]    │  │
│ │                                      │  │
│ │ Excerpt *                            │  │
│ │ [_________________________________]  │  │
│ │ [_________________________________]  │  │
│ │                                      │  │
│ │ Content *                            │  │
│ │ [_________________________________]  │  │
│ │ [_________________________________]  │  │
│ │ [_________________________________]  │  │
│ │ [_________________________________]  │  │
│ │                                      │  │
│ │      [Create Article Button]         │  │
│ └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

Fields:
- **Title**: Text input (single line)
- **Type**: Dropdown (Poem, Prose, Essay, Writing)
- **Excerpt**: Text area (2 rows)
- **Content**: Large text area (12 rows)
- **Submit**: Blue button with text "Create Article"

---

## ✏️ Edit Article Page

**URL**: http://localhost:3000/admin/edit/[id]

### Same as Create Page
```
┌────────────────────────────────────────────┐
│ ← Back to Admin                            │
│                                            │
│ ┌──────────────────────────────────────┐  │
│ │ Edit Article                         │  │
│ │                                      │  │
│ │ Title *                              │  │
│ │ [Current title filled in]            │  │
│ │                                      │  │
│ │ Type *                               │  │
│ │ [Current type selected ▼]            │  │
│ │                                      │  │
│ │ Excerpt *                            │  │
│ │ [Current excerpt filled in]          │  │
│ │                                      │  │
│ │ Content *                            │  │
│ │ [Current content filled in]          │  │
│ │                                      │  │
│ │      [Update Article Button]         │  │
│ └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

Differences from Create:
- Page title says "Edit Article"
- All fields pre-filled with current data
- Submit button says "Update Article"

---

## 🎨 Color Scheme by Article Type

### Poem Type
- **Badge**: Blue background with blue text
- **Page Header**: Blue to indigo gradient
- RGB: (59, 130, 246) to darker blue

### Prose Type
- **Badge**: Purple background with purple text
- **Page Header**: Purple to violet gradient
- RGB: (168, 85, 247) to darker purple

### Essay Type
- **Badge**: Green background with green text
- **Page Header**: Green to emerald gradient
- RGB: (34, 197, 94) to darker green

### Writing Type
- **Badge**: Orange background with orange text
- **Page Header**: Orange to amber gradient
- RGB: (249, 115, 22) to darker orange

---

## 📱 Responsive Design

### Desktop (1024px+)
- 3-column article grid
- Full-width navigation
- Table layout for admin

### Tablet (768px - 1023px)
- 2-column article grid
- Optimized spacing
- Touch-friendly buttons

### Mobile (320px - 767px)
- 1-column article grid
- Stack layout for form
- Full-width buttons
- Hamburger-style responsive design

---

## 🎯 User Interactions

### Home Page
- ✅ Hover over article cards → Card lifts up
- ✅ Click filter button → Updates gallery
- ✅ Click article title → Goes to article page
- ✅ Click Admin button → Goes to admin dashboard

### Article Page
- ✅ Click "Back to Articles" → Returns to home
- ✅ Scroll → Smooth scrolling behavior

### Admin Dashboard
- ✅ Click "+ New Article" → Goes to create page
- ✅ Click "Edit" → Goes to edit page
- ✅ Click "Delete" → Asks for confirmation
- ✅ Click "Confirm" → Deletes article

### Forms
- ✅ Fill in fields → Updates form data
- ✅ Change type dropdown → Updates selection
- ✅ Click submit → Validates and saves
- ✅ Loading state → Button shows "Saving..."

---

## 📊 Layout Breakpoints

```
Mobile      Tablet       Desktop      Large
320px      768px        1024px       1280px
  ├──────┬──────┬──────┬──────┬──────┐
  │ 1col │ 2col │ 2col │ 3col │ 3col │
  └──────┴──────┴──────┴──────┴──────┘
```

---

## ✨ Special Features

### Featured Articles
- Marked with ⭐ star in gallery
- Stand out visually
- Useful for highlighting favorites

### Article Types Filter
- Helps organize large collections
- Shows count of articles per type
- "All" option shows everything

### Smooth Interactions
- Page transitions are smooth
- Buttons have hover effects
- Cards have lift animation on hover

### Clean Typography
- Professional font stack
- Readable sizes
- Good line spacing
- High contrast for accessibility

---

## 🚀 Next Steps After Setup

1. **View your site** → http://localhost:3000
2. **Add your first article** → /admin/create
3. **View in gallery** → Home page shows it
4. **Try filters** → Click type buttons
5. **Edit/Delete** → Practice in admin
6. **Customize design** → Change colors/title
7. **Deploy** → Share with the world!

---

Enjoy your beautiful publishing platform! 🎉
