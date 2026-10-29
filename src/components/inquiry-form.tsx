"use client";
import { useI18n } from "@/components/locale-provider";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
type Values = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;
const initial: Values = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
};
export function InquiryForm() {
  const { t } = useI18n();

  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  function update(key: keyof Values, value: string | boolean) {
    setValues((old) => ({ ...old, [key]: value }));
    setErrors((old) => ({ ...old, [key]: undefined }));
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2)
      next.name = "Please enter your full name (at least 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.company.trim())
      next.company = "Please enter your company name.";
    if (!values.service) next.service = "Please select an area of interest.";
    if (values.message.trim().length < 20)
      next.message = "Please tell us a little more (at least 20 characters).";
    if (!values.consent)
      next.consent = "Please acknowledge that this is a demo form.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    setDone(true);
    requestAnimationFrame(() => confirmation.current?.focus());
  }
  const error = (key: keyof Values) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {t(errors[key]!)}
      </span>
    ) : null;
  const props = (key: keyof Values) => ({
    id: key,
    name: key,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });
  if (done)
    return (
      <div className="form-success" ref={confirmation} tabIndex={-1}>
        <CheckCircle2 size={42} strokeWidth={1.3} />
        <p className="eyebrow">{t("DEMO COMPLETE")}</p>
        <h2>
          {t("A great conversation")}
          <br />
          {t("starts with")} <em>{t("clarity.")}</em>
        </h2>
        <p>
          {t(
            "Your sample inquiry passed validation. This is a portfolio demonstration: nothing has been sent or stored on a server.",
          )}
        </p>
        <button
          className="button button-dark"
          onClick={() => {
            setDone(false);
            setValues(initial);
            requestAnimationFrame(() =>
              document.getElementById("name")?.focus(),
            );
          }}
        >
          {t("Try another inquiry")}
          <ArrowUpRight size={17} />
        </button>
      </div>
    );
  return (
    <form className="inquiry-form" ref={form} noValidate onSubmit={submit}>
      <div className="form-heading">
        <h2>{t("Tell us what’s next.")}</h2>
        <p>{t("Fields marked with * are required.")}</p>
      </div>
      <div className="form-row">
        <label htmlFor="name">
          {t("Full name *")}
          <input
            {...props("name")}
            autoComplete="name"
            required
            maxLength={100}
            placeholder={t("Alex Morgan")}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
          />
          {error("name")}
        </label>
        <label htmlFor="email">
          {t("Work email *")}
          <input
            {...props("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder={t("alex@company.com")}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {error("email")}
        </label>
      </div>
      <label htmlFor="company">
        {t("Company *")}
        <input
          {...props("company")}
          autoComplete="organization"
          required
          maxLength={160}
          placeholder={t("Your company name")}
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
        />
        {error("company")}
      </label>
      <div className="form-row">
        <label htmlFor="service">
          {t("How can we help? *")}
          <select
            {...props("service")}
            required
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">{t("Select an area")}</option>
            <option value="Strategy & growth">{t("Strategy & growth")}</option>
            <option value="Business transformation">
              {t("Business transformation")}
            </option>
            <option value="Digital & innovation">
              {t("Digital & innovation")}
            </option>
            <option value="Let’s figure it out together">
              {t("Let’s figure it out together")}
            </option>
          </select>
          {error("service")}
        </label>
        <label htmlFor="budget">
          {t("Indicative budget")}
          <select
            {...props("budget")}
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">{t("Select a range (optional)")}</option>
            <option>€10,000–€25,000</option>
            <option>€25,000–€50,000</option>
            <option>€50,000–€100,000</option>
            <option>€100,000+</option>
            <option value="To be discussed">{t("To be discussed")}</option>
          </select>
        </label>
      </div>
      <label htmlFor="message">
        {t("A little about your challenge *")}
        <textarea
          {...props("message")}
          rows={5}
          required
          minLength={20}
          maxLength={3000}
          placeholder={t("Where are you now, and where would you like to be?")}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
        {error("message")}
        <span className="character-count">{values.message.length}/3,000</span>
      </label>
      <label className="checkbox-label" htmlFor="consent">
        <input
          {...props("consent")}
          type="checkbox"
          required
          checked={values.consent}
          onChange={(e) => update("consent", e.target.checked)}
        />
        <span>
          {t(
            "I understand this is a portfolio demo. My inquiry will not be sent or saved on a server. *",
          )}
        </span>
      </label>
      {error("consent")}
      <div className="form-submit">
        <button type="submit" className="button button-dark">
          {t("Submit demo inquiry")}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <span>
          <Check size={14} aria-hidden="true" />
          {t("No data leaves this page")}
        </span>
      </div>
      <p className="micro">
        {t(
          "Please use sample details. Aurel Advisory is a fictional business.",
        )}
      </p>
    </form>
  );
}
