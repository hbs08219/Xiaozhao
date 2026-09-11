import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './store';
import Home from './pages/Home';
import Ceremony from './pages/Ceremony';
import Gifts from './pages/Gifts';
import Props from './pages/Props';

const NAV = [
  { to: '/', label: '总览' },
  { to: '/ceremony', label: '仪式' },
  { to: '/gifts', label: '彩礼' },
  { to: '/props', label: '道具' },
];

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <div className="app">
          <nav className="nav">
            <div className="nav-inner">
              <span className="brand">备婚手册</span>
              <div className="nav-links">
                {NAV.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                  >
                    {n.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ceremony" element={<Ceremony />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/props" element={<Props />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <footer className="footer">示例内容仅供参考，价码按需改。勾选和备注存在本机浏览器里。</footer>
        </div>
      </HashRouter>
    </StoreProvider>
  );
}
