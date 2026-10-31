const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 4050;
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PUBLIC_DIR = path.join(__dirname, 'public');

const RECHARGES_FILE = path.join(DATA_DIR, 'recharges.json');
const CAMPAIGNS_FILE = path.join(DATA_DIR, 'campaigns.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure directories exist
[DATA_DIR, UPLOADS_DIR, PUBLIC_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Initialize default settings including 3 Separate Login Accounts
const DEFAULT_SETTINGS = {
  companyName: 'IMMENSE AIR PVT LTD',
  companies: ['Immense Air', 'Immense Smart Solution', 'Zion'],
  services: ['SMS', 'RCS', 'WhatsApp', 'Virtual WhatsApp', 'OBD', 'IVR', 'SMPP'],
  accountManagers: [
    'Rahul Sharma',
    'Priya Verma',
    'Amit Patel',
    'Neha Gupta',
    'Vikram Singh'
  ],
  sources: ['WhatsApp Message', 'Email Approval', 'Client Portal', 'Verbal / Call'],
  users: [
    {
      id: 'usr_admin',
      username: 'admin',
      password: 'admin@123',
      role: 'admin',
      name: 'Super Admin',
      department: 'Management & Operations'
    },
    {
      id: 'usr_billing',
      username: 'billing',
      password: 'billing@123',
      role: 'accounts',
      name: 'Accounts & Billing Desk',
      department: 'Billing Department'
    },
    {
      id: 'usr_support',
      username: 'support',
      password: 'support@123',
      role: 'support',
      name: 'Support Recharge Desk',
      department: 'Client Support Team'
    }
  ]
};

if (!fs.existsSync(SETTINGS_FILE)) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf8');
} else {
  try {
    const existingSettings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    if (!Array.isArray(existingSettings.users) || existingSettings.users.length < 3) {
      existingSettings.users = DEFAULT_SETTINGS.users;
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(existingSettings, null, 2), 'utf8');
    }
  } catch (e) {}
}

// Initialize sample data if empty
if (!fs.existsSync(RECHARGES_FILE)) {
  const sampleRecharges = [
    {
      id: 'IMM-1001',
      username: 'fintech_india_otp',
      clientName: 'FinTech India Pvt Ltd',
      service: 'SMS',
      rechargeCount: 500000,
      ratePerUnit: 0.12,
      totalAmount: 60000,
      accountManager: 'Rahul Sharma',
      source: 'WhatsApp Message',
      remarks: 'Urgent OTP route recharge approved on WhatsApp group',
      submittedBy: 'support',
      screenshotUrl: '',
      screenshotName: '',
      billingStatus: 'Pending',
      invoiceNumber: '',
      billingRemarks: '',
      createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
      billedAt: null
    },
    {
      id: 'IMM-1002',
      username: 'retail_mart_wa',
      clientName: 'Retail Mart Enterprises',
      service: 'WhatsApp',
      rechargeCount: 100000,
      ratePerUnit: 0.45,
      totalAmount: 45000,
      accountManager: 'Priya Verma',
      source: 'Email Approval',
      remarks: 'Marketing campaign credits added, PO attached in mail',
      submittedBy: 'support',
      screenshotUrl: '',
      screenshotName: '',
      billingStatus: 'Billing Raised',
      invoiceNumber: 'IA/26-27/089',
      billingRemarks: 'Tally invoice raised & dispatched to client accounts',
      createdAt: new Date(Date.now() - 3600 * 1000 * 26).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
      billedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString()
    }
  ];
  fs.writeFileSync(RECHARGES_FILE, JSON.stringify(sampleRecharges, null, 2), 'utf8');
}

// Initialize sample campaigns if empty
if (!fs.existsSync(CAMPAIGNS_FILE)) {
  const sampleCampaigns = [
    {
      id: 'CMP-1001',
      username: 'apex_finance_wa',
      clientName: 'Apex Finserv Pvt Ltd',
      campaignName: 'Diwali Festive Loan Offer',
      service: 'WhatsApp',
      senderId: 'IMMNSE_WA',
      campaignUnits: 50000,
      ratePerUnit: 0.38,
      totalAmount: 19000,
      accountManager: 'Feroz',
      source: 'WhatsApp Message',
      campaignStatus: 'Completed',
      billingStatus: 'Billing Raised',
      invoiceNumber: 'IA/CMP/012',
      screenshotUrl: '',
      screenshotName: '',
      remarks: 'Diwali offer template broadcasted successfully to 50k client base',
      submittedBy: 'support',
      createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString()
    }
  ];
  fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(sampleCampaigns, null, 2), 'utf8');
}

function readCampaigns() {
  try {
    return JSON.parse(fs.readFileSync(CAMPAIGNS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function writeCampaigns(list) {
  fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

function readRecharges() {
  try {
    return JSON.parse(fs.readFileSync(RECHARGES_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function writeRecharges(list) {
  fs.writeFileSync(RECHARGES_FILE, JSON.stringify(list, null, 2), 'utf8');
}

function readSettings() {
  try {
    const s = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    if (!Array.isArray(s.users)) s.users = DEFAULT_SETTINGS.users;
    if (!Array.isArray(s.companies) || s.companies.length === 0) {
      s.companies = ['Immense Air', 'Immense Smart Solution', 'Zion'];
    }
    return s;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(settings) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
}

function saveBase64Image(base64Data, originalName = 'screenshot.png') {
  if (!base64Data || !base64Data.startsWith('data:')) return { url: '', name: '' };
  const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) return { url: '', name: '' };

  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  let ext = '.png';
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg';
  else if (mimeType.includes('webp')) ext = '.webp';
  else if (mimeType.includes('pdf')) ext = '.pdf';

  const safeBase = path
    .basename(originalName, path.extname(originalName))
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 32);
  const fileName = `${Date.now()}_${crypto.randomBytes(3).toString('hex')}_${safeBase}${ext}`;
  const filePath = path.join(UPLOADS_DIR, fileName);

  fs.writeFileSync(filePath, buffer);
  return {
    url: `/uploads/${fileName}`,
    name: originalName || fileName
  };
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req, maxBytes = 25 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > maxBytes) {
        req.destroy();
        reject(new Error('File too large (max 20MB)'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // API: POST /api/login (Separate Username & Password Authentication)
  if (req.method === 'POST' && pathname === '/api/login') {
    try {
      const body = await parseBody(req);
      const username = String(body.username || '').trim().toLowerCase();
      const password = String(body.password || '').trim();
      const settings = readSettings();

      const matchedUser = (settings.users || []).find(
        (u) =>
          (u.username.toLowerCase() === username ||
            (u.role === 'accounts' && username === 'accounts')) &&
          u.password === password
      );

      if (!matchedUser) {
        return sendJson(res, 401, { error: 'Invalid Username or Password. Please check your credentials.' });
      }

      return sendJson(res, 200, {
        user: {
          id: matchedUser.id,
          username: matchedUser.username,
          role: matchedUser.role,
          name: matchedUser.name,
          department: matchedUser.department
        }
      });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // API: GET /api/recharges
  if (req.method === 'GET' && pathname === '/api/recharges') {
    const list = readRecharges();
    const settings = readSettings();
    return sendJson(res, 200, {
      recharges: list,
      settings: {
        companyName: settings.companyName,
        companies: settings.companies || ['Immense Air', 'Immense Smart Solution', 'Zion'],
        services: settings.services,
        accountManagers: settings.accountManagers,
        sources: settings.sources,
        users: settings.users
      }
    });
  }

  // API: GET /api/errors (Telecom & DLT Error Code Hub database)
  if (req.method === 'GET' && pathname === '/api/errors') {
    const errorsFile = path.join(DATA_DIR, 'errors.json');
    if (fs.existsSync(errorsFile)) {
      const data = fs.readFileSync(errorsFile, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(data);
    }
    return sendJson(res, 200, []);
  }

  // API: GET /api/settings
  if (req.method === 'GET' && pathname === '/api/settings') {
    const settings = readSettings();
    return sendJson(res, 200, {
      settings: {
        companyName: settings.companyName,
        companies: settings.companies || ['Immense Air', 'Immense Smart Solution', 'Zion'],
        services: settings.services,
        accountManagers: settings.accountManagers,
        sources: settings.sources,
        users: settings.users
      }
    });
  }

  // API: POST /api/recharges/bulk (Bulk upload recharges from Excel / CSV)
  if (req.method === 'POST' && pathname === '/api/recharges/bulk') {
    try {
      const body = await parseBody(req);
      const items = Array.isArray(body.items) ? body.items : [];
      if (items.length === 0) {
        return sendJson(res, 400, { error: 'No valid recharge entries found in bulk upload.' });
      }

      let screenshotInfo = { url: '', name: '' };
      if (body.screenshotData) {
        screenshotInfo = saveBase64Image(body.screenshotData, body.screenshotName || 'bulk_proof.png');
      }

      const list = readRecharges();
      let maxNum = list.reduce((max, item) => {
        const num = parseInt(String(item.id).replace('IMM-', ''), 10);
        return !isNaN(num) && num > max ? num : max;
      }, 1000);

      const createdEntries = [];
      const now = new Date().toISOString();

      for (const row of items) {
        const u = String(row.username || '').trim();
        const count = Number(row.rechargeCount || row.units) || 0;
        if (!u || count <= 0) continue;

        maxNum++;
        const newEntry = {
          id: `IMM-${maxNum}`,
          username: u,
          clientName: String(row.clientName || '').trim(),
          service: String(row.service || 'SMS').trim(),
          rechargeCount: count,
          ratePerUnit: Number(row.ratePerUnit) || 0,
          totalAmount: Number(row.totalAmount) || 0,
          accountManager: String(row.accountManager || 'Rahul Sharma').trim(),
          source: String(row.source || 'WhatsApp Message').trim(),
          remarks: String(row.remarks || 'Bulk Excel Upload').trim(),
          submittedBy: String(body.submittedBy || 'support').trim(),
          screenshotUrl: screenshotInfo.url,
          screenshotName: screenshotInfo.name,
          billingStatus: 'Pending',
          invoiceNumber: '',
          billingRemarks: '',
          invoiceType: 'Tax Invoice',
          billingCompany: 'Immense Air',
          createdAt: now,
          updatedAt: now,
          billedAt: null
        };
        list.unshift(newEntry);
        createdEntries.push(newEntry);
      }

      if (createdEntries.length === 0) {
        return sendJson(res, 400, { error: 'None of the rows contained valid username and recharge count.' });
      }

      writeRecharges(list);
      return sendJson(res, 201, {
        message: `Successfully uploaded ${createdEntries.length} bulk recharges!`,
        count: createdEntries.length,
        entries: createdEntries
      });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // API: POST /api/recharges (Create new recharge entry)
  if (req.method === 'POST' && pathname === '/api/recharges') {
    try {
      const body = await parseBody(req);
      const list = readRecharges();

      if (!body.username || !body.service || !body.rechargeCount || !body.accountManager) {
        return sendJson(res, 400, { error: 'Username, Service, Recharge Count, and Account Manager are required.' });
      }

      let screenshotInfo = { url: '', name: '' };
      if (body.screenshotData) {
        screenshotInfo = saveBase64Image(body.screenshotData, body.screenshotName || 'proof.png');
      }

      const maxNum = list.reduce((max, item) => {
        const num = parseInt(String(item.id).replace('IMM-', ''), 10);
        return !isNaN(num) && num > max ? num : max;
      }, 1000);
      const nextNum = maxNum + 1;

      const count = Number(body.rechargeCount) || 0;
      const rate = Number(body.ratePerUnit) || 0;
      const totalAmount = body.totalAmount ? Number(body.totalAmount) : Math.round(count * rate * 100) / 100;

      const newEntry = {
        id: `IMM-${nextNum}`,
        username: String(body.username).trim(),
        clientName: String(body.clientName || '').trim(),
        service: String(body.service).trim(),
        servicesList: Array.isArray(body.servicesList) ? body.servicesList : [],
        servicesDetail: String(body.servicesDetail || '').trim(),
        rechargeCount: count,
        ratePerUnit: rate,
        baseAmount: body.baseAmount !== undefined ? Number(body.baseAmount) : (totalAmount > 0 ? totalAmount : 0),
        gstEnabled: body.gstEnabled !== undefined ? Boolean(body.gstEnabled) : (body.invoiceType !== 'Non GST'),
        gstRate: body.gstRate !== undefined ? Number(body.gstRate) : 18,
        gstAmount: body.gstAmount !== undefined ? Number(body.gstAmount) : 0,
        totalAmount: totalAmount,
        accountManager: String(body.accountManager).trim(),
        source: String(body.source || 'WhatsApp Message').trim(),
        remarks: String(body.remarks || '').trim(),
        submittedBy: String(body.submittedBy || 'support').trim(),
        screenshotUrl: screenshotInfo.url,
        screenshotName: screenshotInfo.name,
        billingStatus: 'Pending',
        invoiceNumber: '',
        billingRemarks: '',
        invoiceType: body.invoiceType ? String(body.invoiceType).trim() : 'Tax Invoice',
        billingCompany: body.billingCompany ? String(body.billingCompany).trim() : 'Immense Air',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        billedAt: null
      };

      list.unshift(newEntry);
      writeRecharges(list);
      return sendJson(res, 201, { message: 'Recharge entry submitted to Billing Department!', entry: newEntry });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // API: PUT /api/recharges/:id (Update entry / Accounts status update)
  if (req.method === 'PUT' && pathname.startsWith('/api/recharges/')) {
    try {
      const id = decodeURIComponent(pathname.replace('/api/recharges/', ''));
      const body = await parseBody(req);
      const list = readRecharges();
      const idx = list.findIndex((item) => item.id === id);

      if (idx === -1) {
        return sendJson(res, 404, { error: 'Entry not found' });
      }

      const existing = list[idx];
      let screenshotUrl = existing.screenshotUrl;
      let screenshotName = existing.screenshotName;

      const isAccountsUser = body.userRole === 'accounts';

      // Security rule: Accounts / Billing department CANNOT change or replace supporting approval screenshot!
      if (!isAccountsUser && body.screenshotData && body.screenshotData.startsWith('data:')) {
        const saved = saveBase64Image(body.screenshotData, body.screenshotName || 'updated_proof.png');
        screenshotUrl = saved.url;
        screenshotName = saved.name;
      }

      let newStatus = existing.billingStatus;
      let newInvoiceNumber = existing.invoiceNumber;
      let newBillingRemarks = existing.billingRemarks;
      let newInvoiceType = existing.invoiceType || 'Tax Invoice';
      let newBillingCompany = existing.billingCompany || 'Immense Air';
      let billedAt = existing.billedAt;
      let acknowledged = existing.acknowledged || false;
      let acknowledgedAt = existing.acknowledgedAt || null;
      let acknowledgedBy = existing.acknowledgedBy || null;

      let newPaymentStatus = existing.paymentStatus || 'Pending';
      let newPaidAmount = existing.paidAmount !== undefined ? Number(existing.paidAmount) : 0;
      let newPaymentMode = existing.paymentMode || '';
      let newPaymentDate = existing.paymentDate || '';
      let paymentUpdatedAt = existing.paymentUpdatedAt || null;
      let paymentUpdatedBy = existing.paymentUpdatedBy || null;

      // Follow-up state
      let followUpStatus = existing.followUpStatus || 'None'; // 'None' | 'Requested' | 'Updated' | 'Resolved'
      let followUpRequestedAt = existing.followUpRequestedAt || null;
      let followUpRequestedBy = existing.followUpRequestedBy || null;
      let followUpAdminRemark = existing.followUpAdminRemark || '';
      let followUpBillingRemark = existing.followUpBillingRemark || '';
      let followUpBillingOutcome = existing.followUpBillingOutcome || '';
      let followUpProofUrl = existing.followUpProofUrl || '';
      let followUpProofName = existing.followUpProofName || '';
      let followUpNextDate = existing.followUpNextDate || '';
      let followUpUpdatedAt = existing.followUpUpdatedAt || null;
      let followUpUpdatedBy = existing.followUpUpdatedBy || null;
      let followUpHistory = Array.isArray(existing.followUpHistory) ? [...existing.followUpHistory] : [];

      if (isAccountsUser || body.userRole === 'admin') {
        if (body.paymentStatus !== undefined) {
          newPaymentStatus = String(body.paymentStatus).trim();
          paymentUpdatedAt = new Date().toISOString();
          paymentUpdatedBy = isAccountsUser ? 'Accounts Department' : 'Admin';
        }
        if (body.paidAmount !== undefined) {
          newPaidAmount = Number(body.paidAmount) || 0;
        }
        if (body.paymentMode !== undefined) {
          newPaymentMode = String(body.paymentMode).trim();
        }
        if (body.paymentDate !== undefined) {
          newPaymentDate = String(body.paymentDate).trim();
        }

        // Admin requests payment follow-up
        if (body.userRole === 'admin' && (body.actionType === 'request_follow_up' || body.requestFollowUp)) {
          followUpStatus = 'Requested';
          followUpRequestedAt = new Date().toISOString();
          followUpRequestedBy = body.requestedBy || 'Super Admin';
          followUpAdminRemark = String(body.followUpAdminRemark || body.adminRemark || '').trim();
          followUpHistory.push({
            action: 'requested',
            by: followUpRequestedBy,
            remark: followUpAdminRemark,
            timestamp: followUpRequestedAt
          });
        }

        // Billing updates follow-up with supporting proof
        if (isAccountsUser && (body.actionType === 'update_follow_up' || body.updateFollowUp)) {
          followUpStatus = 'Updated';
          followUpUpdatedAt = new Date().toISOString();
          followUpUpdatedBy = body.updatedBy || 'Billing Department';
          followUpBillingRemark = String(body.followUpBillingRemark || body.billingRemark || '').trim();
          followUpBillingOutcome = String(body.followUpBillingOutcome || body.outcome || 'Follow-Up Completed').trim();
          followUpNextDate = String(body.followUpNextDate || '').trim();

          if (body.followUpProofData && body.followUpProofData.startsWith('data:')) {
            const savedProof = saveBase64Image(body.followUpProofData, body.followUpProofName || 'followup_proof.png');
            followUpProofUrl = savedProof.url;
            followUpProofName = savedProof.name;
          }

          followUpHistory.push({
            action: 'updated',
            by: followUpUpdatedBy,
            outcome: followUpBillingOutcome,
            remark: followUpBillingRemark,
            nextDate: followUpNextDate,
            proofUrl: followUpProofUrl,
            proofName: followUpProofName,
            timestamp: followUpUpdatedAt
          });
        }

        // Admin resolves follow-up
        if (body.userRole === 'admin' && body.actionType === 'resolve_follow_up') {
          followUpStatus = 'Resolved';
          followUpHistory.push({
            action: 'resolved',
            by: 'Super Admin',
            timestamp: new Date().toISOString()
          });
        }

        if (body.followUpStatus !== undefined) {
          followUpStatus = String(body.followUpStatus).trim();
        }
      }

      if (isAccountsUser) {
        if (body.billingStatus !== undefined) newStatus = body.billingStatus;
        if (body.invoiceNumber !== undefined) newInvoiceNumber = String(body.invoiceNumber).trim();
        if (body.billingRemarks !== undefined) newBillingRemarks = String(body.billingRemarks).trim();
        if (body.invoiceType !== undefined) newInvoiceType = String(body.invoiceType).trim();
        if (body.billingCompany !== undefined) newBillingCompany = String(body.billingCompany).trim();
        billedAt =
          newStatus === 'Billing Raised' && existing.billingStatus !== 'Billing Raised'
            ? new Date().toISOString()
            : newStatus !== 'Billing Raised'
            ? null
            : existing.billedAt;
      }

      if (body.acknowledged !== undefined) {
        acknowledged = Boolean(body.acknowledged);
        acknowledgedAt = acknowledged ? (existing.acknowledgedAt || new Date().toISOString()) : null;
        acknowledgedBy = acknowledged ? (String(body.acknowledgedBy || 'Accounts Department').trim()) : null;
      }

      if (newStatus === 'Billing Raised' || newStatus === 'Cancelled') {
        acknowledged = true;
        acknowledgedAt = acknowledgedAt || new Date().toISOString();
        acknowledgedBy = acknowledgedBy || 'Accounts Department';
      }

      const updated = {
        ...existing,
        username: !isAccountsUser && body.username !== undefined ? String(body.username).trim() : existing.username,
        clientName: body.clientName !== undefined ? String(body.clientName).trim() : existing.clientName,
        service: !isAccountsUser && body.service !== undefined ? String(body.service).trim() : existing.service,
        servicesList: Array.isArray(body.servicesList) ? body.servicesList : existing.servicesList,
        servicesDetail: body.servicesDetail !== undefined ? String(body.servicesDetail).trim() : existing.servicesDetail,
        rechargeCount: !isAccountsUser && body.rechargeCount !== undefined ? Number(body.rechargeCount) : existing.rechargeCount,
        ratePerUnit: body.ratePerUnit !== undefined ? Number(body.ratePerUnit) : existing.ratePerUnit,
        baseAmount: body.baseAmount !== undefined ? Number(body.baseAmount) : existing.baseAmount,
        gstEnabled: body.gstEnabled !== undefined ? Boolean(body.gstEnabled) : (existing.gstEnabled !== undefined ? existing.gstEnabled : true),
        gstRate: body.gstRate !== undefined ? Number(body.gstRate) : (existing.gstRate !== undefined ? existing.gstRate : 18),
        gstAmount: body.gstAmount !== undefined ? Number(body.gstAmount) : (existing.gstAmount !== undefined ? existing.gstAmount : 0),
        totalAmount: body.totalAmount !== undefined ? Number(body.totalAmount) : existing.totalAmount,
        accountManager: !isAccountsUser && body.accountManager !== undefined ? String(body.accountManager).trim() : existing.accountManager,
        source: body.source !== undefined ? String(body.source).trim() : existing.source,
        remarks: body.remarks !== undefined ? String(body.remarks).trim() : existing.remarks,
        billingStatus: newStatus,
        invoiceNumber: newInvoiceNumber,
        billingRemarks: newBillingRemarks,
        invoiceType: newInvoiceType,
        billingCompany: newBillingCompany,
        paymentStatus: newPaymentStatus,
        paidAmount: newPaidAmount,
        paymentMode: newPaymentMode,
        paymentDate: newPaymentDate,
        paymentUpdatedAt,
        paymentUpdatedBy,
        followUpStatus,
        followUpRequestedAt,
        followUpRequestedBy,
        followUpAdminRemark,
        followUpBillingRemark,
        followUpBillingOutcome,
        followUpProofUrl,
        followUpProofName,
        followUpNextDate,
        followUpUpdatedAt,
        followUpUpdatedBy,
        followUpHistory,
        screenshotUrl,
        screenshotName,
        updatedAt: new Date().toISOString(),
        billedAt,
        acknowledged,
        acknowledgedAt,
        acknowledgedBy
      };

      list[idx] = updated;
      writeRecharges(list);
      return sendJson(res, 200, { message: 'Entry updated successfully', entry: updated });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // API: POST /api/recharges/acknowledge-all (Acknowledge all pending entries)
  if (req.method === 'POST' && pathname === '/api/recharges/acknowledge-all') {
    try {
      const body = await parseBody(req);
      const list = readRecharges();
      const nowIso = new Date().toISOString();
      const acknowledgedBy = String(body.acknowledgedBy || 'Accounts Team').trim();
      let count = 0;
      list.forEach((item) => {
        if (item.billingStatus === 'Pending' && !item.acknowledged) {
          item.acknowledged = true;
          item.acknowledgedAt = nowIso;
          item.acknowledgedBy = acknowledgedBy;
          item.updatedAt = nowIso;
          count++;
        }
      });
      writeRecharges(list);
      return sendJson(res, 200, { message: `Acknowledged ${count} entries`, count });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // API: POST /api/recharges/:id/acknowledge (Billing Accounts acknowledges single entry)
  if (req.method === 'POST' && pathname.startsWith('/api/recharges/') && pathname.endsWith('/acknowledge')) {
    try {
      const id = decodeURIComponent(pathname.replace('/api/recharges/', '').replace('/acknowledge', ''));
      const body = await parseBody(req);
      const list = readRecharges();
      const idx = list.findIndex((item) => item.id === id);
      if (idx === -1) {
        return sendJson(res, 404, { error: 'Recharge entry not found' });
      }
      const existing = list[idx];
      const nowIso = new Date().toISOString();
      const acknowledgedBy = String(body.acknowledgedBy || 'Accounts Team').trim();
      existing.acknowledged = true;
      existing.acknowledgedAt = nowIso;
      existing.acknowledgedBy = acknowledgedBy;
      existing.updatedAt = nowIso;
      list[idx] = existing;
      writeRecharges(list);
      return sendJson(res, 200, { message: 'Recharge entry acknowledged successfully', entry: existing });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // API: DELETE /api/recharges/:id (STRICTLY ADMIN ONLY)
  if (req.method === 'DELETE' && pathname.startsWith('/api/recharges/')) {
    try {
      const id = decodeURIComponent(pathname.replace('/api/recharges/', ''));
      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      let userRole = parsedUrl.searchParams.get('userRole');

      if (!userRole) {
        try {
          const body = await parseBody(req);
          userRole = body ? body.userRole : null;
        } catch (e) {}
      }

      if (userRole !== 'admin') {
        return sendJson(res, 403, { error: 'Permission Denied: Only Super Admin can delete records. Accounts or Support cannot delete.' });
      }

      const list = readRecharges();
      const filtered = list.filter((item) => item.id !== id);
      writeRecharges(filtered);
      return sendJson(res, 200, { message: 'Entry deleted successfully' });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // =========================================================================
  // EXTERNAL CAMPAIGNS API (SUPPORT & ADMIN CAMPAIGN DISPATCH)
  // =========================================================================
  if (req.method === 'GET' && pathname === '/api/campaigns') {
    const list = readCampaigns();
    return sendJson(res, 200, { campaigns: list });
  }

  if (req.method === 'POST' && pathname === '/api/campaigns') {
    try {
      const body = await parseBody(req);
      const list = readCampaigns();

      if (!body.username || !body.service || !body.campaignUnits || !body.accountManager) {
        return sendJson(res, 400, { error: 'Username, Service, Units, and Account Manager are required.' });
      }

      let screenshotInfo = { url: '', name: '' };
      if (body.screenshotData) {
        screenshotInfo = saveBase64Image(body.screenshotData, body.screenshotName || 'campaign_proof.png');
      }

      const maxNum = list.reduce((max, item) => {
        const num = parseInt(String(item.id).replace('CMP-', ''), 10);
        return !isNaN(num) && num > max ? num : max;
      }, 1000);
      const nextNum = maxNum + 1;

      const units = Number(body.campaignUnits) || 0;
      const rate = Number(body.ratePerUnit) || 0;
      const totalAmount = body.totalAmount ? Number(body.totalAmount) : (rate > 0 ? Math.round(units * rate * 100) / 100 : 0);
      const campaignName = body.campaignName ? String(body.campaignName).trim() : `${body.service} Campaign`;

      const newCampaign = {
        id: `CMP-${nextNum}`,
        username: String(body.username).trim(),
        clientName: String(body.clientName || '').trim(),
        campaignName: campaignName,
        service: String(body.service).trim(),
        senderId: String(body.senderId || '').trim(),
        campaignUnits: units,
        ratePerUnit: rate,
        totalAmount: totalAmount,
        accountManager: String(body.accountManager).trim(),
        source: String(body.source || 'WhatsApp Message').trim(),
        remarks: String(body.remarks || '').trim(),
        submittedBy: String(body.submittedBy || 'support').trim(),
        screenshotUrl: screenshotInfo.url,
        screenshotName: screenshotInfo.name,
        campaignStatus: String(body.campaignStatus || 'Completed').trim(),
        billingStatus: 'Pending',
        invoiceNumber: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      list.unshift(newCampaign);
      writeCampaigns(list);
      return sendJson(res, 201, { message: 'External campaign logged and dispatched successfully!', campaign: newCampaign });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  if (req.method === 'PUT' && pathname.startsWith('/api/campaigns/')) {
    try {
      const id = decodeURIComponent(pathname.replace('/api/campaigns/', ''));
      const body = await parseBody(req);
      const list = readCampaigns();
      const idx = list.findIndex((item) => item.id === id);

      if (idx === -1) {
        return sendJson(res, 404, { error: 'Campaign not found' });
      }

      const existing = list[idx];
      let screenshotUrl = existing.screenshotUrl;
      let screenshotName = existing.screenshotName;
      if (body.screenshotData && body.screenshotData.startsWith('data:')) {
        const saved = saveBase64Image(body.screenshotData, body.screenshotName || 'campaign_proof.png');
        screenshotUrl = saved.url;
        screenshotName = saved.name;
      }

      const updated = {
        ...existing,
        username: body.username !== undefined ? String(body.username).trim() : existing.username,
        clientName: body.clientName !== undefined ? String(body.clientName).trim() : existing.clientName,
        campaignName: body.campaignName !== undefined ? String(body.campaignName).trim() : existing.campaignName,
        service: body.service !== undefined ? String(body.service).trim() : existing.service,
        senderId: body.senderId !== undefined ? String(body.senderId).trim() : existing.senderId,
        campaignUnits: body.campaignUnits !== undefined ? Number(body.campaignUnits) : existing.campaignUnits,
        ratePerUnit: body.ratePerUnit !== undefined ? Number(body.ratePerUnit) : existing.ratePerUnit,
        totalAmount: body.totalAmount !== undefined ? Number(body.totalAmount) : existing.totalAmount,
        accountManager: body.accountManager !== undefined ? String(body.accountManager).trim() : existing.accountManager,
        source: body.source !== undefined ? String(body.source).trim() : existing.source,
        remarks: body.remarks !== undefined ? String(body.remarks).trim() : existing.remarks,
        campaignStatus: body.campaignStatus !== undefined ? String(body.campaignStatus).trim() : existing.campaignStatus,
        billingStatus: body.billingStatus !== undefined ? String(body.billingStatus).trim() : existing.billingStatus,
        invoiceNumber: body.invoiceNumber !== undefined ? String(body.invoiceNumber).trim() : existing.invoiceNumber,
        screenshotUrl,
        screenshotName,
        updatedAt: new Date().toISOString()
      };

      list[idx] = updated;
      writeCampaigns(list);
      return sendJson(res, 200, { message: 'Campaign updated successfully', campaign: updated });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  if (req.method === 'DELETE' && pathname.startsWith('/api/campaigns/')) {
    try {
      const id = decodeURIComponent(pathname.replace('/api/campaigns/', ''));
      const list = readCampaigns();
      const filtered = list.filter((item) => item.id !== id);
      writeCampaigns(filtered);
      return sendJson(res, 200, { message: 'Campaign deleted successfully' });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // API: POST /api/settings (Admin manages Account Managers & 3 Login Accounts)
  if (req.method === 'POST' && pathname === '/api/settings') {
    try {
      const body = await parseBody(req);
      const current = readSettings();
      if (Array.isArray(body.companies)) {
        current.companies = body.companies;
      }
      if (body.newCompany) {
        const cName = String(body.newCompany).trim();
        if (!Array.isArray(current.companies)) current.companies = ['Immense Air', 'Immense Smart Solution', 'Zion'];
        if (cName && !current.companies.includes(cName)) {
          current.companies.push(cName);
        }
      }
      if (body.removeCompany) {
        if (!Array.isArray(current.companies)) current.companies = ['Immense Air', 'Immense Smart Solution', 'Zion'];
        current.companies = current.companies.filter((c) => c !== body.removeCompany);
      }
      if (Array.isArray(body.accountManagers)) {
        current.accountManagers = body.accountManagers;
      }
      if (body.newAccountManager) {
        const name = String(body.newAccountManager).trim();
        if (name && !current.accountManagers.includes(name)) {
          current.accountManagers.push(name);
        }
      }
      if (body.removeAccountManager) {
        current.accountManagers = current.accountManagers.filter((m) => m !== body.removeAccountManager);
      }
      if (Array.isArray(body.users)) {
        current.users = body.users;
      }
      writeSettings(current);
      return sendJson(res, 200, { settings: current });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // API: GET /api/export/csv (Download all records in Excel CSV)
  if (req.method === 'GET' && pathname === '/api/export/csv') {
    const list = readRecharges();
    const headers = [
      'Entry ID',
      'Date & Time',
      'Client Username',
      'Company Name',
      'Service',
      'Recharge Count',
      'Rate',
      'Amount (INR)',
      'Account Manager',
      'Approval Source',
      'Support Remarks',
      'Billing Status',
      'Billing Company',
      'Invoice Type',
      'Invoice Number',
      'Accounts Remarks',
      'Billed At',
      'Screenshot Link'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      return `"${String(val).replace(/"/g, '""')}"`;
    };

    const rows = list.map((r) => [
      r.id,
      new Date(r.createdAt).toLocaleString('en-IN'),
      r.username,
      r.clientName || '',
      r.service,
      r.rechargeCount,
      r.ratePerUnit || 0,
      r.totalAmount || 0,
      r.accountManager,
      r.source || '',
      r.remarks || '',
      r.billingStatus,
      r.billingCompany || 'Immense Air',
      r.invoiceType || 'Tax Invoice',
      r.invoiceNumber || '',
      r.billingRemarks || '',
      r.billedAt ? new Date(r.billedAt).toLocaleString('en-IN') : '',
      r.screenshotUrl ? `http://${req.headers.host}${r.screenshotUrl}` : 'No Screenshot'
    ]);

    const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows.map((r) => r.map(escapeCsv).join(','))].join('\r\n');

    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="ImmenseAir_Billing_Report_${new Date().toISOString().slice(0, 10)}.csv"`
    });
    return res.end(csvContent);
  }

  // Serve Uploaded Screenshots
  if (req.method === 'GET' && pathname.startsWith('/uploads/')) {
    const fileName = path.basename(pathname);
    const filePath = path.join(UPLOADS_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      return res.end('Screenshot not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    const isDownload = parsedUrl.searchParams.get('download') === '1';
    const headers = {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream'
    };
    if (isDownload) {
      headers['Content-Disposition'] = `attachment; filename="${fileName}"`;
    }
    res.writeHead(200, headers);
    return fs.createReadStream(filePath).pipe(res);
  }

  // Serve Frontend Static Files
  const cleanPath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.join(PUBLIC_DIR, cleanPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return fs.createReadStream(filePath).pipe(res);
  }

  // Fallback to index.html
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return fs.createReadStream(indexPath).pipe(res);
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Immense Air Billing Portal LIVE on http://localhost:${PORT}`);
  console.log(`====================================================`);
});
