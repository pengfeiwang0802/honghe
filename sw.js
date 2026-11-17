/* 红河河粉 · 离线缓存（自动生成，勿手改） */
const VERSION = "46710c11b1";
const CACHE = "honghe-" + VERSION;
const ASSETS = [
 "./",
 "index.html",
 "app.js",
 "style.css",
 "manifest.webmanifest",
 "icon-180.png",
 "icon-192.png",
 "icon-512.png",
 "data/lessons/index.json",
 "data/audio-map.json",
 "data/lessons/lesson-001.json",
 "data/lessons/lesson-002.json",
 "data/lessons/lesson-003.json",
 "data/lessons/lesson-004.json",
 "audio/0231bfca9ba02e81.wav",
 "audio/02340411a5f856df.wav",
 "audio/0243280ff1f212d1.wav",
 "audio/03afd2f2542fda82.wav",
 "audio/03f52befecd196e2.wav",
 "audio/0489885cf1b8bc79.wav",
 "audio/072473fe24e38e7c.wav",
 "audio/0787d24f6e25a40e.wav",
 "audio/082dad639d9728fd.wav",
 "audio/0c1b38f957b361a8.wav",
 "audio/0d0127bd74817a15.wav",
 "audio/0d3aee2d92658664.wav",
 "audio/0d87f75d4a4a7925.wav",
 "audio/0da86e0f6dc30952.wav",
 "audio/0e029dba4391007e.wav",
 "audio/0e5942f0f467a480.wav",
 "audio/0e5a744994f718ee.wav",
 "audio/0e9f8c0d14b46f36.wav",
 "audio/0ec78d789d4e4052.wav",
 "audio/0ec84c3fdadbdb8c.wav",
 "audio/0febedcf08fbd01c.wav",
 "audio/10e709e9bb3222f6.wav",
 "audio/1143da2bc54c495c.wav",
 "audio/121722bfa7d7b96f.wav",
 "audio/128f272fc20545c0.wav",
 "audio/13127283efb5ef7f.wav",
 "audio/14003298f7bd9069.wav",
 "audio/143e4042b682727b.wav",
 "audio/14d584ebebf4f563.wav",
 "audio/18209c075d3e6552.wav",
 "audio/197a034898e136b3.wav",
 "audio/1a51ef9270af5d11.wav",
 "audio/1b14823af68b20c9.wav",
 "audio/1bcf4563f3d808f3.wav",
 "audio/1d37a704c5a01ebe.wav",
 "audio/1e0c315f51c3e43b.wav",
 "audio/20a807b26746f955.wav",
 "audio/218f010c21aaadec.wav",
 "audio/22226cfe38a4fb19.wav",
 "audio/22629a25845a64c1.wav",
 "audio/229cc14ce93b14fa.wav",
 "audio/22e6f96e3d189a00.wav",
 "audio/2491e9934f2d5693.wav",
 "audio/25a0453011510494.wav",
 "audio/26a6fc561be420ff.wav",
 "audio/28ccfeb141e4e144.wav",
 "audio/295dbda9fbed6eeb.wav",
 "audio/296b47905aa2ed06.wav",
 "audio/297bdb31a6df1058.wav",
 "audio/2a324d5c798842d5.wav",
 "audio/2a8fa39ab44c9941.wav",
 "audio/2af67f1d41347134.wav",
 "audio/2b34a022058fe31e.wav",
 "audio/2cfb0e0fbbdc65b9.wav",
 "audio/2d641bdab893a5e6.wav",
 "audio/2e0c76e1c7fc1f5d.wav",
 "audio/2edfa4b5eac9ffdc.wav",
 "audio/308bc6dbd69dd9ce.wav",
 "audio/30f20953cd2ea578.wav",
 "audio/3233437747f6ba13.wav",
 "audio/32526299e91fab25.wav",
 "audio/34e0b7cac0be1c45.wav",
 "audio/36a40d0d43138b93.wav",
 "audio/37051278efe8640f.wav",
 "audio/37e7702e5ce449c1.wav",
 "audio/381866f546ffc92b.wav",
 "audio/38e95e74ddb104ba.wav",
 "audio/397d88fe71f39ab8.wav",
 "audio/3a33d1a9e6c085ad.wav",
 "audio/3bdcd4182eed26be.wav",
 "audio/3cf9e81d111ffb9e.wav",
 "audio/3d8063f963ede8fd.wav",
 "audio/3dc7f2b78443d8a5.wav",
 "audio/3e9ff00e25aa3216.wav",
 "audio/4081efeb5faaf249.wav",
 "audio/408ee114f64eacff.wav",
 "audio/40fd0b98a5e4f482.wav",
 "audio/459ea888cd138b75.wav",
 "audio/462075e5128e41c3.wav",
 "audio/471b15800a0e807a.wav",
 "audio/472cc802f58e1bf6.wav",
 "audio/47d9591b87dd294e.wav",
 "audio/4abada30a401df84.wav",
 "audio/4bc05ae244c2daf5.wav",
 "audio/4e283076066526be.wav",
 "audio/4e30ea25cda1c18c.wav",
 "audio/4e4a7903313034f4.wav",
 "audio/4e59fcdae8afae8c.wav",
 "audio/4eeb0a2cdb83618a.wav",
 "audio/4ffaa5ea075037ce.wav",
 "audio/510c2c44f4c55471.wav",
 "audio/52299fbd026fa92e.wav",
 "audio/560c48d6c73e72bd.wav",
 "audio/562cc85daaa2c894.wav",
 "audio/56cf0ad460e8f829.wav",
 "audio/571f45dce207fa47.wav",
 "audio/59a41108f7b4f76f.wav",
 "audio/59b2a4dedeecdfb9.wav",
 "audio/59f84ab8fb20a7c1.wav",
 "audio/5a4214ad727134ac.wav",
 "audio/5a535d21bf2d97e7.wav",
 "audio/5a83850a458ae996.wav",
 "audio/5d8ef33277cd67ea.wav",
 "audio/5f18e7212ffa19ad.wav",
 "audio/602ff1c8b77c4851.wav",
 "audio/6030dfe55f998e10.wav",
 "audio/60ed271c574b4677.wav",
 "audio/63212601c9d62167.wav",
 "audio/653fb712e50e7952.wav",
 "audio/6559b261ac31b06d.wav",
 "audio/66f87591aad5e233.wav",
 "audio/684f5ba93b6634f1.wav",
 "audio/68727ebdb08bcbd4.wav",
 "audio/68b32345de6eb555.wav",
 "audio/69f042daecb866d6.wav",
 "audio/6a83831950818e2c.wav",
 "audio/6b5329ad413e7f95.wav",
 "audio/6c02acedd1782cc6.wav",
 "audio/6c54d6bc44dc3824.wav",
 "audio/6ca9bbcf89763eed.wav",
 "audio/6d38f75acb3ba829.wav",
 "audio/6d799285898aa7eb.wav",
 "audio/6e1ad3a9f10604a5.wav",
 "audio/6e3fc8eb1b56c6c4.wav",
 "audio/6e5ed49aebca7193.wav",
 "audio/726ae3eebd27261b.wav",
 "audio/73e6c15f1e79a508.wav",
 "audio/75d5b3b49300adb6.wav",
 "audio/76502e82b1c5fcf0.wav",
 "audio/7777a4c2081547e6.wav",
 "audio/78b8a7e3d89c3b5c.wav",
 "audio/7ab9bf2ecb777cba.wav",
 "audio/7b780ecf8bab42b9.wav",
 "audio/7d1a87442739819e.wav",
 "audio/7d6466633091a632.wav",
 "audio/7d935f258918d1a5.wav",
 "audio/7e5295943c320a68.wav",
 "audio/7e994ec977632bb6.wav",
 "audio/7f3de329d0d4e647.wav",
 "audio/7f4e3281d3057d0e.wav",
 "audio/7fb1c01a5ddad3aa.wav",
 "audio/808e0df8dbb3689d.wav",
 "audio/80b69c87ec1ee002.wav",
 "audio/82ac515c31e19de6.wav",
 "audio/833acf0c105fa371.wav",
 "audio/8470653193438b8c.wav",
 "audio/84a47f61dd341ce7.wav",
 "audio/8576cd3f959b5bce.wav",
 "audio/85832644141d1494.wav",
 "audio/85b87972e873b635.wav",
 "audio/86dc94c7262a9e1f.wav",
 "audio/86e7ca590074a103.wav",
 "audio/8732a008c2c6c800.wav",
 "audio/87a357798c993125.wav",
 "audio/888dfa55aca7bcb5.wav",
 "audio/89682ab88ffb7152.wav",
 "audio/8a559f2da9aa8538.wav",
 "audio/8ac87c87e8a461f4.wav",
 "audio/8cd849c811f5bb84.wav",
 "audio/8e3aafe8f85bcb4a.wav",
 "audio/8e93314cbe2cff7b.wav",
 "audio/8ee50cd553090b80.wav",
 "audio/8f1eeba20bd32a74.wav",
 "audio/8f26d6fe2a3dafd8.wav",
 "audio/8fdc9ec2d9d58dfd.wav",
 "audio/8fe6ce90de08a08f.wav",
 "audio/900f43f18b200c63.wav",
 "audio/905c83e99382855d.wav",
 "audio/90643ae69f847dc4.wav",
 "audio/90c70d4241e5d6db.wav",
 "audio/9147353b4111159d.wav",
 "audio/919d664cd4006255.wav",
 "audio/930bf9fcaac93382.wav",
 "audio/93527b2029695998.wav",
 "audio/93d1047caefae7e7.wav",
 "audio/943a6f2558b6b736.wav",
 "audio/94f5876493f3ee71.wav",
 "audio/95962031f5c7b24a.wav",
 "audio/970f519c2cadbcef.wav",
 "audio/98bf62d5cda50e36.wav",
 "audio/9baae0949b58ec42.wav",
 "audio/9c09a0e3c25bcb9b.wav",
 "audio/9c66f5cdfe4c61b2.wav",
 "audio/9c7f41ae711104c1.wav",
 "audio/9cdc64e690172b2d.wav",
 "audio/9e2bbe8db9faa66d.wav",
 "audio/9ef6b931fe2fe447.wav",
 "audio/9ffed55c455d88f6.wav",
 "audio/a04d8a220dce52c0.wav",
 "audio/a19d62aa57b565dc.wav",
 "audio/a1af400810ffbe8f.wav",
 "audio/a1e141ecd45b7e5d.wav",
 "audio/a1e5eabbc0990fa4.wav",
 "audio/a1e81b381373cd92.wav",
 "audio/a2bffd347267d18e.wav",
 "audio/a3298a0b2ece5786.wav",
 "audio/a3582e717d1d7a53.wav",
 "audio/a35b3bb880cbfae7.wav",
 "audio/a422dd2016b1f644.wav",
 "audio/a5fb2baa22a62140.wav",
 "audio/a614fd04a84bba71.wav",
 "audio/a7dd24c4b5175146.wav",
 "audio/a96b023550a6e3f6.wav",
 "audio/aa55713a4c504f78.wav",
 "audio/aa8652999687d45e.wav",
 "audio/ad095192bff670b7.wav",
 "audio/adc9d831a1a63645.wav",
 "audio/ade5c2868f9e6f66.wav",
 "audio/afc1cb2954f8a191.wav",
 "audio/b21259e1dcd5c47a.wav",
 "audio/b3d73e8a0edf3a8c.wav",
 "audio/b40c8e0da935b48a.wav",
 "audio/b4570d60bb90b309.wav",
 "audio/b63596d021f62fc8.wav",
 "audio/b642fe291784d745.wav",
 "audio/b7e4495078a81fc3.wav",
 "audio/b8216256c432b8ce.wav",
 "audio/b9c82a7a3557121a.wav",
 "audio/bac09574e280becb.wav",
 "audio/bc0b3293822a9ddd.wav",
 "audio/bcc49ff885aef284.wav",
 "audio/bcedaae3e49525a3.wav",
 "audio/be7fc4e754770c9e.wav",
 "audio/c01dda7911b010da.wav",
 "audio/c04b01bafaa69682.wav",
 "audio/c252e3ea61279afa.wav",
 "audio/c2634aaaa22b3251.wav",
 "audio/c4eca024465167bc.wav",
 "audio/c50123de5919373e.wav",
 "audio/c64dcd36018e8ee9.wav",
 "audio/c655b69da5680381.wav",
 "audio/cb76808999afa7cd.wav",
 "audio/cecf590df3b21739.wav",
 "audio/cf37011287f5407d.wav",
 "audio/cf456a52c9ffcf9d.wav",
 "audio/cf91d532f4af30ba.wav",
 "audio/d0447fdf41cd06f1.wav",
 "audio/d0be4b143ccdbe8c.wav",
 "audio/d18828a3f6720e53.wav",
 "audio/d25a53095517e98e.wav",
 "audio/d25e9cede57e7ef9.wav",
 "audio/d3c54f91225b1ad9.wav",
 "audio/d4fbd7e8edcff9ac.wav",
 "audio/d510ce394c546e3d.wav",
 "audio/d65f66c1e2ecf157.wav",
 "audio/d93413a87f2435e2.wav",
 "audio/d9fe821a6a789209.wav",
 "audio/db8acb0478855976.wav",
 "audio/dbaf2e6354d556f2.wav",
 "audio/dd0bfdcc0de1415c.wav",
 "audio/dd9cc5794bdc276e.wav",
 "audio/dda1b23e1220e69f.wav",
 "audio/def27973aeed2adc.wav",
 "audio/dfeb95f97e460897.wav",
 "audio/e1ecdf24df376451.wav",
 "audio/e2813e4532a20cb4.wav",
 "audio/e36b1cb6966e7722.wav",
 "audio/e4182a97c05812a9.wav",
 "audio/e51c89a8f456e641.wav",
 "audio/e530a4ec95132d4f.wav",
 "audio/e6bb723827ced15d.wav",
 "audio/e909e5498202090f.wav",
 "audio/ebafdd80c339b3d6.wav",
 "audio/ec2a2b1bac9c4013.wav",
 "audio/ec868a5bd88a724b.wav",
 "audio/ed24f8b1a2252a0f.wav",
 "audio/edc92d93440eae6c.wav",
 "audio/f0563bb540c44717.wav",
 "audio/f16b49f38336a58e.wav",
 "audio/f3433d8e8031218b.wav",
 "audio/f47f5e27384c5c0c.wav",
 "audio/f4e5034d4bc5e42f.wav",
 "audio/f4ff641b20aacd28.wav",
 "audio/f515bff125ee90a4.wav",
 "audio/f97434a2d77b721a.wav",
 "audio/fb8bb5a0dfe2d76d.wav",
 "audio/fe162c8730b3aa5d.wav",
 "audio/fe8a7d5c1db61fb1.wav"
];

/* Safari / iOS 播放音频会发 Range 请求；缓存命中时必须回 206，
   否则 Safari 拿到 200 全量会判定媒体不可播（Chrome 不受影响）。 */
async function rangeResponse(req, cached) {
  const buf = await cached.arrayBuffer();
  const size = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get("range") || "");
  if (!m) return cached;
  let start = m[1] === "" ? null : parseInt(m[1], 10);
  let end = m[2] === "" ? null : parseInt(m[2], 10);
  if (start === null && end === null) return cached;
  if (start === null) { start = Math.max(0, size - end); end = size - 1; }
  if (end === null || end >= size) end = size - 1;
  if (start >= size) {
    return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + size } });
  }
  const chunk = buf.slice(start, end + 1);
  return new Response(chunk, {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Range": "bytes " + start + "-" + end + "/" + size,
      "Content-Length": String(chunk.byteLength),
      "Accept-Ranges": "bytes",
      "Content-Type": cached.headers.get("Content-Type") || "application/octet-stream",
      "Cache-Control": cached.headers.get("Cache-Control") || "max-age=600",
    },
  });
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(ASSETS.map(async p => {
      const url = new URL(p, self.registration.scope).href;
      try { await cache.add(new Request(url, { cache: "reload" })); } catch (err) {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 页面外壳走网络优先（发新版立刻生效），音视频/数据走缓存优先（离线秒开）
  const isShell = req.mode === "navigate" ||
    /\/(index\.html)?$/.test(url.pathname) ||
    /\.(js|css|webmanifest)$/.test(url.pathname);

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (isShell) {
      try {
        const res = await fetch(req);
        if (res && res.ok && res.type === "basic") {
          const key = req.mode === "navigate"
            ? new URL("index.html", self.registration.scope).href : req;
          cache.put(key, res.clone()).catch(() => {});
        }
        return res;
      } catch (err) {
        const key = req.mode === "navigate"
          ? new URL("index.html", self.registration.scope).href : req;
        const hit = await cache.match(key, { ignoreSearch: true });
        if (hit) return hit;
        throw err;
      }
    }
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) {
      return req.headers.has("range") ? await rangeResponse(req, hit) : hit;
    }
    const res = await fetch(req);
    // 只缓存完整 200；206 局部响应缓存下来会永久损坏该音频
    if (res && res.status === 200 && res.type === "basic") {
      cache.put(req, res.clone()).catch(() => {});
    }
    return res;
  })());
});
