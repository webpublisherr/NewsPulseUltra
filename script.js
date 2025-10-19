const newsContainer = document.getElementById("newsContainer");
const categoryFilter = document.getElementById("categoryFilter");
const subcategoryFilter = document.getElementById("subcategoryFilter");

function renderPosts(filteredPosts) {
  newsContainer.innerHTML = "";
  filteredPosts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post";
    card.innerHTML = `
      <img src="${post.image}" />
      <h2>${post.title}</h2>
      <p>${post.summary}</p>
      <small>${post.date} | ${post.category} > ${post.subcategory}</small>
    `;
    newsContainer.appendChild(card);
  });
}

function populateFilters() {
  categoryFilter.innerHTML = `<option value="">All Categories</option>`;
  Object.keys(categories).forEach(cat => {
    categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
  });

  categoryFilter.addEventListener("change", () => {
    const selected = categoryFilter.value;
    subcategoryFilter.innerHTML = `<option value="">All Subcategories</option>`;
    if (selected && categories[selected]) {
      categories[selected].forEach(sub => {
        subcategoryFilter.innerHTML += `<option value="${sub}">${sub}</option>`;
      });
    }
    filterPosts();
  });

  subcategoryFilter.addEventListener("change", filterPosts);
}

function filterPosts() {
  const cat = categoryFilter.value;
  const sub = subcategoryFilter.value;
  const query = document.getElementById("search").value.toLowerCase();

  const filtered = posts.filter(p =>
    (!cat || p.category === cat) &&
    (!sub || p.subcategory === sub) &&
    (p.title.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query))
  );
  renderPosts(filtered);
}

document.getElementById("search").addEventListener("input", filterPosts);
populateFilters();
renderPosts(posts);
