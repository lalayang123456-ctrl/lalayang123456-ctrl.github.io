/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { hourlySchema, incrementHourly, pruneHourly, retentionCutoff, singaporeHour } from "./visitor-trends";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type VisitorRow = { country_code: string; views: number };

const visitorSchema = [
  hourlySchema,
  `CREATE TABLE IF NOT EXISTS visitor_totals (
    id INTEGER PRIMARY KEY,
    page_views INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS visitor_countries (
    country_code TEXT PRIMARY KEY,
    views INTEGER NOT NULL DEFAULT 0
  )`,
];

function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    return (
      (protocol === "https:" && hostname === "lalayang123456-ctrl.github.io") ||
      (protocol === "https:" && hostname.endsWith(".aiforce.cloud")) ||
      (protocol === "http:" && (hostname === "localhost" || hostname === "127.0.0.1"))
    );
  } catch {
    return false;
  }
}

function corsHeaders(request: Request) {
  const origin = request.headers.get("Origin");
  return {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    ...(origin && isAllowedOrigin(origin) ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
  };
}

async function ensureVisitorSchema(db: D1Database) {
  await db.batch(visitorSchema.map((statement) => db.prepare(statement)));
}

async function readVisitorStats(db: D1Database) {
  await ensureVisitorSchema(db);
  const [totalResult, countriesResult] = await Promise.all([
    db.prepare("SELECT page_views FROM visitor_totals WHERE id = 1").first<{ page_views: number }>(),
    db.prepare("SELECT country_code, views FROM visitor_countries ORDER BY views DESC").all<VisitorRow>(),
  ]);
  const countries = countriesResult.results ?? [];

  return {
    pageViews: totalResult?.page_views ?? 0,
    countries: countries.length,
    countryCodes: countries.map((row) => row.country_code),
  };
}

async function handleVisitors(request: Request, env: Env) {
  const headers = corsHeaders(request);
  const origin = request.headers.get("Origin");

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (!isAllowedOrigin(origin)) {
    return Response.json({ error: "Origin not allowed" }, { status: 403, headers });
  }

  if (request.method === "POST") {
    await ensureVisitorSchema(env.DB);
    const countryCode = (
      (request as Request & { cf?: { country?: string } }).cf?.country ??
      request.headers.get("CF-IPCountry") ??
      ""
    ).toUpperCase();
    const updates = [
      env.DB.prepare(
        "INSERT INTO visitor_totals (id, page_views) VALUES (1, 1) ON CONFLICT(id) DO UPDATE SET page_views = page_views + 1",
      ),
    ];

    if (/^[A-Z]{2}$/.test(countryCode)) {
      updates.push(
        env.DB.prepare(
          "INSERT INTO visitor_countries (country_code, views) VALUES (?, 1) ON CONFLICT(country_code) DO UPDATE SET views = views + 1",
        ).bind(countryCode),
      );
    }

    const now = new Date();
    updates.push(
      env.DB.prepare(incrementHourly).bind(singaporeHour(now), /^[A-Z]{2}$/.test(countryCode) ? countryCode : "UNKNOWN"),
      env.DB.prepare(pruneHourly).bind(retentionCutoff(now)),
    );

    await env.DB.batch(updates);
  } else if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers });
  }

  const stats = await readVisitorStats(env.DB);
  return Response.json(stats, {
    headers: { ...headers, "Cache-Control": "no-store" },
  });
}

async function handleVisitorMap(request: Request, env: Env) {
  const stats = await readVisitorStats(env.DB);
  const selectors = stats.countryCodes
    .filter((code) => /^[A-Z]{2}$/.test(code))
    .map((code) => `.${code} path`)
    .join(",");
  const assetUrl = new URL("/assets/images/visitor-world-map.svg", request.url);
  const assetResponse = await env.ASSETS.fetch(new Request(assetUrl));
  let svg = await assetResponse.text();

  if (selectors) {
    svg = svg.replace(
      "</style>",
      `${selectors}{fill:#d64b3b!important;stroke:#171715!important}</style>`,
    );
  }

  return new Response(svg, {
    headers: {
      ...corsHeaders(request),
      "Cache-Control": "no-store",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/visitors") {
      return handleVisitors(request, env);
    }

    if (url.pathname === "/api/visitor-map.svg") {
      return handleVisitorMap(request, env);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
