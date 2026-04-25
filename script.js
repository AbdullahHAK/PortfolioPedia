document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  const themeLink = document.getElementById('theme-link');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobilePanel = document.getElementById('mobile-panel');
  const searchForm = document.querySelector('.search-form');
  const printLink = document.getElementById('print-link');
  const tocToggle = document.getElementById('toc-toggle');
  const tocBody = document.getElementById('toc-body');
  const toast = document.getElementById('toast');
  const editLinks = document.querySelectorAll('.edit-link');
  const sectionLinks = document.querySelectorAll('.toc-list a');
  const sections = document.querySelectorAll('main article section[id]');
  const html = document.documentElement;

  function updateThemeIcon() {
    const current = html.getAttribute('data-theme');
    const icon = current === 'dark' ? '🌙' : '☀️';
    themeToggle.textContent = icon;
  }

  function updateThemeLinkText() {
    if (!themeLink) return;
    const current = html.getAttribute('data-theme');
    themeLink.textContent = current === 'dark' ? 'Light mode' : 'Dark mode';
  }

  function setTheme(mode) {
    html.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    updateThemeIcon();
    updateThemeLinkText();
  }

  themeToggle.addEventListener('click', function () {
    const nextTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  if (themeLink) {
    themeLink.addEventListener('click', function (event) {
      event.preventDefault();
      const nextTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  updateThemeIcon();
  updateThemeLinkText();

  mobileMenuButton.addEventListener('click', function () {
    mobilePanel.style.display = mobilePanel.style.display === 'block' ? 'none' : 'block';
  });

  function handleSearchSubmit(event) {
    event.preventDefault();
    const query = event.target.querySelector('input').value.trim();
    if (query) {
      window.location.href = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`;
    }
  }

  if (searchForm) {
    searchForm.addEventListener('submit', handleSearchSubmit);
  }

  if (printLink) {
    printLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.print();
    });
  }

  tocToggle.addEventListener('click', function () {
    const hidden = tocBody.style.display === 'none';
    tocBody.style.display = hidden ? 'block' : 'none';
    tocToggle.textContent = hidden ? 'hide' : 'show';
  });

  sectionLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      sectionLinks.forEach(function (other) {
        other.classList.remove('active');
      });
      link.classList.add('active');
    });
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          sectionLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-25% 0px -60% 0px', threshold: 0.1 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  editLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      toast.textContent = 'Editing is disabled on this article.';
      toast.classList.add('visible');
      setTimeout(function () {
        toast.classList.remove('visible');
      }, 2500);
    });
  });

  const lastEdited = document.getElementById('last-edited');
  if (lastEdited) {
    const today = new Date();
    lastEdited.textContent = today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
});
