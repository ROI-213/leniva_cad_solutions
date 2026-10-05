const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'AresKudoPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// -------------------------------------------------------
// 1. Replace the section header + currency/billing controls
// -------------------------------------------------------
const oldHeader = `          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Transparent Licensing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Flexible Cloud CAD Plans for Individuals & Teams
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              No hidden fees. Full native DWG compatibility. Choose standalone named licenses or floating shared pools.
            </p>

            {/* Currency & Billing Controls */}
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={\`px-3 py-1.5 rounded-lg transition-all \${
                    billingCycle === 'annual' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                  }\`}
                >
                  Annual Billing (Save 30%)
                </button>
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={\`px-3 py-1.5 rounded-lg transition-all \${
                    billingCycle === 'monthly' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                  }\`}
                >
                  Monthly
                </button>
              </div>

              <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setPricingCurrency('EUR')}
                  className={\`px-2.5 py-1 rounded-lg transition-all \${
                    pricingCurrency === 'EUR' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                  }\`}
                >
                  € EUR
                </button>
                <button
                  onClick={() => setPricingCurrency('INR')}
                  className={\`px-2.5 py-1 rounded-lg transition-all \${
                    pricingCurrency === 'INR' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                  }\`}
                >
                  ₹ INR
                </button>
              </div>
            </div>
          </div>`;

const newHeader = `          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Licensing Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Cloud CAD Plans for Individuals &amp; Teams
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Full native DWG compatibility. Choose the plan that fits your workflow — contact us for a personalised quote.
            </p>
          </div>`;

if (content.includes(oldHeader)) {
  content = content.replace(oldHeader, newHeader);
  console.log('✅ Header replaced');
} else {
  console.log('❌ Header not found — trying normalised match');
  // normalise CRLF → LF then try
  const norm = content.replace(/\r\n/g, '\n');
  if (norm.includes(oldHeader)) {
    const replaced = norm.replace(oldHeader, newHeader);
    content = replaced;
    console.log('✅ Header replaced (after CRLF normalise)');
  } else {
    console.log('❌ Header still not found');
  }
}

// -------------------------------------------------------
// 2. Replace price display block + map prelude with "Request Quote" badge
// -------------------------------------------------------
const oldPriceBlock = `          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {data.pricingPlans.map(plan => {
              const isEur = pricingCurrency === 'EUR'
              const priceObj = isEur ? plan.priceEur : plan.priceInr
              const symbol = isEur ? '€' : '₹'

              let displayPrice = ''
              let billingSuffix = ''

              if (priceObj.free) {
                displayPrice = \`\${symbol}0\`
                billingSuffix = '/forever'
              } else if (priceObj.custom) {
                displayPrice = 'Custom'
                billingSuffix = 'Quote'
              } else if (billingCycle === 'annual') {
                displayPrice = \`\${symbol}\${priceObj.annual?.toLocaleString()}\`
                billingSuffix = '/user/year'
              } else {
                displayPrice = \`\${symbol}\${(priceObj.monthly || Math.round((priceObj.annual || 0) / 10)).toLocaleString()}\`
                billingSuffix = '/user/month'
              }

              return (`;

const newPriceBlock = `          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {data.pricingPlans.map(plan => {
              return (`;

if (content.includes(oldPriceBlock)) {
  content = content.replace(oldPriceBlock, newPriceBlock);
  console.log('✅ Price map prelude replaced');
} else {
  console.log('❌ Price map prelude not found');
}

// -------------------------------------------------------
// 3. Replace the price display JSX inside the card
// -------------------------------------------------------
const oldPriceDisplay = `                    <div className="py-2 border-y border-slate-100">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-black text-slate-950">{displayPrice}</span>
                        <span className="text-xs text-slate-500 font-medium">{billingSuffix}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{plan.billingNote}</span>
                    </div>`;

const newPriceDisplay = `                    <div className="py-2 border-y border-slate-100">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
                        Price on Request
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1.5">Contact us for a personalised quote</span>
                    </div>`;

if (content.includes(oldPriceDisplay)) {
  content = content.replace(oldPriceDisplay, newPriceDisplay);
  console.log('✅ Price display JSX replaced');
} else {
  console.log('❌ Price display JSX not found');
}

// -------------------------------------------------------
// 4. Replace CTA button to always say "Request Quote"
// -------------------------------------------------------
const oldCta = `                  <div className="pt-6">
                    <button
                      onClick={() => {
                        if (plan.ctaAction === 'trial') {
                          openQuoteModal(\`ARES Kudo Free Trial: \${plan.name}\`)
                        } else {
                          scrollTo('consultation')
                        }
                      }}
                      className={\`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer \${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }\`}
                    >
                      {plan.ctaText}
                    </button>
                  </div>`;

const newCta = `                  <div className="pt-6">
                    <button
                      onClick={() => scrollTo('consultation')}
                      className={\`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer \${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }\`}
                    >
                      Request Quote
                    </button>
                  </div>`;

if (content.includes(oldCta)) {
  content = content.replace(oldCta, newCta);
  console.log('✅ CTA button replaced');
} else {
  console.log('❌ CTA button not found');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ File saved');
