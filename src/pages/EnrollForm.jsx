import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getForm, ENROLL_LINKS } from '../data/enrollForms.js'
import { submitEnrollment } from '../lib/submitEnrollment.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TEL_RE = /^[+()\d\s-]{7,}$/

function initialValues(form) {
  const v = {}
  form.sections.forEach((s) =>
    s.fields.forEach((f) => {
      v[f.name] = f.type === 'checkbox' ? [] : f.type === 'consent' ? false : ''
    }),
  )
  return v
}

function isFull(f) {
  if (f.full) return true
  return ['textarea', 'checkbox', 'file', 'consent'].includes(f.type)
}

// Flatten answers into { "Field label": value } for the submission payload.
function buildPayload(form, values) {
  const data = {}
  form.sections.forEach((section) => {
    section.fields.forEach((f) => {
      const v = values[f.name]
      let display
      if (f.type === 'consent') display = v ? 'Yes' : 'No'
      else if (f.type === 'checkbox') display = v && v.length ? v.join(', ') : ''
      else display = String(v ?? '').trim()
      data[f.label] = display
    })
  })
  return {
    form: form.title,
    type: form.slug,
    submittedAt: new Date().toISOString(),
    data,
  }
}

export default function EnrollForm({ type: typeProp }) {
  const params = useParams()
  const type = typeProp || params.type
  const form = getForm(type)
  const topRef = useRef(null)

  const [values, setValues] = useState(() => (form ? initialValues(form) : {}))
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  // Reset when navigating between forms.
  useEffect(() => {
    if (form) {
      setValues(initialValues(form))
      setErrors({})
      setSent(false)
    }
  }, [type]) // eslint-disable-line react-hooks/exhaustive-deps

  const allFields = useMemo(
    () => (form ? form.sections.flatMap((s) => s.fields) : []),
    [form],
  )

  if (!form) {
    return (
      <main className="enroll enroll--missing">
        <div className="container">
          <h1 className="enroll__title">Form not found</h1>
          <p className="enroll__subtitle">
            Please choose an enrolment form from the menu.
          </p>
          <div className="enroll__tabs">
            {ENROLL_LINKS.map((l) => (
              <Link key={l.type} to={l.to} className="enroll__tab">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    )
  }

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const toggleCheckbox = (name, option) => {
    setValues((v) => {
      const arr = v[name] || []
      return {
        ...v,
        [name]: arr.includes(option)
          ? arr.filter((o) => o !== option)
          : [...arr, option],
      }
    })
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const validate = () => {
    const errs = {}
    allFields.forEach((f) => {
      const val = values[f.name]
      if (f.required) {
        if (f.type === 'checkbox' && (!val || val.length === 0)) {
          errs[f.name] = 'Please select at least one option'
        } else if (f.type === 'consent' && !val) {
          errs[f.name] = 'Please confirm to continue'
        } else if (
          (f.type === 'text' ||
            f.type === 'email' ||
            f.type === 'tel' ||
            f.type === 'date' ||
            f.type === 'select' ||
            f.type === 'textarea' ||
            f.type === 'radio' ||
            f.type === 'file') &&
          !String(val || '').trim()
        ) {
          errs[f.name] = 'This field is required'
        }
      }
      if (f.type === 'email' && val && !EMAIL_RE.test(val)) {
        errs[f.name] = 'Enter a valid email address'
      }
      if (f.type === 'tel' && val && !TEL_RE.test(val)) {
        errs[f.name] = 'Enter a valid phone number'
      }
    })
    return errs
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Focus the first field with an error.
      const first = allFields.find((f) => found[f.name])
      if (first) {
        const el = document.getElementById(`ef-${first.name}`)
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    const payload = buildPayload(form, values)
    // Show the confirmation right away; send in the background via Resend
    // (PHP endpoint). We don't block the UI on the network round-trip.
    setSent(true)
    setValues(initialValues(form))
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    submitEnrollment(payload).catch((err) => {
      console.error('Enrollment submission failed:', err)
    })
  }

  const renderField = (f) => {
    const id = `ef-${f.name}`
    const err = errors[f.name]
    const common = {
      id,
      name: f.name,
      'aria-invalid': !!err,
    }

    let control
    if (f.type === 'textarea') {
      control = (
        <textarea
          {...common}
          rows={3}
          value={values[f.name]}
          onChange={(e) => setField(f.name, e.target.value)}
          placeholder={f.placeholder}
        />
      )
    } else if (f.type === 'select') {
      control = (
        <select
          {...common}
          value={values[f.name]}
          onChange={(e) => setField(f.name, e.target.value)}
        >
          <option value="" disabled>
            Select…
          </option>
          {f.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )
    } else if (f.type === 'radio') {
      control = (
        <div className="ef-radio" role="radiogroup" aria-label={f.label}>
          {f.options.map((o) => (
            <label key={o} className={`ef-radio__opt ${values[f.name] === o ? 'is-on' : ''}`}>
              <input
                type="radio"
                name={f.name}
                value={o}
                checked={values[f.name] === o}
                onChange={() => setField(f.name, o)}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      )
    } else if (f.type === 'checkbox') {
      control = (
        <div className="ef-checks">
          {f.options.map((o) => (
            <label key={o} className={`ef-check ${values[f.name]?.includes(o) ? 'is-on' : ''}`}>
              <input
                type="checkbox"
                checked={values[f.name]?.includes(o) || false}
                onChange={() => toggleCheckbox(f.name, o)}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      )
    } else if (f.type === 'consent') {
      control = (
        <label className="ef-consent">
          <input
            type="checkbox"
            checked={values[f.name]}
            onChange={(e) => setField(f.name, e.target.checked)}
          />
          <span>{f.label}</span>
        </label>
      )
    } else if (f.type === 'file') {
      const fileName = values[f.name]
      control = (
        <label className={`ef-file ${fileName ? 'is-set' : ''}`}>
          <input
            id={id}
            type="file"
            onChange={(e) => setField(f.name, e.target.files?.[0]?.name || '')}
          />
          <span className="ef-file__btn">Choose file</span>
          <span className="ef-file__name">{fileName || 'No file selected'}</span>
        </label>
      )
    } else {
      control = (
        <input
          {...common}
          type={f.type}
          value={values[f.name]}
          onChange={(e) => setField(f.name, e.target.value)}
          placeholder={f.placeholder}
        />
      )
    }

    return (
      <div
        key={f.name}
        className={`ef-field ${isFull(f) ? 'ef-field--full' : ''}`}
      >
        {f.type !== 'consent' && (
          <label htmlFor={id} className="ef-label">
            {f.label}
            {f.required && <span className="ef-req"> *</span>}
          </label>
        )}
        {control}
        {f.note && <span className="ef-note">{f.note}</span>}
        {err && <span className="ef-error">{err}</span>}
      </div>
    )
  }

  return (
    <main className="enroll" ref={topRef}>
      <section className="container enroll__head">
        <span className="enroll__eyebrow">Enrolment Forms</span>
        <h1 className="enroll__title">{form.title}</h1>
        <p className="enroll__subtitle">{form.subtitle}</p>
        <div className="enroll__tabs">
          {ENROLL_LINKS.map((l) => (
            <Link
              key={l.type}
              to={l.to}
              className={`enroll__tab ${l.type === type ? 'is-active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="container enroll__body">
        {sent ? (
          <div className="enroll__success" role="status">
            <div className="enroll__success-mark">✓</div>
            <h2>Application submitted successfully</h2>
            <p>
              Thank you! We&apos;ve received your application and our team will
              reach out to you shortly.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setSent(false)}
            >
              Submit another application
            </button>
          </div>
        ) : (
          <form className="enroll__form" onSubmit={onSubmit} noValidate>
            {form.sections.map((section) => (
              <fieldset key={section.heading} className="enroll__section">
                <legend className="enroll__legend">{section.heading}</legend>
                <div className="enroll__grid">
                  {section.fields.map(renderField)}
                </div>
              </fieldset>
            ))}

            <div className="enroll__actions">
              <button type="submit" className="btn btn-primary enroll__submit">
                {form.submitLabel}
              </button>
              <p className="enroll__note">
                Fields marked <span className="ef-req">*</span> are required.
              </p>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
