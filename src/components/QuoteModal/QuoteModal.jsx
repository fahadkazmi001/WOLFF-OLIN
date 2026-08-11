import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SERVICE_TYPES, commonFields, serviceFields } from "../../data/quoteFormFields";
import { submitQuote } from "./submitQuote";
import "./QuoteModal.css";

function emptyFormData() {
  return {};
}

function Field({ field, value, onChange }) {
  const { name, label, type, required, options } = field;

  if (type === "textarea") {
    return (
      <label className="quote-field">
        <span>
          {label}
          {required && <span className="quote-required">*</span>}
        </span>
        <textarea
          value={value || ""}
          required={required}
          onChange={(e) => onChange(name, e.target.value)}
          rows={3}
        />
      </label>
    );
  }

  if (type === "select") {
    return (
      <label className="quote-field">
        <span>
          {label}
          {required && <span className="quote-required">*</span>}
        </span>
        <select value={value || ""} required={required} onChange={(e) => onChange(name, e.target.value)}>
          <option value="" disabled>
            Choose an option
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (type === "checkboxGroup") {
    const selected = Array.isArray(value) ? value : [];
    const toggle = (option) => {
      const next = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      onChange(name, next);
    };

    return (
      <fieldset className="quote-field quote-field--checkbox-group">
        <legend>{label}</legend>
        <div className="quote-checkbox-grid">
          {options.map((option) => (
            <label key={option} className="quote-checkbox">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <label className="quote-field">
      <span>
        {label}
        {required && <span className="quote-required">*</span>}
      </span>
      <input
        type={type}
        value={value || ""}
        required={required}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </label>
  );
}

function QuoteModal({ open, onClose }) {
  const [step, setStep] = useState("select");
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("app:lenis-pause"));

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("app:lenis-resume"));
    };
  }, [open, onClose]);

  // Always start each step scrolled to the top, so the title is never
  // hidden above the fold when the modal opens or the step changes.
  useEffect(() => {
    if (open) panelRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [open, step]);

  if (!open) return null;

  const service = SERVICE_TYPES.find((item) => item.id === selectedService);
  const fields = selectedService ? [...commonFields, ...serviceFields[selectedService]] : [];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (id) => {
    setSelectedService(id);
    setFormData(emptyFormData());
    setStep("form");
  };

  const handleBack = () => {
    setStep("select");
    setSelectedService(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("select");
      setSelectedService(null);
      setFormData(emptyFormData());
      setError(null);
    }, 300);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitQuote({
        service: service?.label,
        serviceId: selectedService,
        ...formData,
      });
      setStep("success");
    } catch {
      setError("Something went wrong sending your request. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="quote-overlay"
      role="presentation"
      data-lenis-prevent
      onMouseDown={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="quote-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Get a free quote"
        ref={panelRef}
        data-lenis-prevent
      >
        <button type="button" className="quote-close" onClick={handleClose} aria-label="Close">
          &times;
        </button>

        {step === "select" && (
          <div className="quote-step">
            <h2 className="quote-title">Get a Free Quote</h2>
            <p className="quote-subtitle">What do you need help with?</p>

            <div className="quote-service-grid">
              {SERVICE_TYPES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="quote-service-card"
                  onClick={() => handleSelectService(item.id)}
                >
                  <span className="quote-service-label">{item.label}</span>
                  <span className="quote-service-blurb">{item.blurb}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "form" && (
          <form className="quote-step" onSubmit={handleSubmit}>
            <button type="button" className="quote-back" onClick={handleBack}>
              &larr; Back
            </button>
            <h2 className="quote-title">{service?.label}</h2>
            <p className="quote-subtitle">Tell us a bit more so we can put together an accurate quote.</p>

            <div className="quote-fields">
              {fields.map((field) => (
                <Field key={field.name} field={field} value={formData[field.name]} onChange={handleChange} />
              ))}
            </div>

            {error && <p className="quote-error">{error}</p>}

            <button type="submit" className="quote-submit" disabled={submitting}>
              {submitting ? "Sending..." : "Submit Request"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="quote-step quote-step--success">
            <h2 className="quote-title">Thank you!</h2>
            <p className="quote-subtitle">
              Your request has been sent. We&rsquo;ll be in touch shortly with a quote.
            </p>
            <button type="button" className="quote-submit" onClick={handleClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default QuoteModal;
