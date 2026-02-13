const books = [
  {
    id: 1,
    title: "The Silent Archive",
    author: "Elena Ward",
    category: ["trending", "fiction"],
    tagline: "A city where memories are checked out like books.",
    length: "384 pages",
    status: "In progress",
  },
  {
    id: 2,
    title: "Designing Calm Interfaces",
    author: "Noah Kato",
    category: ["trending", "design", "nonfiction"],
    tagline: "Creating digital spaces that feel like quiet rooms.",
    length: "264 pages",
    status: "Finished · 4.8★",
  },
  {
    id: 3,
    title: "Liquid Systems",
    author: "Ariel Park",
    category: ["tech", "nonfiction"],
    tagline: "The new language of glass, depth, and motion.",
    length: "312 pages",
    status: "New this week",
  },
  {
    id: 4,
    title: "Midnight Stacks",
    author: "Rae Collins",
    category: ["fiction"],
    tagline: "Librarians guarding a portal hidden in the shelves.",
    length: "426 pages",
    status: "Unread",
  },
  {
    id: 5,
    title: "The Pattern Index",
    author: "Harper Ng",
    category: ["tech", "trending"],
    tagline: "Frameworks for thinking in systems, not screens.",
    length: "298 pages",
    status: "In progress",
  },
  {
    id: 6,
    title: "Lightfall Diaries",
    author: "J. Rivera",
    category: ["fiction", "trending"],
    tagline: "Letters between two worlds split by a falling sky.",
    length: "352 pages",
    status: "Finished · 4.9★",
  },
  {
    id: 7,
    title: "Signals & Silence",
    author: "Milo Hart",
    category: ["nonfiction"],
    tagline: "Why attention is the rarest modern currency.",
    length: "220 pages",
    status: "In progress",
  },
  {
    id: 8,
    title: "Blueprints for Tomorrow",
    author: "Sana Iqbal",
    category: ["tech", "design"],
    tagline: "Interfaces that will feel obvious in ten years.",
    length: "304 pages",
    status: "New this week",
  },
];

const booksGrid = document.getElementById("booksGrid");
const chips = document.querySelectorAll(".chip");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function renderBooks(filter = "all") {
  if (!booksGrid) return;

  booksGrid.innerHTML = "";
  const filtered =
    filter === "all" ? books : books.filter((b) => b.category.includes(filter));

  filtered.forEach((book) => {
    const card = document.createElement("article");
    card.className = "book-card";
    card.innerHTML = `
      <div class="book-top">
        <div class="book-cover"></div>
        <div class="book-meta">
          <h3>${book.title}</h3>
          <span class="author">${book.author}</span>
          <p class="tagline">${book.tagline}</p>
        </div>
      </div>
      <div class="book-footer">
        <span>${book.length}</span>
        <span class="badge">${book.status}</span>
      </div>
    `;
    booksGrid.appendChild(card);
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const filter = chip.dataset.filter;
    renderBooks(filter);
  });
});

function renderSearchResults(query = "") {
  if (!searchResults) return;

  const q = query.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (!q) {
    const hint = document.createElement("div");
    hint.className = "search-result-item";
    hint.innerHTML = `
      <div class="search-result-titles">
        <span class="search-result-title">Try "Liquid Systems" or "Designing Calm Interfaces"</span>
        <span class="search-result-author">Instantly filter across your entire library.</span>
      </div>
    `;
    searchResults.appendChild(hint);
    return;
  }

  const results = books.filter((b) => {
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.tagline.toLowerCase().includes(q)
    );
  });

  if (results.length === 0) {
    const empty = document.createElement("div");
    empty.className = "search-result-item";
    empty.innerHTML = `
      <div class="search-result-titles">
        <span class="search-result-title">No matches yet</span>
        <span class="search-result-author">Try a different keyword or category.</span>
      </div>
    `;
    searchResults.appendChild(empty);
    return;
  }

  results.forEach((book) => {
    const row = document.createElement("div");
    row.className = "search-result-item";
    row.innerHTML = `
      <div class="search-result-titles">
        <span class="search-result-title">${book.title}</span>
        <span class="search-result-author">${book.author}</span>
      </div>
      <span class="search-result-meta">${book.length}</span>
    `;
    searchResults.appendChild(row);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    renderSearchResults(e.target.value);
  });
}

renderBooks();
renderSearchResults();

const tiltCards = document.querySelectorAll("[data-tilt]");

function handleTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const xPercent = x / rect.width - 0.5;
  const yPercent = y / rect.height - 0.5;

  const rotateX = yPercent * -10;
  const rotateY = xPercent * 10;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
}

function resetTilt(e) {
  const card = e.currentTarget;
  card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
}

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", handleTilt);
  card.addEventListener("mouseleave", resetTilt);
});
