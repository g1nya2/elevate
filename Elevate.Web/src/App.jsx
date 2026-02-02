import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import M365 from './pages/categories/M365';
import Copilot from './pages/categories/Copilot';
import Minecraft from './pages/categories/Minecraft';
import Teams from './pages/categories/Teams';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="m365" element={<M365 />} />
        <Route path="copilot" element={<Copilot />} />
        <Route path="minecraft" element={<Minecraft />} />
        <Route path="teams" element={<Teams />} />
        <Route path=":category/:postId" element={<PostDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
