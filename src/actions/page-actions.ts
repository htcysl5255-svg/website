"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function savePage(pageData: any, isNew: boolean, id?: string) {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession) {
        return { error: "Unauthorized" };
    }

    // Use Service Role Key to bypass RLS
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                getAll() { return [] },
                setAll() { }
            }
        }
    );

    let error;
    if (isNew) {
        const { error: err } = await supabase.from("pages").insert([pageData]);
        error = err;
    } else {
        const { error: err } = await supabase.from("pages").update(pageData).eq("id", id);
        error = err;
    }

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/pages");
    revalidatePath("/"); // Revalidate home page
    return { success: true };
}
