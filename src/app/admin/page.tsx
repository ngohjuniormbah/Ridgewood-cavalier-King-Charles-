import { isAuthenticated } from "@/lib/auth";
import { getSiteData, getSettings, getContent } from "@/lib/store";
import { supabaseEnabled } from "@/lib/supabase";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

// The admin area is intentionally reachable by URL only — it is never linked
// from the public site and is excluded from robots and the sitemap.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAuthenticated()) {
    return <AdminLogin />;
  }

  const [data, settings, content] = await Promise.all([
    getSiteData(),
    getSettings(),
    getContent(),
  ]);
  return (
    <AdminDashboard data={data} settings={settings} content={content} persistent={supabaseEnabled} />
  );
}
