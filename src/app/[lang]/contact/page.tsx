import PageHero from "@/components/PageHero";
import EnquirySection from "@/components/EnquirySection";
import { pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/contact/", {
    title: dict.contactPage.title,
    description: fmt(dict.contactPage.metaDescription, { phone: site.phone, email: site.email }),
  });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = await resolveLang(params);
  const { dict, h, home } = pageKit(lang);
  const t = dict.contactPage;

  return (
    <>
      <PageHero title={t.title} home={home} crumbs={[{ label: t.title, href: h("/contact/") }]} intro={t.intro} />
      <EnquirySection lang={lang} dict={dict} lead={t.details} intro={t.intro} showAddress />
    </>
  );
}
