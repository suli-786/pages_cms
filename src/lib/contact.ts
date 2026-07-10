export const SUPPORT_EMAIL = "counsel@verdict.law"
export const SUPPORT_EMAIL_HREF = `mailto:${SUPPORT_EMAIL}`

export type Office = {
  city: string
  region: string
  mapSrc: string
  address: { line1: string; line2: string }
  phone: { display: string; href: string }
  email: string
}

export const OFFICES: Office[] = [
  {
    city: "New York",
    region: "United States",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-74.0207%2C40.7010%2C-74.0007%2C40.7170&layer=mapnik&marker=40.7090%2C-74.0107",
    address: { line1: "One Liberty Plaza", line2: "New York, NY 10006" },
    phone: { display: "+1 (212) 555-0142", href: "tel:+12125550142" },
    email: "newyork@verdict.law",
  },
  {
    city: "Washington, D.C.",
    region: "United States",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-77.0499%2C38.8938%2C-77.0299%2C38.9098&layer=mapnik&marker=38.9018%2C-77.0399",
    address: { line1: "900 17th Street NW", line2: "Washington, D.C. 20006" },
    phone: { display: "+1 (202) 555-0188", href: "tel:+12025550188" },
    email: "dc@verdict.law",
  },
  {
    city: "London",
    region: "England & Wales",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-0.0903%2C51.5064%2C-0.0703%2C51.5224&layer=mapnik&marker=51.5144%2C-0.0803",
    address: { line1: "30 St Mary Axe", line2: "London EC3A 8BF" },
    phone: { display: "+44 20 7946 0500", href: "tel:+442079460500" },
    email: "london@verdict.law",
  },
]

export const PRIMARY_OFFICE = OFFICES[0]
