import { supabaseSever } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseSever.from("levels").select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}
