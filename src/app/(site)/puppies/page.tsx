import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function PuppiesRedirect({
  searchParams,
}: {
  searchParams?: { breed?: string };
}) {
  const isCavapoo = (searchParams?.breed || "").toLowerCase().includes("cavapoo");
  const destination = isCavapoo ? "/puppies/cavapoos" : "/puppies/cavaliers";

  redirect(destination);
}
