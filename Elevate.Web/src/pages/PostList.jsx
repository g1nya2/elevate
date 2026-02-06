import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import PostGrid from '../components/PostGrid';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const DISPLAY_NAMES = {
  m365: 'M365',
  copilot: 'Copilot',
  minecraft: 'Minecraft',
  teams: 'Teams',
};

const VALID_CATEGORIES = Object.keys(DISPLAY_NAMES);

export default function PostList() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const PAGE_SIZE = 9;

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  // intentionally not exposing error to UI; keep only for console/logging
  const [error, setError] = useState(null);

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return <NotFound />;
  }

  const displayName = DISPLAY_NAMES[category] || category;

  useEffect(() => {
    if (!category || !VALID_CATEGORIES.includes(category)) return;
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Fetch static posts.json
        const res = await fetch('/api/posts.json', { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Server error ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const allItems = data.items || [];

        // Client-side filtering by category
        const filtered = allItems.filter((p) => p.category === category);

        // Client-side pagination
        const start = (pageParam - 1) * PAGE_SIZE;
        const paginated = filtered.slice(start, start + PAGE_SIZE);

        setPosts(paginated);
        setTotal(filtered.length);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to load posts');
        console.warn('PostList fetch error:', err.message || err);
        setPosts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [category, pageParam]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handlePageChange = (p) => {
    // update query param and scroll to top of list
    setSearchParams({ page: String(p) }, { replace: false });
    // keep the same route; ensure router updates
    navigate({ search: `?page=${p}` });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return <NotFound />;
  }

  return (
    <main className="w-full px-4 sm:px-8 lg:px-12 py-8">
      <header className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{displayName} Posts</h1>
        <div className="w-full sm:w-80"><SearchBar placeholder={`Search ${displayName}`} onSubmit={(q) => { setSearchParams({ page: '1', q }); }} /></div>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        <aside className="w-full lg:col-span-2">
          <div className="space-y-3">
            <ul className="flex flex-wrap lg:flex-col gap-2 mt-2">
              {VALID_CATEGORIES.map((c) => (
                <li key={c}>
                  <Link to={`/posts/${c}`} className={`inline-block px-4 py-2 rounded-full border ${c === category ? 'bg-ms-blue text-white' : 'bg-white text-slate-700'}`}>
                    {DISPLAY_NAMES[c]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="w-full lg:col-span-10">
          {loading && <div className="text-center py-8">로딩 중...</div>}
          <PostGrid posts={posts} />
          <Pagination currentPage={pageParam} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </div>
    </main>
  );
}
