/**
 * Seed script — run with: npm run seed
 * Requires XAMPP MySQL running and homeland_jobs database created (see sql/schema.sql)
 */

// Load .env.local for local dev (tsx handles top-level await)
import { config } from 'dotenv'
config({ path: '.env.local' })
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

const db = await mysql.createConnection({
  host:     process.env.DB_HOST     ?? 'localhost',
  port:     Number(process.env.DB_PORT ?? 3306),
  user:     process.env.DB_USER     ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME     ?? 'homeland_jobs',
})

async function run(sql: string, params: unknown[] = []) {
  await db.execute(sql, params)
}

console.log('🌱 Seeding database...')

// ── Clear existing data (order matters due to FKs) ──────────────────────────
await run('DELETE FROM proposals')
await run('DELETE FROM jobs')
await run('DELETE FROM testimonials')
await run('DELETE FROM users')

// ── Users ────────────────────────────────────────────────────────────────────
const adminId      = crypto.randomUUID()
const clientId     = crypto.randomUUID()
const client2Id    = crypto.randomUUID()
const freelancer1  = crypto.randomUUID()
const freelancer2  = crypto.randomUUID()
const freelancer3  = crypto.randomUUID()

const adminHash = await bcrypt.hash('Admin@1234', 12)
const pass      = await bcrypt.hash('Password1!', 12)

await run(
  'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
  [adminId, 'Evans Osumba', 'admin@homelandjobs.com', adminHash, 'admin'],
)
await run(
  'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
  [clientId, 'Sarah Kimani', 'sarah@technairobi.co.ke', pass, 'client'],
)
await run(
  'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
  [client2Id, 'James Mwangi', 'james@buildhub.co.ke', pass, 'client'],
)
await run(
  'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
  [freelancer1, 'Amara Osei', 'amara@freelance.ke', pass, 'freelancer'],
)
await run(
  'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
  [freelancer2, 'Kofi Agyeman', 'kofi@devwork.gh', pass, 'freelancer'],
)
await run(
  'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
  [freelancer3, 'Fatima Hassan', 'fatima@techfreelance.ng', pass, 'freelancer'],
)

// ── Jobs (minimum 10) ─────────────────────────────────────────────────────────
const jobs = [
  { title: 'Build a React e-commerce storefront', description: 'We need a modern React-based storefront integrated with our existing REST API. Must support cart, checkout, and payment (Stripe). Mobile responsive.', budget: 1500, category: 'Web Development', client: clientId },
  { title: 'WordPress site migration to Next.js', description: 'Migrate an existing WordPress blog (200+ posts) to Next.js with MDX. Must retain all URLs, images, and SEO metadata.', budget: 900, category: 'Web Development', client: clientId },
  { title: 'Design a brand identity for a logistics startup', description: 'Create logo, color palette, typography, and a basic brand guide for a last-mile delivery company based in Nairobi.', budget: 600, category: 'Design', client: client2Id },
  { title: 'Develop a mobile app for food delivery (Flutter)', description: 'Cross-platform Flutter app with customer, rider, and restaurant panels. Real-time order tracking via Google Maps.', budget: 4000, category: 'Mobile Development', client: client2Id },
  { title: 'Write SEO articles on fintech in Africa', description: 'Need 10 x 1200-word articles covering topics like mobile money, digital lending, and crypto regulation in sub-Saharan Africa. Must be original and SEO optimised.', budget: 300, category: 'Content Writing', client: clientId },
  { title: 'Set up CI/CD pipeline on GitHub Actions', description: 'Configure GitHub Actions workflows for a Node.js API: lint, test, Docker build, and deploy to Railway on merge to main. Include staging and production environments.', budget: 500, category: 'DevOps', client: client2Id },
  { title: 'Create explainer videos for SaaS product (3 videos)', description: 'Produce three 90-second animated explainer videos showcasing our HR SaaS features. Script and voiceover provided.', budget: 1200, category: 'Video Production', client: clientId },
  { title: 'Build a Python data pipeline for sales analytics', description: 'ETL pipeline pulling data from Salesforce, transforming it, and loading into BigQuery. Daily scheduled runs. Use Airflow or Prefect.', budget: 2000, category: 'Data Engineering', client: client2Id },
  { title: 'Social media management — 3-month contract', description: 'Manage Instagram, X (Twitter), and LinkedIn for a fashion brand. 2 posts per day per platform, community engagement, monthly analytics report.', budget: 750, category: 'Marketing', client: clientId },
  { title: 'Implement JWT auth in an Express.js API', description: 'Add authentication and authorisation to an existing Express REST API: register, login, refresh token, role-based route guards. Include unit tests.', budget: 400, category: 'Backend Development', client: client2Id },
  { title: 'Translate app UI strings — English to Swahili & Yoruba', description: 'Translate approximately 1500 UI strings for a mobile fintech app from English into both Swahili and Yoruba. Maintain tone consistency.', budget: 250, category: 'Translation', client: clientId },
  { title: 'Audit and fix accessibility issues (WCAG 2.1 AA)', description: 'Audit our Next.js marketing site for WCAG 2.1 AA compliance and fix all identified issues. Deliver audit report plus pull requests.', budget: 700, category: 'Web Development', client: client2Id },
]

const jobIds: string[] = []
for (const j of jobs) {
  const id = crypto.randomUUID()
  jobIds.push(id)
  await run(
    'INSERT INTO jobs (id, title, description, budget, category, client_id) VALUES (?, ?, ?, ?, ?, ?)',
    [id, j.title, j.description, j.budget, j.category, j.client],
  )
}

// ── Proposals ─────────────────────────────────────────────────────────────────
await run(
  'INSERT INTO proposals (id, job_id, freelancer_id, cover_letter, proposed_amount, status) VALUES (?, ?, ?, ?, ?, ?)',
  [crypto.randomUUID(), jobIds[0], freelancer1, 'I have 5 years of React experience and have built 3 e-commerce storefronts. Happy to share portfolio.', 1400, 'pending'],
)
await run(
  'INSERT INTO proposals (id, job_id, freelancer_id, cover_letter, proposed_amount, status) VALUES (?, ?, ?, ?, ?, ?)',
  [crypto.randomUUID(), jobIds[0], freelancer2, 'Full-stack dev with Stripe and Next.js expertise. Can deliver in 3 weeks.', 1500, 'accepted'],
)
await run(
  'INSERT INTO proposals (id, job_id, freelancer_id, cover_letter, proposed_amount, status) VALUES (?, ?, ?, ?, ?, ?)',
  [crypto.randomUUID(), jobIds[3], freelancer3, 'Flutter dev with 4 published apps on both stores. Real-time maps is my specialty.', 3800, 'pending'],
)

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: 'Sarah Kimani', role: 'Tech Startup Founder, Nairobi', quote: 'Homeland Jobs connected me with an incredible Flutter developer within 48 hours. The quality of talent on this platform is unmatched in East Africa.', avatar_url: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Kofi Agyeman', role: 'Freelance Full-Stack Developer', quote: 'I landed three long-term contracts through Homeland Jobs in my first month. The platform actually understands the African freelance market.', avatar_url: 'https://i.pravatar.cc/150?img=12' },
  { name: 'James Mwangi', role: 'Operations Manager, BuildHub', quote: 'We scaled our product team entirely through Homeland Jobs. Reliable escrow and zero payment drama — that alone is worth everything.', avatar_url: 'https://i.pravatar.cc/150?img=33' },
  { name: 'Fatima Hassan', role: 'UI/UX Designer, Lagos', quote: 'Unlike global platforms that ignore African freelancers, Homeland Jobs values our skills and pays fairly. My income doubled in six months.', avatar_url: 'https://i.pravatar.cc/150?img=25' },
]

for (const t of testimonials) {
  await run(
    'INSERT INTO testimonials (id, name, role, quote, avatar_url) VALUES (?, ?, ?, ?, ?)',
    [crypto.randomUUID(), t.name, t.role, t.quote, t.avatar_url],
  )
}

await db.end()

console.log(`✅ Seeded:`)
console.log(`   ${jobs.length} jobs`)
console.log(`   6 users (1 admin, 2 clients, 3 freelancers)`)
console.log(`   3 proposals`)
console.log(`   ${testimonials.length} testimonials`)
console.log()
console.log('Admin login: admin@homelandjobs.com / Admin@1234')
console.log('Client login: sarah@technairobi.co.ke / Password1!')
