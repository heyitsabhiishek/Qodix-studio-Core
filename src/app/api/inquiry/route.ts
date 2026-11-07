import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  projectType: z.string().trim().min(2).max(80),
  budget: z.string().trim().min(2).max(80),
  timeline: z.string().trim().min(2).max(80),
  description: z.string().trim().min(20, "Tell us a little more (min. 20 characters)").max(4000),
});

// lightweight in-memory rate limit: 5 submissions / 10 min / IP
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_HITS) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

function makeReferenceId(): string {
  return `QDX-${randomUUID().split("-")[0].toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }

    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message ?? "Please review the form and try again." },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const referenceId = makeReferenceId();

    await db.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        projectType: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
        description: data.description,
        referenceId,
      },
    });

    return NextResponse.json({ ok: true, referenceId }, { status: 201 });
  } catch (err) {
    console.error("[/api/inquiry] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side. Please try again." },
      { status: 500 }
    );
  }
}
