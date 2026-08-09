/** Formats an ISO date ("2026-06-15") as "15 Haziran 2026". */
export function formatDate(iso: string): string {
    if (!iso) return "";

    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;

    return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}
