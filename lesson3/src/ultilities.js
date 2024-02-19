import Navigo from "navigo";
// import Toastify from "toastify-js";
const router = new Navigo("/", { linksSelector: "a" });
let effects = [];
let currentEffectOrder = 0;
let rootComponent = null;
let rootContainer = null;
let states = [];
let currentStateOrder = 0;
const debounce = (fn, timeout = 100) => {
  let timeId = null;

  return (...rest) => {
    if (timeId) clearTimeout(timeId);

    timeId = setTimeout(() => fn(...rest), timeout);
  };
};
function printf(container, component) {
  document.querySelector(container).innerHTML = component();
  rootComponent = component;
  rootContainer = container;
  effects.forEach((effect) => {
    effect.cb();
  });
}
const rerender = debounce(() => {
  currentStateOrder = 0;
  currentEffectOrder = 0;
  document.querySelector(rootContainer).innerHTML = rootComponent();

  effects.forEach((effect) => {
    // shouldRunEffect = true khi không truyền deps hoặc deps khác nhau
    const shouldRunEffect =
      !effect.nextDeps ||
      effect.nextDeps?.some((dep, i) => {
        return dep !== effect?.prevDeps?.[i];
      });

    if (shouldRunEffect) {
      effect.cb();
    }
  });
});
const useState = (initialState) => {
  let state;
  let stateOrder = currentStateOrder;

  if (states[stateOrder] !== undefined) {
    state = states[stateOrder];
  } else {
    state = states[stateOrder] = initialState;
  }

  const updater = (newState) => {
    if (newState === undefined) {
      throw new Error("New state must not be undefined");
    }

    if (typeof newState === "function") {
      states[stateOrder] = newState(states[stateOrder]);
    } else {
      states[stateOrder] = newState;
    }

    rerender();
  };

  currentStateOrder++;

  return [state, updater];
};
const useEffect = (cb, deps) => {
  let effectOrder = currentEffectOrder;

  if (!effects[effectOrder]) {
    effects.push({
      cb: cb,
      prevDeps: null,
      nextDeps: deps,
    });
  } else {
    effects[effectOrder] = {
      cb: cb,
      prevDeps: effects[effectOrder].nextDeps,
      nextDeps: deps,
    };
  }

  currentEffectOrder++;
};
router.on("/*", () => {}, {
  before(done, match) {
    states = [];
    currentStateOrder = 0;
    effects = [];
    currentEffectOrder = 0;

    done();
  },
});
const Formatter = new Intl.NumberFormat();
function loading() {
  return `
<div class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style="background: rgba(0, 0, 0, 0.3);">
      <div class="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
        <div class="loader-dots block relative w-20 h-5 mt-2">
          <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div class="text-gray-500 text-xs font-medium mt-2 text-center">
          Loading...
        </div>
      </div>
      </div>
    </div>`;
}
function parseLinkHeaders(linkHeader) {
  const links = linkHeader.split(",").map((link) => {
    const match = link.match(/<(.*?)>;\s+rel="(.*?)"/);
    return {
      url: match[1],
      rel: match[2],
    };
  });

  const values = links.reduce((acc, link) => {
    const [pageNumber] = link.url.match(/_page=(\d+)/);
    acc[link.rel] = +pageNumber.replace("_page=", "");
    return acc;
  }, {});
  return values;
}
const ToastMessage = {};
export {
  router,
  printf,
  useState,
  useEffect,
  Formatter,
  loading,
  parseLinkHeaders,
  debounce,
  // Toastify,
};
