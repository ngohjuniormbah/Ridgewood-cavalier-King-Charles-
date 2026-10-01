import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";
import { getSettings } from "@/lib/store";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Header settings={settings} />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <LeadPopup />
    </>
  );
}
