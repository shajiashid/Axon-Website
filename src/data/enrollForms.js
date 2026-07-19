// Config for the enrollment forms. The EnrollForm page renders these.
// field.type: text | email | tel | date | select | radio | checkbox | textarea | file | consent
// field.full forces a full-width cell (defaults: textarea/checkbox/file/consent are full).

const YES_NO = ['Yes', 'No']

export const FORMS = {
  ahpra: {
    slug: 'ahpra',
    title: 'AHPRA Application',
    subtitle:
      'For registration with the Australian Health Practitioner Regulation Agency. Please enter all details exactly as they appear in your passport.',
    submitLabel: 'Submit application',
    emails: ['ahpraapplication@gmail.com', 'info@axoncareers.co.nz'],
    sections: [
      {
        heading: 'General',
        fields: [
          {
            name: 'profession',
            label: 'Profession',
            type: 'select',
            required: true,
            options: [
              'Registered Nurse',
              'Enrolled Nurse',
              'Midwife',
              'Registered Nurse & Midwife',
            ],
          },
          {
            name: 'holdsNzRegistration',
            label:
              'Do you currently hold a registration as a nurse/midwife in New Zealand?',
            type: 'radio',
            required: true,
            options: YES_NO,
            full: true,
          },
          {
            name: 'currentApc',
            label: 'Do you hold a current Annual Practising Certificate?',
            type: 'radio',
            required: true,
            options: YES_NO,
            full: true,
          },
        ],
      },
      {
        heading: 'Your details (same as in passport)',
        fields: [
          {
            name: 'title',
            label: 'Title',
            type: 'select',
            required: true,
            options: ['Mr.', 'Ms.', 'Mrs.', 'Miss'],
          },
          { name: 'firstName', label: 'First name', type: 'text', required: true },
          { name: 'middleName', label: 'Middle name', type: 'text' },
          { name: 'lastName', label: 'Last name', type: 'text', required: true },
          { name: 'dob', label: 'Date of birth', type: 'date', required: true },
          {
            name: 'sex',
            label: 'Sex',
            type: 'radio',
            required: true,
            options: ['Male', 'Female'],
          },
          { name: 'countryOfBirth', label: 'Country of birth', type: 'text', required: true },
          { name: 'cityOfBirth', label: 'Place / City of birth', type: 'text', required: true },
          { name: 'languages', label: 'Languages known', type: 'text', required: true },
          { name: 'mobile', label: 'Mobile number', type: 'tel', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
        ],
      },
      {
        heading: 'Address details',
        fields: [
          { name: 'residentialAddress', label: 'Residential address', type: 'textarea', required: true },
          {
            name: 'practiceAddress',
            label: 'Principal place of practice address',
            type: 'textarea',
            required: true,
          },
          { name: 'mailingAddress', label: 'Mailing address', type: 'textarea', required: true },
        ],
      },
      {
        heading: 'Passport details',
        fields: [
          { name: 'passportNumber', label: 'Passport number', type: 'text', required: true },
          { name: 'passportExpiry', label: 'Expiry date', type: 'date', required: true },
          { name: 'issuingCountry', label: 'Issuing country', type: 'text', required: true },
        ],
      },
      {
        heading: 'Professional qualification',
        fields: [
          { name: 'qualificationName', label: 'Name of the qualification', type: 'text', required: true },
          { name: 'qualStart', label: 'Start date (as in transcript)', type: 'date', required: true },
          { name: 'qualCompletion', label: 'Completion date', type: 'date', required: true },
          {
            name: 'qualCountry',
            label: 'Country where qualification was received',
            type: 'text',
            required: true,
          },
          {
            name: 'institution',
            label: 'Name of the institution (University / College)',
            type: 'text',
            required: true,
            full: true,
          },
        ],
      },
      {
        heading: 'NCNZ registration details',
        fields: [
          {
            name: 'ncnzNumber',
            label: 'Nursing Council of New Zealand registration number',
            type: 'text',
            required: true,
            full: true,
          },
          {
            name: 'document',
            label: 'Upload document',
            type: 'file',
            required: true,
            note: 'Attested copy of your passport with the required declaration statement.',
          },
        ],
      },
      {
        heading: 'Declaration',
        fields: [
          {
            name: 'consent',
            label:
              'I hereby declare that the information provided is true and accurate to the best of my knowledge.',
            type: 'consent',
            required: true,
          },
        ],
      },
    ],
  },

  osce: {
    slug: 'osce',
    title: 'OSCE Training Enrolment',
    subtitle:
      'Ready to begin your OSCE journey? Share your details and our team will build your training and logistics plan.',
    submitLabel: 'Submit enrolment',
    emails: ['osceapplication@gmail.com', 'info@axoncareers.co.nz'],
    sections: [
      {
        heading: 'Personal information',
        fields: [
          { name: 'name', label: 'Full name', type: 'text', required: true },
          { name: 'dob', label: 'Date of birth', type: 'date', required: true },
          {
            name: 'gender',
            label: 'Gender',
            type: 'radio',
            required: true,
            options: ['Female', 'Male'],
          },
          { name: 'nationality', label: 'Nationality', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          {
            name: 'arrivalDate',
            label: 'Arrival date in Christchurch',
            type: 'date',
            required: true,
          },
          { name: 'address', label: 'Current address', type: 'textarea' },
          { name: 'phone', label: 'Phone number', type: 'tel' },
        ],
      },
      {
        heading: 'Professional information',
        fields: [
          { name: 'qualification', label: 'Nursing qualification', type: 'text', required: true },
          {
            name: 'experience',
            label: 'Years of experience',
            type: 'select',
            required: true,
            options: ['Less than 1 year', '1–2 years', '3–5 years', '5–10 years', '10+ years'],
          },
          { name: 'employer', label: 'Current employer', type: 'text', required: true },
          { name: 'countryOfPractice', label: 'Country of practice', type: 'text', required: true },
          { name: 'specialization', label: 'Specialization', type: 'text', required: true },
          { name: 'ncnzAppNo', label: 'NCNZ application number', type: 'text', required: true },
          { name: 'examDate', label: 'Date of exam', type: 'date', required: true },
          { name: 'opcFrom', label: 'Date of OPC by NCNZ — From', type: 'date', required: true },
          { name: 'opcTo', label: 'Date of OPC by NCNZ — To', type: 'date', required: true },
        ],
      },
      {
        heading: 'Course details',
        fields: [
          { name: 'batchStart', label: 'Online batch starting date', type: 'date' },
          {
            name: 'trainingMode',
            label: 'Mode of training',
            type: 'radio',
            required: true,
            options: ['Online', 'Exam-based offline training in Christchurch', 'Both'],
            full: true,
          },
          {
            name: 'supportServices',
            label: 'Support services',
            type: 'checkbox',
            options: [
              'AHPRA Processing',
              'CGFNS Processing',
              'ANMAC Assistance',
              'PR Visa Assistance',
            ],
          },
        ],
      },
      {
        heading: 'Accommodation & logistics',
        fields: [
          { name: 'airportPickup', label: 'Airport pickup', type: 'radio', required: true, options: YES_NO },
          {
            name: 'furnishedAccommodation',
            label: 'Furnished accommodation',
            type: 'radio',
            required: true,
            options: YES_NO,
          },
          {
            name: 'transport',
            label: 'Transportation to exam venue',
            type: 'radio',
            required: true,
            options: YES_NO,
          },
          { name: 'food', label: 'Food', type: 'radio', required: true, options: YES_NO },
          { name: 'stayFrom', label: 'Length of stay — From', type: 'date', required: true },
          { name: 'stayTo', label: 'Length of stay — To', type: 'date', required: true },
          { name: 'photo', label: 'Upload your photo', type: 'file', required: true },
        ],
      },
      {
        heading: 'Declaration',
        fields: [
          {
            name: 'consent',
            label:
              'I hereby declare that the information provided is true and accurate to the best of my knowledge.',
            type: 'consent',
            required: true,
          },
        ],
      },
    ],
  },

  iqn: {
    slug: 'iqn',
    title: 'IQN Application',
    subtitle:
      'Thank you for choosing Axon Careers as your partner on the path to New Zealand nursing registration.',
    submitLabel: 'Submit application',
    emails: ['iqnapplication@gmail.com', 'info@axoncareers.co.nz'],
    sections: [
      {
        heading: 'Personal information',
        fields: [
          {
            name: 'fullName',
            label: 'Full name (as per official documents)',
            type: 'text',
            required: true,
            full: true,
          },
          {
            name: 'gender',
            label: 'Gender',
            type: 'radio',
            required: true,
            options: ['Male', 'Female'],
          },
          { name: 'phone', label: 'Phone number', type: 'tel', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
        ],
      },
      {
        heading: 'Exam information',
        fields: [
          { name: 'examDate', label: 'Scheduled IQN exam date', type: 'date', required: true },
          {
            name: 'booked',
            label: 'Whether booked or not',
            type: 'radio',
            required: true,
            options: YES_NO,
          },
          {
            name: 'attempts',
            label: 'Number of attempts',
            type: 'radio',
            required: true,
            options: ['First Attempt', 'Second Attempt', 'Third Attempt'],
            full: true,
          },
        ],
      },
      {
        heading: 'Training program details',
        fields: [
          { name: 'batchStart', label: 'Preferred batch start date', type: 'date', required: true },
        ],
      },
      {
        heading: 'Additional services',
        fields: [
          {
            name: 'services',
            label: 'Would you like assistance with any services?',
            type: 'checkbox',
            options: [
              'NCNZ Registration Support',
              'OSCE Exam Preparation',
              'AHPRA Processing',
              'ANMAC Assistance',
              'Accommodation Services',
            ],
          },
          { name: 'other', label: 'Other', type: 'textarea' },
        ],
      },
      {
        heading: 'Upload document',
        fields: [
          {
            name: 'photo',
            label: 'Upload recent passport-size photograph',
            type: 'file',
            note: 'JPEG or PNG.',
          },
        ],
      },
      {
        heading: 'Declaration',
        fields: [
          {
            name: 'consent',
            label:
              'I confirm that the information provided above is accurate and complete.',
            type: 'consent',
            required: true,
          },
        ],
      },
    ],
  },
}

// Order used for the nav dropdown and the in-page form tabs.
// Each form lives at a clean path that mirrors the official site
// (e.g. axoncareers.co.nz/ahpra-application/). On submit the form
// emails the entered details to the addresses in each FORMS[].emails.
export const ENROLL_LINKS = [
  { label: 'AHPRA Application', to: '/ahpra-application', type: 'ahpra' },
  { label: 'OSCE Application', to: '/osce-application', type: 'osce' },
  { label: 'IQN Application', to: '/iqn-application', type: 'iqn' },
]

export function getForm(type) {
  return FORMS[type]
}
