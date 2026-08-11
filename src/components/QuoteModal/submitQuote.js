// Sends the quote request via EmailJS (https://www.emailjs.com) so it lands
// in an inbox without needing a custom backend. The destination inbox is
// configured inside the EmailJS template itself — never in this file — so
// it is never exposed to the customer's browser.
//
// Setup (one-time, in the EmailJS dashboard):
//   1. Create a free account and connect the Gmail inbox that should
//      receive requests.
//   2. Create an Email Service — copy its "Service ID".
//   3. Create an Email Template — copy its "Template ID". Use the field
//      names below ({{service}}, {{name}}, {{email}}, {{phone}},
//      {{company}}, {{details}}) in the template body.
//   4. Copy the account's "Public Key" from Account > API Keys.
//   5. Paste all three values below.
import { commonFields, serviceFields } from "../../data/quoteFormFields";

const EMAILJS_SERVICE_ID = "service_5ny1z0e";
const EMAILJS_TEMPLATE_ID = "template_rubyj0m";
const EMAILJS_PUBLIC_KEY = "KK4YobcllTDO4tfOb";

const FIELD_LABELS = Object.fromEntries(
  [...commonFields, ...Object.values(serviceFields).flat()].map((field) => [field.name, field.label])
);

export async function submitQuote(payload) {
  const { service, serviceId, name, email, phone, company, ...rest } = payload;

  const details = Object.entries(rest)
    .filter(([, value]) => value && (!Array.isArray(value) || value.length > 0))
    .map(([key, value]) => `${FIELD_LABELS[key] || key}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join("\n");

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error(
      "Quote form isn't wired up to an email service yet — set the EMAILJS_* values in submitQuote.js."
    );
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        service,
        service_id: serviceId,
        name,
        email,
        phone: phone || "-",
        company,
        details,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`EmailJS request failed: ${response.status}`);
  }
}
