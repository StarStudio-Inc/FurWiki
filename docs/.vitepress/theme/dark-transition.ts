// docs/.vitepress/theme/dark-transition.ts
// 客户端脚本：在主题切换时创建径向扩展动画并在中点切换 `dark` 类

if (typeof window !== 'undefined') {
  (function () {
    const STORAGE_KEY = 'vueuse-color-scheme';
    const DURATION = 700; // ms

    // 常用可能的切换器选择器（覆盖默认主题以及自定义按钮）
    const TOGGLE_SELECTORS = [
      'button[aria-label*="theme"]',
      'button[aria-label*="Theme"]',
      'button[title*="theme"]',
      'button[title*="Theme"]',
      '[data-theme-toggle]',
      '.vp-color-mode',
      '.vp-theme-toggle',
      'button[aria-label*="切换主题"]'
    ];

    let lastClick = null;

    document.addEventListener('click', (e) => {
      lastClick = e;
    }, { capture: true, passive: true });

    function matchesToggle(el) {
      if (!el) return null;
      for (const sel of TOGGLE_SELECTORS) {
        const found = el.closest(sel);
        if (found) return found;
      }
      return null;
    }

    function getCurrentMode() {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    function setStoredMode(mode) {
      try {
        if (mode === 'light' || mode === '' ) localStorage.setItem(STORAGE_KEY, '');
        else localStorage.setItem(STORAGE_KEY, mode);
      } catch (err) {
        // ignore
      }
    }

    function createOverlay(x, y, color) {
      const el = document.createElement('div');
      el.className = 'vp-dark-transition-overlay';
      Object.assign(el.style, {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '99999',
        background: color,
        clipPath: `circle(0px at ${x}px ${y}px)`,
        transition: `clip-path ${DURATION}ms ease-out, opacity ${DURATION}ms ease-out`
      });
      return el;
    }

    function calcMaxRadius(x, y) {
      const w = Math.max(x, window.innerWidth - x);
      const h = Math.max(y, window.innerHeight - y);
      return Math.hypot(w, h);
    }

    document.addEventListener('click', (e) => {
      const toggleBtn = matchesToggle(e.target);
      if (!toggleBtn) return;

      // 拦截默认行为，自己来处理切换和动画
      e.preventDefault();
      e.stopPropagation();

      const click = lastClick || e;
      const x = (click && click.clientX) || window.innerWidth / 2;
      const y = (click && click.clientY) || window.innerHeight / 2;

      const current = getCurrentMode();
      const next = current === 'dark' ? 'light' : 'dark';

      // overlay 颜色选择（由当前切换方向决定）
      const color = next === 'dark' ? 'black' : 'white';

      const overlay = createOverlay(x, y, color);
      document.documentElement.appendChild(overlay);

      // 强制回流，确保初始 clip-path 生效
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      overlay.getBoundingClientRect();

      // 扩大圆形
      const radius = Math.ceil(calcMaxRadius(x, y));

      // 在动画中点切换 class，以获得从当前状态到目标状态的视觉效果
      const midpoint = DURATION * 0.45;
      const endTime = DURATION;

      // 启动动画
      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
        overlay.style.opacity = '1';
      });

      // 切换 mode（在动画中点），并更新本地存储
      setTimeout(() => {
        // 切换类
        if (next === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        setStoredMode(next === 'light' ? '' : next);
      }, midpoint);

      // 清理
      setTimeout(() => {
        // 收缩淡出
        overlay.style.opacity = '0';
        // 等退出动画完成再移除
        setTimeout(() => {
          if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 200);
      }, endTime);

    }, { capture: true });

    // 低级别的备用：监视直接对 html.dark 的更改（例如通过键盘或其它 API）
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'class') {
          // 当类变更时，我们不需要额外动作，样式中已包含 smooth 过渡
        }
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  })();
}
