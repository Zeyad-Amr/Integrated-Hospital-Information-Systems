const departmentsData = [
    { name: 'Triage A' },
    { name: 'Triage B' },
    { name: 'Resuscitation' },
    { name: 'Cardiology' },
    { name: 'Neurology' },
    { name: 'Orthopedic Emergency' },
    { name: 'Poly-Trauma' },
    { name: 'Short Stay A' },
    { name: 'Short Stay B' },
    { name: 'Short Stay C' },
    { name: 'Minor Procedures' },
    { name: 'ENT' },
    { name: 'Ophthalmology' },
    { name: 'ER Area' },
    { name: 'Administration' },
]

const genderData = [
    { value: "ذكر" },
    { value: "أنثى" },
]

const identityTypes = [
    { value: "بطاقة الهوية الوطنية" },
    { value: "جواز السفر" },
]

const roleTypes = [
    { value: "مدير" },
    { value: "موظف" },
    { value: "طبيب" },
    { value: "تمريض" },
]

const KinshipTypes = [
    { value: "اب" },
    { value: "ام" },
    { value: "اخ/ت" },
    { value: "عم/ة" },
    { value: "خال/ة" },
    { value: "اخرى" },
]

const shiftTypes = [
    { value: "صباحي 8 ساعات" },
    { value: "مسائي 8 ساعات" },
    { value: "سهر 8 ساعات" },
    { value: "صباحي 12 ساعة" },
    { value: "سهر 12 ساعة" },
    { value: "يوم كامل" },
]

const cameFromOptionsType = [
    { value: "منزل" },
    { value: "حادث" },
    { value: "سجن" },
]

const attendantRoles = [
    { value: "مسعف" },
    { value: "شرطة" },
]

const triageTypes = [
    { value: "Standard" },
    { value: "Immediate" },
    { value: "Critical" },
    { value: "Urgent" },
]

const LOCs = [
    { value: "Alert" },
    { value: "Verbal Responsive" },
    { value: "Pain Responsive" },
    { value: "Unresponsive" },
]

const comorbidities = [
    { value: "Hypertension" },
    { value: "Diabetes" },
    { value: "Cardiovascular Disease" },
    { value: "Obesity" },
    { value: "Chronic Respiratory Condition" },
    { value: "Immunodeficiency Disorder" },
    { value: "Chronic Kidney Disease" },
    { value: "Liver Disease" },
    { value: "Cancer" },
    { value: "Autoimmune Disorder" },
    { value: "Neurological Disorder" },
    { value: "Gastrointestinal Disorder" },
    { value: "Endocrine Disorder" },
    { value: "Psychiatric Disorder" },
    { value: "Bone and Joint Disorder" },
    { value: "Infectious Disease" },
    { value: "Hematological Disorder" },
    { value: "Metabolic Syndrome" },
    { value: "Sleep Apnea" },
];


module.exports = {
    departmentsData,
    genderData,
    identityTypes,
    roleTypes,
    shiftTypes,
    cameFromOptionsType,
    LOCs,
    comorbidities,
    triageTypes,
    attendantRoles,
    KinshipTypes
}