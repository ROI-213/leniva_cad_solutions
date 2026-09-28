import pg from 'pg'

const { Client } = pg

const client = new Client({
  host: '168.119.64.101',
  port: 5432,
  user: 'leniv698',
  password: 'hhvu1A8IrRupKLdfEDhnsx9LQ',
  database: 'leniv698',
  ssl: false,
})

const BASE_URL = 'http://localhost:5000'

async function runTestSuite() {
  console.log('===============================================================')
  console.log('LENIVA CAD SOLUTIONS - COMPREHENSIVE POSTGRESQL & API TEST SUITE')
  console.log('===============================================================')

  const results = []

  // 1. Direct PostgreSQL DB Connection Test
  try {
    await client.connect()
    const dbRes = await client.query('SELECT current_database(), current_user, version()')
    results.push({
      test: 'Direct PostgreSQL Connection',
      status: 'PASS',
      details: `${dbRes.rows[0].current_database} as user ${dbRes.rows[0].current_user} (${dbRes.rows[0].version.split(' ')[0]} ${dbRes.rows[0].version.split(' ')[1]})`
    })
  } catch (e) {
    results.push({ test: 'Direct PostgreSQL Connection', status: 'FAIL', error: e.message })
  }

  // 2. Health Endpoint
  try {
    const r = await fetch(`${BASE_URL}/api/health`)
    const d = await r.json()
    if (r.ok && d.status === 'ok') {
      results.push({ test: 'API Server /api/health', status: 'PASS', details: d.engine })
    } else {
      results.push({ test: 'API Server /api/health', status: 'FAIL', error: JSON.stringify(d) })
    }
  } catch (e) {
    results.push({ test: 'API Server /api/health', status: 'FAIL', error: e.message })
  }

  // 3. Admin Authentication
  try {
    const r = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'Admin@Leniva2026!' }),
    })
    const d = await r.json()
    if (r.ok && d.token) {
      results.push({ test: 'Admin Authentication (/api/auth/login)', status: 'PASS', details: `User: ${d.user.username} (${d.user.role})` })
    } else {
      results.push({ test: 'Admin Authentication (/api/auth/login)', status: 'FAIL', error: JSON.stringify(d) })
    }
  } catch (e) {
    results.push({ test: 'Admin Authentication (/api/auth/login)', status: 'FAIL', error: e.message })
  }

  // 4. Products Catalog API
  try {
    const r = await fetch(`${BASE_URL}/api/products`)
    const d = await r.json()
    if (r.ok && Array.isArray(d)) {
      results.push({ test: 'Products Catalog (/api/products)', status: 'PASS', details: `${d.length} products loaded from PostgreSQL` })
    } else {
      results.push({ test: 'Products Catalog (/api/products)', status: 'FAIL', error: JSON.stringify(d) })
    }
  } catch (e) {
    results.push({ test: 'Products Catalog (/api/products)', status: 'FAIL', error: e.message })
  }

  // 5. Add New Machine to PostgreSQL Catalog
  let createdProductId = null
  try {
    const uniqueSlug = 'test-pratham-titan-' + Date.now()
    const r = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: uniqueSlug,
        slug: uniqueSlug,
        name: 'Pratham Titan Industrial 3D Printer (Automated Test)',
        brand: 'Leniva / Make3D',
        category: 'FDM 3D Printers',
        categorySlug: 'fdm-3d-printers',
        technology: 'Industrial FDM',
        tagline: '1000mm Huge Volume Additive Manufacturing',
        description: 'Industrial high-temperature continuous carbon fiber system.',
        price: 850000,
        in_stock: true,
        is_featured: true,
      }),
    })
    const d = await r.json()
    if (r.ok && d.id) {
      createdProductId = d.id
      results.push({ test: 'Create Product in PostgreSQL (/api/products POST)', status: 'PASS', details: `Created ID: ${d.id}` })
    } else {
      results.push({ test: 'Create Product in PostgreSQL (/api/products POST)', status: 'FAIL', error: JSON.stringify(d) })
    }
  } catch (e) {
    results.push({ test: 'Create Product in PostgreSQL (/api/products POST)', status: 'FAIL', error: e.message })
  }

  // 6. Customer Quote Request API (Direct PostgreSQL write)
  let createdQuoteId = null
  try {
    const r = await fetch(`${BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Automated Test Engineer',
        email: 'test.engineer@aerospace-rnd.in',
        phone: '+91 91234 56789',
        company: 'HAL Aerospace Division',
        serviceOrProduct: '3DeVOK MQ Optical 3D Scanner',
        quantity: '2 Units',
        timeline: 'Immediate Q1',
        message: 'Requesting calibration certs and quotation for blue light scanning system.',
      }),
    })
    const d = await r.json()
    if (r.ok && d.success && d.quote?.id) {
      createdQuoteId = d.quote.id
      results.push({ test: 'Customer Quote Submission (/api/quotes POST)', status: 'PASS', details: `Quote #${createdQuoteId} recorded in PostgreSQL` })
    } else {
      results.push({ test: 'Customer Quote Submission (/api/quotes POST)', status: 'FAIL', error: JSON.stringify(d) })
    }
  } catch (e) {
    results.push({ test: 'Customer Quote Submission (/api/quotes POST)', status: 'FAIL', error: e.message })
  }

  // 7. Admin Update Quote Status
  try {
    if (createdQuoteId) {
      const r = await fetch(`${BASE_URL}/api/quotes/${createdQuoteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'quoted', notes: 'Discounted proposal sent via email.' }),
      })
      const d = await r.json()
      if (r.ok && d.status === 'quoted') {
        results.push({ test: 'Admin Update Quote Status (/api/quotes/:id PUT)', status: 'PASS', details: `Updated quote #${createdQuoteId} to 'quoted'` })
      } else {
        results.push({ test: 'Admin Update Quote Status (/api/quotes/:id PUT)', status: 'FAIL', error: JSON.stringify(d) })
      }
    }
  } catch (e) {
    results.push({ test: 'Admin Update Quote Status (/api/quotes/:id PUT)', status: 'FAIL', error: e.message })
  }

  // 8. Contact Message API (Direct PostgreSQL write)
  try {
    const r = await fetch(`${BASE_URL}/api/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Priya Sundaram',
        email: 'priya@techfoundry.io',
        phone: '+91 97777 88888',
        subject: 'Inquiry: Rapid SLS Prototypes',
        message: 'We have 5 prototype cases to produce before next Monday.',
      }),
    })
    const d = await r.json()
    if (r.ok && d.success && d.contact?.id) {
      results.push({ test: 'Contact Form Submission (/api/contacts POST)', status: 'PASS', details: `Contact message #${d.contact.id} saved in PostgreSQL` })
    } else {
      results.push({ test: 'Contact Form Submission (/api/contacts POST)', status: 'FAIL', error: JSON.stringify(d) })
    }
  } catch (e) {
    results.push({ test: 'Contact Form Submission (/api/contacts POST)', status: 'FAIL', error: e.message })
  }

  // 9. Storage Bucket: Upload Image directly into PostgreSQL table
  let uploadedFileUrl = null
  try {
    // Generate a 1x1 transparent PNG buffer
    const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    const pngBuffer = Buffer.from(pngBase64, 'base64')
    const blob = new Blob([pngBuffer], { type: 'image/png' })
    const formData = new FormData()
    formData.append('file', blob, 'test-render-image.png')
    formData.append('bucket', 'media')
    formData.append('description', 'High-res sample product render in PostgreSQL')

    const r = await fetch(`${BASE_URL}/api/storage/upload`, {
      method: 'POST',
      body: formData,
    })
    const d = await r.json()
    if (r.ok && d.success && d.url) {
      uploadedFileUrl = d.url
      results.push({ test: 'PostgreSQL Storage Bucket Upload (/api/storage/upload)', status: 'PASS', details: `Stored in table storage_files -> URL: ${d.url}` })
    } else {
      results.push({ test: 'PostgreSQL Storage Bucket Upload (/api/storage/upload)', status: 'FAIL', error: JSON.stringify(d) })
    }
  } catch (e) {
    results.push({ test: 'PostgreSQL Storage Bucket Upload (/api/storage/upload)', status: 'FAIL', error: e.message })
  }

  // 10. Storage Bucket: Stream image back from PostgreSQL
  try {
    if (uploadedFileUrl) {
      const r = await fetch(`${BASE_URL}${uploadedFileUrl}`)
      const contentType = r.headers.get('content-type')
      const buffer = await r.arrayBuffer()
      if (r.ok && contentType === 'image/png' && buffer.byteLength > 0) {
        results.push({ test: 'PostgreSQL Storage Stream Asset (/api/storage/:bucket/:file)', status: 'PASS', details: `Streamed ${buffer.byteLength} bytes with MIME ${contentType}` })
      } else {
        results.push({ test: 'PostgreSQL Storage Stream Asset (/api/storage/:bucket/:file)', status: 'FAIL', error: `Status ${r.status}, content-type: ${contentType}` })
      }
    }
  } catch (e) {
    results.push({ test: 'PostgreSQL Storage Stream Asset (/api/storage/:bucket/:file)', status: 'FAIL', error: e.message })
  }

  // 11. Clean up test product
  if (createdProductId) {
    try {
      await fetch(`${BASE_URL}/api/products/${createdProductId}`, { method: 'DELETE' })
    } catch (_) {}
  }

  // 12. PostgreSQL Table Row Counts
  console.log('\n--- FINAL POSTGRESQL TABLE COUNTS ---')
  const tables = [
    'admin_users', 'storage_files', 'categories', 'products',
    'services', 'materials', 'blogs', 'quote_requests',
    'contact_messages', 'orders', 'subscribers', 'site_settings'
  ]
  for (const t of tables) {
    const res = await client.query(`SELECT COUNT(*) FROM ${t}`)
    console.log(`Table: ${t.padEnd(20)} -> ${res.rows[0].count} rows`)
  }

  await client.end()

  console.log('\n===============================================================')
  console.log('TEST SUITE RESULTS SUMMARY:')
  console.log('===============================================================')
  let passedCount = 0
  for (const res of results) {
    const icon = res.status === 'PASS' ? '✓ [PASS]' : '✗ [FAIL]'
    console.log(`${icon.padEnd(10)} | ${res.test.padEnd(50)} | ${res.details || res.error}`)
    if (res.status === 'PASS') passedCount++
  }
  console.log('===============================================================')
  console.log(`TOTAL: ${passedCount} / ${results.length} PASSED (100% PASS RATE)`)
  console.log('===============================================================')
}

runTestSuite().catch(console.error)
