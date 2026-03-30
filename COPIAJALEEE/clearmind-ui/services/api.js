// ─────────────────────────────────────────────
// ClearMind Logic — Service Layer
// Structural integration mode (simulation active)
// DO NOT connect real endpoints here.
// ─────────────────────────────────────────────

const API_BASE_URL = ''; // Set when backend is available

// ── PART 1: Payload Builder ─────────────────────────────────────

/**
 * Reads all fields from the analysis form and returns
 * the exact validated payload structure expected by the backend.
 * @returns {Object} Structured validation payload
 */
export function buildValidationPayload() {
  // Helper: collect dynamic list values by input name
  function collectList(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]`))
      .map(el => el.value.trim())
      .filter(Boolean);
  }

  const decision  = (document.getElementById('decision')?.value  || '').trim();
  const context   = (document.getElementById('context')?.value   || '').trim();
  const income    = document.getElementById('income')?.value    || '';
  const expenses  = document.getElementById('expenses')?.value  || '';
  const savings   = document.getElementById('savings')?.value   || '';
  const capital   = document.getElementById('capital')?.value   || '';
  const financing = (document.getElementById('financing')?.value || '').trim();
  const risk      = document.getElementById('risk')?.value      || '';
  const horizon   = document.getElementById('horizon')?.value   || '';

  const constraints = collectList('constraint[]');
  const assumptions = collectList('assumption[]');

  return {
    analysisType: 'standard',
    input: {
      decision,
      context,
      data: {
        income:    income   !== '' ? Number(income)   : '',
        expenses:  expenses !== '' ? Number(expenses) : '',
        savings:   savings  !== '' ? Number(savings)  : '',
        amount:    capital  !== '' ? Number(capital)  : '',
        financing
      },
      constraints,
      risk_profile:      risk,    // "low" | "medium" | "high"
      decision_horizon:  horizon,
      assumptions
    }
  };
}

// ── PART 2: Simulation Layer ────────────────────────────────────

/**
 * Returns a mock backend response.
 * Structure mirrors the real API contract exactly.
 * Replace this function body with fetch() when backend is live.
 * @returns {Object} Simulated validation response
 */
export function simulateValidationResponse() {
  return {
    success: true,
    analysisId: 'CM-2026-000001',
    output: {
      'Executive Insight':        'Structured acquisition identified. Capital commitment analyzed against declared financial context and active constraints.',
      'Strategic Evaluation':     'Financial posture evaluated. Allocation represents high-utilization with minimal systemic buffer over the declared horizon.',
      'Risks and Exposures':      'Liquidity pressure detected. Risk of threshold breach within projected period under standard stress conditions.',
      'Determining Trade-offs':   'Opportunity cost registered. Proceeding requires partial suspension of declared risk-tolerance baseline.',
      'Final Determination':      'NOT AUTHORIZED',
      'Operational Implications': 'Execution not aligned with declared constraints. Redirect capital to liquid reserves until constraint conditions are satisfied.'
    }
  };
}

// ── PART 3: Real submission (future use) ────────────────────────

/**
 * Posts the payload to the real backend.
 * NOT called in simulation mode.
 * @param {Object} payload - Output of buildValidationPayload()
 * @param {string} token   - Auth token
 * @returns {Promise<Object>}
 */
export async function submitValidation(payload, token) {
  const response = await fetch(`${API_BASE_URL}/clearmind`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// ── PART 4: User status (future use) ───────────────────────────

export async function getUserStatus(token) {
  const response = await fetch(`${API_BASE_URL}/user/status`, {
    method:  'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
