"use server";

import { site } from "@/lib/site";
import en from "@/i18n/dictionaries/en";
import ar from "@/i18n/dictionaries/ar";
import { fmt } from "@/i18n/format";

export type EnquiryState = {
  status: "idle" | "sent" | "error" | "fallback";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  values?: Record<string, string>;
};

const clean = (v: FormDataEntryValue | null, max = 2000) => String(v ?? "").trim().slice(0, max);

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (clean(formData.get("website"))) return { status: "sent" };

  const t = (clean(formData.get("lang"), 4) === "ar" ? ar : en).form;

  const values = {
    name: clean(formData.get("name"), 120),
    email: clean(formData.get("email"), 200),
    phone: clean(formData.get("phone"), 40),
    company: clean(formData.get("company"), 160),
    subject: clean(formData.get("subject"), 200),
    message: clean(formData.get("message"), 5000),
    items: clean(formData.get("items"), 3000),
  };

  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = t.errors.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = t.errors.email;
  if (values.phone && !/^[+()\d\s-]{6,}$/.test(values.phone)) errors.phone = t.errors.phone;
  // A filled quote list already says what the visitor wants, so the free-text minimum is relaxed.
  if (values.message.length < 10 && !values.items) errors.message = t.errors.message;
  if (Object.keys(errors).length) return { status: "error", errors, values, message: t.errors.summary };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // No mail provider configured: let the browser hand the enquiry to the visitor's email app instead.
  if (!apiKey || !from) return { status: "fallback", values };

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "-"}`,
    `Company: ${values.company || "-"}`,
    `Subject: ${values.subject || "-"}`,
    ...(values.items ? ["", "Quote list:", ...values.items.split("\n").map((i) => `- ${i}`)] : []),
    "",
    values.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Website enquiry: ${values.subject || values.name}`,
        text,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Mail provider responded ${res.status}`);
    return { status: "sent" };
  } catch (err) {
    console.error("Enquiry send failed", err);
    return { status: "error", values, message: fmt(t.errors.send, { email: site.email, phone: site.phone }) };
  }
}
