if (!self.define) {
  let e,
    t = {};
  const i = (i, o) => (
    (i = new URL(i + ".js", o).href),
    t[i] ||
      new Promise((t) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = t), document.head.appendChild(e);
        } else (e = i), importScripts(i), t();
      }).then(() => {
        let e = t[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (o, r) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (t[n]) return;
    let s = {};
    const l = (e) => i(e, n),
      c = { module: { uri: n }, exports: s, require: l };
    t[n] = Promise.all(o.map((e) => c[e] || l(e))).then((e) => (r(...e), s));
  };
}
define(["./workbox-fa446783"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "registerSW.js", revision: "22271febdc61e0ae248cd93e3ec01f59" },
        { url: "index.html", revision: "0.dek16cqq73o" },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"), {
        allowlist: [/^\/$/],
      }),
    );
});
