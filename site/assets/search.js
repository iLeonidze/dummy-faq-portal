const searchInput = document.querySelector("[data-faq-search]");
const faqItems = Array.from(document.querySelectorAll(".faq-item"));
const searchStatus = document.querySelector("[data-search-status]");
const emptyState = document.querySelector("[data-empty-state]");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const navLinks = Array.from(
  document.querySelectorAll(".nav a, .site-nav a"),
);

const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const updateSearch = () => {
  if (!searchInput || faqItems.length === 0) {
    return;
  }

  const query = normalize(searchInput.value);
  let visibleCount = 0;

  faqItems.forEach((item) => {
    const haystack = normalize(item.dataset.search || item.textContent || "");
    const matches = query === "" || haystack.includes(query);
    item.hidden = !matches;

    if (matches) {
      visibleCount += 1;
    }
  });

  if (searchStatus) {
    searchStatus.textContent =
      query === ""
        ? `${faqItems.length} questions on this page`
        : `${visibleCount} result${visibleCount === 1 ? "" : "s"} for "${searchInput.value.trim()}"`;
  }

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
};

const toggleScrollButton = () => {
  if (!scrollTopButton) {
    return;
  }

  scrollTopButton.hidden = window.scrollY < 260;
};

const highlightCurrentNav = () => {
  if (navLinks.length === 0) {
    return;
  }

  const currentPath = window.location.pathname.replace(/\/$/, "/index.html");

  navLinks.forEach((link) => {
    const explicitMatch = link.dataset.navMatch;
    const href = new URL(link.getAttribute("href") || "", window.location.href)
      .pathname
      .replace(/\/$/, "/index.html");

    link.classList.toggle(
      "is-active",
      explicitMatch ? currentPath.startsWith(explicitMatch) : href === currentPath,
    );
  });
};

if (searchInput) {
  searchInput.addEventListener("input", updateSearch);
  updateSearch();
}

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleScrollButton, { passive: true });
  toggleScrollButton();
}

highlightCurrentNav();
