// Immense Air Pvt. Ltd. — Left Sidebar + Right Details Workspace Logic
// Separate Accounts: 1. admin (Super Admin) | 2. billing (Billing Dept) | 3. support (Support Desk)

const state = {
  currentUser: JSON.parse(sessionStorage.getItem('immense_auth_user') || 'null'),
  activeView: 'dashboard', // 'dashboard' | 'add-recharge' | 'billing-queue' | 'history-ledger' | 'sales-managers'
  selectedSalesManager: null,
  recharges: [],
  settings: {
    services: ['SMS', 'RCS', 'WhatsApp', 'Virtual WhatsApp', 'OBD', 'IVR', 'SMPP'],
    accountManagers: [],
    users: []
  },
  dateFilterMode: 'all', // 'all' | 'today' | 'yesterday' | 'custom'
  dateFilterFrom: '',
  dateFilterTo: '',
  dashQuickTab: 'ALL',
  historySubTab: 'recharge', // 'recharge' | 'billing' | 'all'
  filterStatus: 'ALL',
  filterService: 'ALL',
  filterManager: 'ALL',
  searchQuery: '',
  historySearchQuery: '',
  clientListManager: 'ALL',
  clientListSearchQuery: '',
  currentScreenshotData: '',
  currentScreenshotName: '',
  selectedChannels: ['SMS'],
  channelUnits: { SMS: '' },
  bulkParsedItems: [],
  bulkProofData: '',
  bulkProofName: '',
  editScreenshotData: '',
  editScreenshotName: '',
  campaigns: [],
  activeCampaignSubTab: 'form',
  campaignSearchQuery: '',
  campaignFilterService: 'ALL',
  campaignFilterStatus: 'ALL',
  currentCampaignFileData: '',
  currentCampaignFileName: '',
  editingCampaignId: null,
  repDateMode: 'all', // 'all' | 'today' | 'yesterday' | 'this_month' | 'custom'
  repDateFrom: '',
  repDateTo: '',
  repFilterEntity: 'ALL',
  repFilterInvoiceType: 'ALL',
  repFilterService: 'ALL',
  chartInstances: {}
};

// DOM Elements
const loginGate = document.getElementById('loginGate');
const portalApp = document.getElementById('portalApp');
const loginForm = document.getElementById('loginForm');
const loginUsernameInput = document.getElementById('loginUsernameInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');
const logoutBtn = document.getElementById('logoutBtn');

const loggedUserName = document.getElementById('loggedUserName');
const loggedUserDept = document.getElementById('loggedUserDept');

// Left Sidebar Buttons
const navBtnDashboard = document.getElementById('navBtnDashboard');
const navBtnAddRecharge = document.getElementById('navBtnAddRecharge');
const navBtnCampaign = document.getElementById('navBtnCampaign');
const navBtnCampaignLabel = document.getElementById('navBtnCampaignLabel');
const campaignBadge = document.getElementById('campaignBadge');
const navBtnBillingQueue = document.getElementById('navBtnBillingQueue');
const navBtnBillingLabel = document.getElementById('navBtnBillingLabel');
const navBtnHistory = document.getElementById('navBtnHistory');
const navBtnReport = document.getElementById('navBtnReport');
const navBtnErrorCode = document.getElementById('navBtnErrorCode');
const navBtnErrorCodeLabel = document.getElementById('navBtnErrorCodeLabel');
const errorCodePanel = document.getElementById('errorCodePanel');

const navBtnReportLabel = document.getElementById('navBtnReportLabel');
const navBtnSalesManagers = document.getElementById('navBtnSalesManagers');
const navBtnSalesLabel = document.getElementById('navBtnSalesLabel');
const navBtnFollowUp = document.getElementById('navBtnFollowUp');
const navBtnFollowUpLabel = document.getElementById('navBtnFollowUpLabel');
const optFollowUpBadge = document.getElementById('optFollowUpBadge');

// Right Side View Panels
const dashboardPanel = document.getElementById('dashboardPanel');
const formPanel = document.getElementById('formPanel');
const campaignPanel = document.getElementById('campaignPanel');
const accountsPanel = document.getElementById('accountsPanel');
const historyPanel = document.getElementById('historyPanel');
const accountsReportPanel = document.getElementById('accountsReportPanel');
const salesManagerPanel = document.getElementById('salesManagerPanel');
const followUpPanel = document.getElementById('followUpPanel');
const mobNavReport = document.getElementById('mobNavReport');
const mobNavCampaign = document.getElementById('mobNavCampaign');

const activeRoleBadge = document.getElementById('activeRoleBadge');
const activeRoleDesc = document.getElementById('activeRoleDesc');
const headerRoleSub = document.getElementById('headerRoleSub');
const adminSettingsBtn = document.getElementById('adminSettingsBtn');
const headerExportBtn = document.getElementById('headerExportBtn');
const ledgerExportBtn = document.getElementById('ledgerExportBtn');

const rechargeForm = document.getElementById('rechargeForm');
const uploadZone = document.getElementById('uploadZone');
const screenshotInput = document.getElementById('screenshotInput');
const uploadEmpty = document.getElementById('uploadEmpty');
const uploadPreviewContainer = document.getElementById('uploadPreviewContainer');
const uploadPreviewImg = document.getElementById('uploadPreviewImg');
const uploadFileName = document.getElementById('uploadFileName');
const removeImgBtn = document.getElementById('removeImgBtn');

const selectedServiceInput = document.getElementById('selectedService');
const serviceChips = document.getElementById('serviceChips');
const rechargeCountInput = document.getElementById('rechargeCount');
const ratePerUnitInput = document.getElementById('ratePerUnit');
const totalAmountInput = document.getElementById('totalAmount');
const accountManagerSelect = document.getElementById('accountManager');
const addManagerBtn = document.getElementById('addManagerBtn');

const recordsList = document.getElementById('recordsList');
const searchInput = document.getElementById('searchInput');
const filterService = document.getElementById('filterService');
const filterManager = document.getElementById('filterManager');
const statusFilterGroup = document.getElementById('statusFilterGroup');
const refreshBtn = document.getElementById('refreshBtn');

// Option 1 Sub-History & Option 3 & Option 4 Elements
const rechargeSectionHistoryBody = document.getElementById('rechargeSectionHistoryBody');
const historySubTabsGroup = document.getElementById('historySubTabsGroup');
const historyTabCountBadge = document.getElementById('historyTabCountBadge');
const historyTableHead = document.getElementById('historyTableHead');
const historySearchInput = document.getElementById('historySearchInput');
const historyTableBody = document.getElementById('historyTableBody');
const amSummaryCardsGrid = document.getElementById('amSummaryCardsGrid');
const amDrilldownSection = document.getElementById('amDrilldownSection');
const drilldownTitle = document.getElementById('drilldownTitle');
const amUserWiseTableBody = document.getElementById('amUserWiseTableBody');
const amEntriesTableBody = document.getElementById('amEntriesTableBody');
const closeDrilldownBtn = document.getElementById('closeDrilldownBtn');
const addAmFromSalesBtn = document.getElementById('addAmFromSalesBtn');

// Modals
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeEditModalBtn = document.getElementById('closeEditModal');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const deleteEntryBtn = document.getElementById('deleteEntryBtn');
const editScreenshotInput = document.getElementById('editScreenshotInput');

const adminSettingsModal = document.getElementById('adminSettingsModal');
const closeAdminSettingsModalBtn = document.getElementById('closeAdminSettingsModal');
const adminManagersList = document.getElementById('adminManagersList');
const newManagerInput = document.getElementById('newManagerInput');
const adminAddManagerBtn = document.getElementById('adminAddManagerBtn');
const credentialsUpdateForm = document.getElementById('credentialsUpdateForm');
const adminCredentialsFields = document.getElementById('adminCredentialsFields');

const imageModal = document.getElementById('imageModal');
const modalFullImage = document.getElementById('modalFullImage');
const downloadModalImgBtn = document.getElementById('downloadModalImgBtn');
const closeImageModalBtn = document.getElementById('closeImageModal');

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

function formatNumberIN(num) {
  const n = Number(num) || 0;
  return n.toLocaleString('en-IN');
}

function formatCurrencyIN(num) {
  const n = Number(num) || 0;
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function formatRechargeAmountCell(item) {
  const isSupportRole = state.currentUser?.role === 'support';
  if (!(item.totalAmount > 0)) {
    return isSupportRole
      ? '<span style="color:var(--ink-muted);font-size:11.5px;font-style:italic;">Managed by Accounts</span>'
      : '<span style="color:var(--accent);font-size:11.5px;font-weight:600;">Pending Accounts</span>';
  }
  let gstNote = '';
  if (item.gstEnabled && item.gstAmount > 0) {
    gstNote = `<div style="font-size:10.5px;color:var(--accent);font-weight:600;">(Incl. 18% GST: ₹${formatNumberIN(item.gstAmount)})</div>`;
  } else if (item.gstEnabled === false || item.invoiceType === 'Non GST') {
    gstNote = `<div style="font-size:10px;color:var(--ink-muted);font-weight:500;">(Non-GST)</div>`;
  }
  return `<div>${formatCurrencyIN(item.totalAmount)}</div>${gstNote}`;
}

function formatDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// Read & compress image file to Base64
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (!file.type.startsWith('image/')) {
        return resolve(dataUrl);
      }
      const img = new Image();
      img.onload = () => {
        const maxDim = 1600;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// =========================================================================
// AUTHENTICATION & SEPARATE ROLE WORKSPACE SETUP
// =========================================================================
// Password visibility toggle on login form
const toggleLoginPasswordBtn = document.getElementById('toggleLoginPasswordBtn');
if (toggleLoginPasswordBtn && loginPasswordInput) {
  toggleLoginPasswordBtn.addEventListener('click', () => {
    const isPass = loginPasswordInput.type === 'password';
    loginPasswordInput.type = isPass ? 'text' : 'password';
    toggleLoginPasswordBtn.title = isPass ? 'Hide Password' : 'Show Password';
    toggleLoginPasswordBtn.style.color = isPass ? 'var(--orange)' : 'var(--ink-muted)';
  });
}

document.querySelectorAll('.cred-pill').forEach((btn) => {
  btn.addEventListener('click', () => {
    loginUsernameInput.value = btn.dataset.u;
    loginPasswordInput.value = btn.dataset.p;
    loginUsernameInput.focus();
  });
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('loginSubmitBtn');
  submitBtn.disabled = true;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: loginUsernameInput.value.trim(),
        password: loginPasswordInput.value.trim()
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid credentials');

    state.currentUser = data.user;
    sessionStorage.setItem('immense_auth_user', JSON.stringify(data.user));
    loginPasswordInput.value = '';
    enterAuthenticatedPortal();
    showToast(`Welcome, ${data.user.name} (${data.user.username})`);
  } catch (err) {
    showToast(`Login Failed: ${err.message}`);
  } finally {
    submitBtn.disabled = false;
  }
});

function handleUserLogout() {
  state.currentUser = null;
  sessionStorage.removeItem('immense_auth_user');
  portalApp.classList.add('hidden');
  loginGate.classList.remove('hidden');
  loginUsernameInput.value = '';
  loginPasswordInput.value = '';
  if (typeof closeMobileDrawer === 'function') {
    closeMobileDrawer();
  }
  showToast('Signed out successfully');
}

if (logoutBtn) logoutBtn.addEventListener('click', handleUserLogout);
const mobileHeaderLogoutBtn = document.getElementById('mobileHeaderLogoutBtn');
if (mobileHeaderLogoutBtn) mobileHeaderLogoutBtn.addEventListener('click', handleUserLogout);
const drawerQuickLogoutBtn = document.getElementById('drawerQuickLogoutBtn');
if (drawerQuickLogoutBtn) drawerQuickLogoutBtn.addEventListener('click', handleUserLogout);

function enterAuthenticatedPortal() {
  if (!state.currentUser) {
    portalApp.classList.add('hidden');
    loginGate.classList.remove('hidden');
    return;
  }

  loginGate.classList.add('hidden');
  portalApp.classList.remove('hidden');

  const role = state.currentUser.role; // 'admin' | 'accounts' | 'support'
  loggedUserName.textContent = state.currentUser.name;
  loggedUserDept.textContent = `ID: ${state.currentUser.username}`;

  const mobNavDashboard = document.getElementById('mobNavDashboard');
  const mobNavAddRecharge = document.getElementById('mobNavAddRecharge');
  const mobNavBillingQueue = document.getElementById('mobNavBillingQueue');
  const mobNavHistory = document.getElementById('mobNavHistory');
  const mobBillingLabel = document.getElementById('mobBillingLabel');
  const mobNavErrorCode = document.getElementById('mobNavErrorCode');

  const resetSidebarOrder = () => {
    [navBtnDashboard, navBtnAddRecharge, navBtnCampaign, navBtnBillingQueue, navBtnHistory, navBtnReport, navBtnSalesManagers, navBtnFollowUp, navBtnErrorCode].forEach(b => {
      if (b) b.style.order = '';
    });
  };

  if (role === 'support') {
    // Support Role: Sequential 1-5 order: 1. Add Recharge, 2. External Campaign, 3. Submitted Status, 4. Recharge Report, 5. Error Code Hub
    activeRoleBadge.textContent = 'SUPPORT PORTAL';
    activeRoleDesc.textContent = '';
    headerRoleSub.textContent = 'SUPPORT DESK';

    navBtnDashboard.classList.add('hidden');

    navBtnAddRecharge.classList.remove('hidden');
    navBtnAddRecharge.style.order = '1';
    const navBtnAddRechargeLabel = document.getElementById('navBtnAddRechargeLabel');
    if (navBtnAddRechargeLabel) navBtnAddRechargeLabel.textContent = '1. Add Recharge';

    if (navBtnCampaign) {
      navBtnCampaign.classList.remove('hidden');
      navBtnCampaign.style.order = '2';
      if (navBtnCampaignLabel) navBtnCampaignLabel.textContent = '2. External Campaign';
    }

    navBtnBillingQueue.classList.remove('hidden');
    navBtnBillingQueue.style.order = '3';
    navBtnBillingLabel.textContent = '3. Submitted Status';

    navBtnHistory.classList.remove('hidden');
    navBtnHistory.style.order = '4';
    const navBtnHistoryLabel = document.getElementById('navBtnHistoryLabel');
    if (navBtnHistoryLabel) navBtnHistoryLabel.textContent = '4. Recharge Report';

    if (navBtnErrorCode) {
      navBtnErrorCode.classList.remove('hidden');
      navBtnErrorCode.style.order = '5';
      if (navBtnErrorCodeLabel) navBtnErrorCodeLabel.textContent = '5. Error Code Hub';
    }

    if (navBtnReport) navBtnReport.classList.add('hidden');
    navBtnSalesManagers.classList.add('hidden');
    if (navBtnFollowUp) navBtnFollowUp.classList.add('hidden');

    if (mobNavDashboard) mobNavDashboard.classList.add('hidden');
    if (mobNavAddRecharge) mobNavAddRecharge.classList.remove('hidden');
    if (mobNavCampaign) mobNavCampaign.classList.remove('hidden');
    if (mobNavBillingQueue) mobNavBillingQueue.classList.remove('hidden');
    if (mobBillingLabel) mobBillingLabel.textContent = 'Status';
    if (mobNavHistory) {
      mobNavHistory.classList.remove('hidden');
      const mobHistoryLabel = document.getElementById('mobHistoryLabel');
      if (mobHistoryLabel) mobHistoryLabel.textContent = 'Report';
    }
    if (mobNavErrorCode) mobNavErrorCode.classList.remove('hidden');
    if (mobNavReport) mobNavReport.classList.add('hidden');

    adminSettingsBtn.classList.add('hidden');
    const topbarCompBtn = document.getElementById('topbarManageCompaniesBtn');
    if (topbarCompBtn) topbarCompBtn.classList.add('hidden');
    headerExportBtn.classList.add('hidden');
    ledgerExportBtn.classList.add('hidden');
    addManagerBtn.classList.add('hidden');

    const historyExportBtn = document.getElementById('historyExportBtn');
    if (historyExportBtn) historyExportBtn.classList.add('hidden');

    // Customize status filter labels for support (Bill Not Raised / Bill Raised)
    const pillPending = document.querySelector('#statusFilterGroup [data-status="Pending"]');
    const pillRaised = document.querySelector('#statusFilterGroup [data-status="Billing Raised"]');
    if (pillPending) pillPending.innerHTML = `Bill Not Raised <span class="pill-count tnum" id="countPending">0</span>`;
    if (pillRaised) pillRaised.innerHTML = `Bill Raised <span class="pill-count tnum" id="countRaised">0</span>`;

    const billingHtab = document.querySelector('#historySubTabsGroup [data-htab="billing"]');
    if (billingHtab) billingHtab.classList.add('hidden');

    // Support Role: completely hide "3. Recharge History" sub-tab from the Add Recharge segmented control
    const tabBtnRechargeHistory = document.getElementById('tabBtnRechargeHistory');
    if (tabBtnRechargeHistory) tabBtnRechargeHistory.classList.add('hidden');
    const rechargeTabHistory = document.getElementById('rechargeTabHistory');
    if (rechargeTabHistory) rechargeTabHistory.classList.add('hidden');

    selectWorkspaceView('add-recharge');
  } else if (role === 'accounts') {
    resetSidebarOrder();
    // Reset status filter labels for accounts/admin
    const pillPending = document.querySelector('#statusFilterGroup [data-status="Pending"]');
    const pillRaised = document.querySelector('#statusFilterGroup [data-status="Billing Raised"]');
    if (pillPending) pillPending.innerHTML = `Pending Verification <span class="pill-count tnum" id="countPending">0</span>`;
    if (pillRaised) pillRaised.innerHTML = `Billing Invoiced History <span class="pill-count tnum" id="countRaised">0</span>`;

    const navBtnHistoryLabel = document.getElementById('navBtnHistoryLabel');
    if (navBtnHistoryLabel) navBtnHistoryLabel.textContent = '3. Billing History';
    const mobHistoryLabel = document.getElementById('mobHistoryLabel');
    if (mobHistoryLabel) mobHistoryLabel.textContent = 'Billing History';
    const historyExportBtn = document.getElementById('historyExportBtn');
    if (historyExportBtn) historyExportBtn.classList.remove('hidden');

    const billingHtab = document.querySelector('#historySubTabsGroup [data-htab="billing"]');
    if (billingHtab) billingHtab.classList.remove('hidden');
    // Billing Dept Role: Left menu shows Billing Queue, Billing History & Accounts Report
    activeRoleBadge.textContent = 'BILLING DEPARTMENT';
    activeRoleDesc.textContent = '';
    headerRoleSub.textContent = 'BILLING DEPT';

    navBtnDashboard.classList.add('hidden');
    navBtnAddRecharge.classList.add('hidden');
    if (navBtnCampaign) navBtnCampaign.classList.add('hidden');
    navBtnBillingQueue.classList.remove('hidden');
    navBtnBillingLabel.textContent = '1. Billing Queue';
    if (navBtnFollowUp) {
      navBtnFollowUp.classList.remove('hidden');
      if (navBtnFollowUpLabel) navBtnFollowUpLabel.textContent = '2. Payment Follow-Up';
    }
    navBtnHistory.classList.remove('hidden');
    if (navBtnHistoryLabel) navBtnHistoryLabel.textContent = '3. Billing History';

    if (navBtnReport) {
      navBtnReport.classList.remove('hidden');
      if (navBtnReportLabel) navBtnReportLabel.textContent = '4. Account History';
    }
    if (navBtnErrorCode) {
      navBtnErrorCode.classList.add('hidden');
    }
    navBtnSalesManagers.classList.add('hidden');

    if (mobNavDashboard) mobNavDashboard.classList.add('hidden');
    if (mobNavAddRecharge) mobNavAddRecharge.classList.add('hidden');
    if (mobNavCampaign) mobNavCampaign.classList.add('hidden');
    if (mobNavBillingQueue) mobNavBillingQueue.classList.remove('hidden');
    if (mobBillingLabel) mobBillingLabel.textContent = 'Queue';
    if (mobNavHistory) mobNavHistory.classList.remove('hidden');
    if (mobNavReport) mobNavReport.classList.remove('hidden');
    if (mobNavErrorCode) mobNavErrorCode.classList.add('hidden');

    adminSettingsBtn.classList.add('hidden');
    const topbarCompBtn = document.getElementById('topbarManageCompaniesBtn');
    if (topbarCompBtn) topbarCompBtn.classList.add('hidden');
    headerExportBtn.classList.remove('hidden');
    ledgerExportBtn.classList.remove('hidden');

    selectWorkspaceView('billing-queue');
  } else {
    resetSidebarOrder();
    // ADMIN ROLE: Simple, neat, organized like Billing & Support
    activeRoleBadge.textContent = 'SUPER ADMIN';
    activeRoleDesc.textContent = '';
    headerRoleSub.textContent = 'ADMIN CONSOLE';

    navBtnDashboard.classList.remove('hidden');

    // Simple 1, 2, 3, 4, 5 structure as requested
    navBtnBillingQueue.classList.remove('hidden');
    navBtnBillingLabel.textContent = '1. Billing Queue';

    navBtnAddRecharge.classList.remove('hidden');
    const navBtnAddRechargeLabel = document.getElementById('navBtnAddRechargeLabel');
    if (navBtnAddRechargeLabel) navBtnAddRechargeLabel.textContent = '2. Add Recharge';

    const tabBtnRechargeHistory = document.getElementById('tabBtnRechargeHistory');
    if (tabBtnRechargeHistory) tabBtnRechargeHistory.classList.remove('hidden');

    navBtnHistory.classList.remove('hidden');
    const navBtnHistoryLabel = document.getElementById('navBtnHistoryLabel');
    if (navBtnHistoryLabel) navBtnHistoryLabel.textContent = '3. Reports & History';

    navBtnSalesManagers.classList.remove('hidden');
    if (navBtnSalesLabel) navBtnSalesLabel.textContent = '4. Client List';

    if (navBtnFollowUp) {
      navBtnFollowUp.classList.remove('hidden');
      if (navBtnFollowUpLabel) navBtnFollowUpLabel.textContent = '5. Payment Follow-Up';
    }

    if (navBtnCampaign) {
      navBtnCampaign.classList.remove('hidden');
      if (navBtnCampaignLabel) navBtnCampaignLabel.textContent = '6. External Campaigns';
    }
    if (navBtnReport) {
      navBtnReport.classList.remove('hidden');
      if (navBtnReportLabel) navBtnReportLabel.textContent = '7. Account History';
    }
    if (navBtnErrorCode) {
      navBtnErrorCode.classList.remove('hidden');
      if (navBtnErrorCodeLabel) navBtnErrorCodeLabel.textContent = '8. Error Code Hub';
    }

    const mobHistoryLabel = document.getElementById('mobHistoryLabel');
    if (mobHistoryLabel) mobHistoryLabel.textContent = 'History';
    const historyExportBtn = document.getElementById('historyExportBtn');
    if (historyExportBtn) historyExportBtn.classList.remove('hidden');

    if (mobNavDashboard) mobNavDashboard.classList.remove('hidden');
    if (mobNavBillingQueue) mobNavBillingQueue.classList.remove('hidden');
    if (mobBillingLabel) mobBillingLabel.textContent = 'Queue';
    if (mobNavAddRecharge) mobNavAddRecharge.classList.remove('hidden');
    if (mobNavHistory) mobNavHistory.classList.remove('hidden');
    if (mobNavCampaign) mobNavCampaign.classList.remove('hidden');
    if (mobNavReport) mobNavReport.classList.remove('hidden');

    adminSettingsBtn.classList.remove('hidden');
    const topbarCompBtn = document.getElementById('topbarManageCompaniesBtn');
    if (topbarCompBtn) topbarCompBtn.classList.remove('hidden');
    headerExportBtn.classList.remove('hidden');
    ledgerExportBtn.classList.remove('hidden');
    addManagerBtn.classList.remove('hidden');

    selectWorkspaceView('dashboard');
  }

  fetchAllData();
}

// =========================================================================
// MOBILE DRAWER CONTROLS (OPEN / CLOSE SLIDE-OVER SIDEBAR)
// =========================================================================
const portalSidebar = document.getElementById('portalSidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const mobNavMenu = document.getElementById('mobNavMenu');
const mobileRefreshBtn = document.getElementById('mobileRefreshBtn');
const mobileActiveViewTitle = document.getElementById('mobileActiveViewTitle');

function openMobileDrawer() {
  if (portalSidebar) portalSidebar.classList.add('open');
  if (sidebarBackdrop) sidebarBackdrop.classList.remove('hidden');
}

function closeMobileDrawer() {
  if (portalSidebar) portalSidebar.classList.remove('open');
  if (sidebarBackdrop) sidebarBackdrop.classList.add('hidden');
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);
if (mobNavMenu) mobNavMenu.addEventListener('click', openMobileDrawer);
if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeMobileDrawer);
if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileDrawer);
if (mobileRefreshBtn) mobileRefreshBtn.addEventListener('click', () => refreshBtn.click());

// =========================================================================
// LEFT SIDEBAR -> RIGHT WORKSPACE VIEW SWITCHER
// =========================================================================
window.selectWorkspaceView = function (viewName) {
  state.activeView = viewName;

  // Auto-close mobile drawer when user taps any view
  closeMobileDrawer();

  // Update active status on Desktop Sidebar Buttons
  document.querySelectorAll('.side-nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.nav === viewName);
  });

  // Update active status on Mobile Bottom Nav Buttons
  document.querySelectorAll('.mob-nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.nav === viewName);
  });

  // Update Mobile Header Active View Name
  if (mobileActiveViewTitle) {
    if (viewName === 'dashboard') mobileActiveViewTitle.textContent = 'Dashboard';
    else if (viewName === 'add-recharge') mobileActiveViewTitle.textContent = 'Add Recharge';
    else if (viewName === 'external-campaign') mobileActiveViewTitle.textContent = 'External Campaign';
    else if (viewName === 'billing-queue') mobileActiveViewTitle.textContent = state.currentUser?.role === 'support' ? 'Submitted Status' : 'Billing Queue';
    else if (viewName === 'history-ledger') mobileActiveViewTitle.textContent = state.currentUser?.role === 'support' ? 'Recharge Report' : 'Billing History';
    else if (viewName === 'accounts-report') mobileActiveViewTitle.textContent = 'Account History';
    else if (viewName === 'sales-managers') mobileActiveViewTitle.textContent = 'Client List';
    else if (viewName === 'follow-up-desk') mobileActiveViewTitle.textContent = 'Payment Follow-Up';
  }

  dashboardPanel.classList.add('hidden');
  formPanel.classList.add('hidden');
  if (campaignPanel) campaignPanel.classList.add('hidden');
  accountsPanel.classList.add('hidden');
  historyPanel.classList.add('hidden');
  if (accountsReportPanel) accountsReportPanel.classList.add('hidden');
  if (errorCodePanel) errorCodePanel.classList.add('hidden');
  if (navBtnErrorCode) navBtnErrorCode.classList.remove('active');
  const globalDateFilterBar = document.getElementById('globalDateFilterBar');
  if (globalDateFilterBar) {
    globalDateFilterBar.classList.toggle('hidden', viewName === 'error-hub');
  }
  salesManagerPanel.classList.add('hidden');
  if (followUpPanel) followUpPanel.classList.add('hidden');

  const rechargeTabsWrap = document.getElementById('rechargeTabsToolbarWrap');
  if (rechargeTabsWrap) {
    rechargeTabsWrap.classList.toggle('hidden', viewName !== 'add-recharge');
  }

  if (viewName === 'dashboard') {
    dashboardPanel.classList.remove('hidden');
  } else if (viewName === 'add-recharge') {
    formPanel.classList.remove('hidden');
    if (typeof switchRechargeSubTab === 'function') {
      switchRechargeSubTab(state.activeRechargeSubTab || 'form');
    }
    renderRechargeSectionHistory();
  } else if (viewName === 'external-campaign') {
    if (campaignPanel) campaignPanel.classList.remove('hidden');
    if (typeof switchCampaignSubTab === 'function') {
      switchCampaignSubTab(state.activeCampaignSubTab || 'form');
    }
    renderCampaignHistory();
  } else if (viewName === 'billing-queue') {
    accountsPanel.classList.remove('hidden');
    if (state.currentUser?.role === 'support') {
      const kickerEl = document.getElementById('ledgerKickerText');
      if (kickerEl) kickerEl.textContent = '';
      document.getElementById('ledgerHeadingText').textContent = 'Submitted Recharges Status';
      const subEl = document.getElementById('ledgerSubText');
      if (subEl) subEl.textContent = '';
    } else {
      const kickerEl = document.getElementById('ledgerKickerText');
      if (kickerEl) kickerEl.textContent = '';
      document.getElementById('ledgerHeadingText').textContent = 'Billing & Verification Queue';
      const subEl = document.getElementById('ledgerSubText');
      if (subEl) subEl.textContent = '';
    }
    renderRecords();
  } else if (viewName === 'history-ledger') {
    historyPanel.classList.remove('hidden');
    if (state.currentUser?.role === 'support') {
      const kicker = document.querySelector('#historyPanel .kicker-tag span:last-child');
      if (kicker) kicker.textContent = '';
      const heading = document.getElementById('historySectionHeading');
      const desc = document.getElementById('historySectionDesc');
      if (heading) heading.textContent = 'All Recharge Report';
      if (desc) desc.textContent = '';
      if (historySearchInput) historySearchInput.placeholder = 'Search by username, ID, AM...';
      const billingTab = document.querySelector('#historySubTabsGroup [data-htab="billing"]');
      if (billingTab) billingTab.classList.add('hidden');
      state.historySubTab = 'recharge';
      document.querySelectorAll('#historySubTabsGroup .status-pill').forEach((b) => {
        b.classList.toggle('active', b.dataset.htab === 'recharge');
      });
    } else if (state.currentUser?.role === 'accounts') {
      const kicker = document.querySelector('#historyPanel .kicker-tag span:last-child');
      if (kicker) kicker.textContent = '';
      const heading = document.getElementById('historySectionHeading');
      const desc = document.getElementById('historySectionDesc');
      if (heading) heading.textContent = 'Billing History';
      if (desc) desc.textContent = '';
      state.historySubTab = 'billing';
      const billingTab = document.querySelector('#historySubTabsGroup [data-htab="billing"]');
      if (billingTab) billingTab.classList.remove('hidden');
      document.querySelectorAll('#historySubTabsGroup .status-pill').forEach((b) => {
        b.classList.toggle('active', b.dataset.htab === 'billing');
      });
    } else {
      const kicker = document.querySelector('#historyPanel .kicker-tag span:last-child');
      if (kicker) kicker.textContent = '';
      const heading = document.getElementById('historySectionHeading');
      const desc = document.getElementById('historySectionDesc');
      if (heading) heading.textContent = 'Recharge & Billing History';
      if (desc) desc.textContent = '';
      const billingTab = document.querySelector('#historySubTabsGroup [data-htab="billing"]');
      if (billingTab) billingTab.classList.remove('hidden');
    }
    renderHistoryTable();
  } else if (viewName === 'accounts-report') {
    if (accountsReportPanel) accountsReportPanel.classList.remove('hidden');
    renderAccountsReport();
  } else if (viewName === 'sales-managers') {
    salesManagerPanel.classList.remove('hidden');
    renderSalesManagersSection();
  } else if (viewName === 'follow-up-desk') {
    if (followUpPanel) followUpPanel.classList.remove('hidden');
    renderFollowUpDesk();
  } else if (viewName === 'error-hub') {
    if (errorCodePanel) errorCodePanel.classList.remove('hidden');
    if (mobileActiveViewTitle) mobileActiveViewTitle.textContent = 'Error Code Hub';
    if (typeof window.initErrorCodeHub === 'function') {
      window.initErrorCodeHub();
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.querySelectorAll('.side-nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    selectWorkspaceView(btn.dataset.nav);
  });
});

document.querySelectorAll('.mob-nav-btn[data-nav]').forEach((btn) => {
  btn.addEventListener('click', () => {
    selectWorkspaceView(btn.dataset.nav);
  });
});

// =========================================================================
// GLOBAL DATE FILTER (ALL DATES, TODAY, YESTERDAY, CALENDAR SELECT)
// =========================================================================
const dateQuickPills = document.getElementById('dateQuickPills');
const dateFilterFrom = document.getElementById('dateFilterFrom');
const dateFilterTo = document.getElementById('dateFilterTo');
const clearDateFilterBtn = document.getElementById('clearDateFilterBtn');
const activeDateFilterSummary = document.getElementById('activeDateFilterSummary');
const dashTableTabGroup = document.getElementById('dashTableTabGroup');
const dashboardQuickTableBody = document.getElementById('dashboardQuickTableBody');

function getLocalDateYYYYMMDD(d) {
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${da}`;
}

function itemMatchesDateFilter(item) {
  const mode = state.dateFilterMode;
  if (!mode || mode === 'all') return true;
  if (!item.createdAt) return false;

  const itemDateStr = getLocalDateYYYYMMDD(new Date(item.createdAt));
  const now = new Date();
  const todayStr = getLocalDateYYYYMMDD(now);
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  const yesterdayStr = getLocalDateYYYYMMDD(yest);

  if (mode === 'today') {
    return itemDateStr === todayStr;
  }
  if (mode === 'yesterday') {
    return itemDateStr === yesterdayStr;
  }
  if (mode === 'custom') {
    const f = state.dateFilterFrom;
    const t = state.dateFilterTo;
    if (f && t) return itemDateStr >= f && itemDateStr <= t;
    if (f) return itemDateStr === f;
    if (t) return itemDateStr === t;
  }
  return true;
}

function getDateFilteredRecharges() {
  return state.recharges.filter(itemMatchesDateFilter);
}

function buildDateQuerySuffix() {
  const params = new URLSearchParams();
  if (state.dateFilterMode && state.dateFilterMode !== 'all') {
    params.set('dmode', state.dateFilterMode);
    if (state.dateFilterFrom) params.set('from', state.dateFilterFrom);
    if (state.dateFilterTo) params.set('to', state.dateFilterTo);
  }
  const s = params.toString();
  return s ? `&${s}` : '';
}

function refreshAllViewsAfterDateChange() {
  document.querySelectorAll('#dateQuickPills .date-pill').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.dateMode === state.dateFilterMode);
  });

  const dateCalendarInputs = document.getElementById('dateCalendarInputs');
  if (dateCalendarInputs) {
    dateCalendarInputs.classList.toggle('hidden', state.dateFilterMode !== 'custom');
  }

  if (clearDateFilterBtn) {
    clearDateFilterBtn.classList.toggle('hidden', state.dateFilterMode === 'all');
  }

  updateDashboardStats();
  renderDashboardQuickTable();
  renderRechargeSectionHistory();
  renderRecords();
  renderHistoryTable();
  renderSalesManagersSection();
}

if (dateQuickPills) {
  dateQuickPills.addEventListener('click', (e) => {
    const btn = e.target.closest('.date-pill');
    if (!btn) return;
    const mode = btn.dataset.dateMode;
    state.dateFilterMode = mode;

    const now = new Date();
    const todayStr = getLocalDateYYYYMMDD(now);
    const yest = new Date(now);
    yest.setDate(now.getDate() - 1);
    const yesterdayStr = getLocalDateYYYYMMDD(yest);

    if (mode === 'all') {
      state.dateFilterFrom = '';
      state.dateFilterTo = '';
      if (dateFilterFrom) dateFilterFrom.value = '';
      if (dateFilterTo) dateFilterTo.value = '';
    } else if (mode === 'today') {
      state.dateFilterFrom = todayStr;
      state.dateFilterTo = todayStr;
      if (dateFilterFrom) dateFilterFrom.value = todayStr;
      if (dateFilterTo) dateFilterTo.value = todayStr;
    } else if (mode === 'yesterday') {
      state.dateFilterFrom = yesterdayStr;
      state.dateFilterTo = yesterdayStr;
      if (dateFilterFrom) dateFilterFrom.value = yesterdayStr;
      if (dateFilterTo) dateFilterTo.value = yesterdayStr;
    } else if (mode === 'custom') {
      if (dateFilterFrom) dateFilterFrom.focus();
    }

    refreshAllViewsAfterDateChange();
  });
}

if (dateFilterFrom) {
  dateFilterFrom.addEventListener('change', (e) => {
    state.dateFilterFrom = e.target.value;
    state.dateFilterMode = 'custom';
    refreshAllViewsAfterDateChange();
  });
}

if (dateFilterTo) {
  dateFilterTo.addEventListener('change', (e) => {
    state.dateFilterTo = e.target.value;
    state.dateFilterMode = 'custom';
    refreshAllViewsAfterDateChange();
  });
}

if (clearDateFilterBtn) {
  clearDateFilterBtn.addEventListener('click', () => {
    state.dateFilterMode = 'all';
    state.dateFilterFrom = '';
    state.dateFilterTo = '';
    if (dateFilterFrom) dateFilterFrom.value = '';
    if (dateFilterTo) dateFilterTo.value = '';
    refreshAllViewsAfterDateChange();
  });
}

// =========================================================================
// FETCH DATA & RENDER EXECUTIVE DASHBOARD
// =========================================================================
let prevPendingIds = new Set();
let isFirstFetch = true;

function playAlertChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // Tone 1: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Tone 2: A5 (880 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.15, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.55);
  } catch (e) {}
}

window.showNewRechargePopup = function(item) {
  if (!item) return;
  const popup = document.getElementById('newRechargeAlertPopup');
  if (!popup) return;

  const idEl = document.getElementById('alertPopupRechargeId');
  if (idEl) idEl.textContent = item.id || '';

  const chanEl = document.getElementById('alertPopupChannel');
  if (chanEl) chanEl.textContent = item.service || 'SMS';

  const compEl = document.getElementById('alertPopupCompany');
  if (compEl) compEl.textContent = item.billingCompany || 'Immense Air';

  const clientEl = document.getElementById('alertPopupClient');
  if (clientEl) clientEl.textContent = item.clientName ? `${item.username} · ${item.clientName}` : (item.username || '');

  const credEl = document.getElementById('alertPopupCredits');
  if (credEl) credEl.textContent = formatNumberIN(item.rechargeCount || 0);

  const amtEl = document.getElementById('alertPopupAmount');
  if (amtEl) amtEl.textContent = formatCurrencyIN(item.totalAmount || 0);

  const subInfoEl = document.getElementById('alertPopupSubInfo');
  if (subInfoEl) {
    subInfoEl.textContent = `Submitted by Support · AM: ${item.accountManager || 'N/A'}`;
  }

  // Wire Acknowledge Button
  const ackBtn = document.getElementById('alertPopupAcknowledgeBtn');
  if (ackBtn) {
    ackBtn.disabled = false;
    ackBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Acknowledge Now</span>
    `;
    ackBtn.onclick = async () => {
      ackBtn.disabled = true;
      ackBtn.innerHTML = `<span>Saving...</span>`;
      await quickAcknowledgeRecharge(item.id);
      showToast(`✓ Acknowledged ${item.id} - Marked Seen by Billing!`);
      closeNewRechargeAlertPopup();
    };
  }

  // Wire View & Raise Bill Button
  const viewBtn = document.getElementById('alertPopupViewBtn');
  if (viewBtn) {
    viewBtn.onclick = () => {
      closeNewRechargeAlertPopup();
      selectWorkspaceView('billing-queue');
      openEditModal(item.id);
    };
  }

  popup.classList.remove('hidden');

  // Play audio chime
  playAlertChime();
};

window.closeNewRechargeAlertPopup = function() {
  const popup = document.getElementById('newRechargeAlertPopup');
  if (popup) {
    popup.classList.add('hidden');
  }
};

function showDesktopPushNotification(item) {
  try {
    if (window.Notification && Notification.permission === 'granted') {
      const title = `🔔 New Recharge: ${item.id} (${item.username})`;
      const options = {
        body: `${formatNumberIN(item.rechargeCount || 0)} Credits (${item.service || 'SMS'}) · ₹${formatNumberIN(item.totalAmount || 0)}\nClick to review & acknowledge now!`,
        icon: '/favicon.ico',
        tag: `recharge-${item.id}`,
        renotify: true
      };
      const notif = new Notification(title, options);
      notif.onclick = () => {
        window.focus();
        showNewRechargePopup(item);
        notif.close();
      };
    } else if (window.Notification && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  } catch (e) {
    console.warn('Push notification failed', e);
  }
}

async function fetchAllData() {
  try {
    const res = await fetch('/api/recharges');
    const data = await res.json();
    state.recharges = data.recharges || [];
    if (data.settings) {
      state.settings = data.settings;
    }

    // Real-Time Live Alert Detection: Support logged a new recharge
    const currentPending = (data.recharges || []).filter((r) => r.billingStatus === 'Pending');
    const currentPendingIds = new Set(currentPending.map((r) => r.id));

    const isAccountsRole = state.currentUser?.role === 'accounts';
    const isAdminRole = state.currentUser?.role === 'admin';
    if (!isFirstFetch && (isAccountsRole || isAdminRole)) {
      const newlyAdded = currentPending.filter((r) => !prevPendingIds.has(r.id));
      if (newlyAdded.length > 0) {
        const topItem = newlyAdded[0];
        showNewRechargePopup(topItem);
        showDesktopPushNotification(topItem);
        showToast(`⚡ New Recharge Logged by Support: ${topItem.id} (${topItem.username})`);
      }
    }
    prevPendingIds = currentPendingIds;
    isFirstFetch = false;

    populateAccountManagers();
      populateCompanies();
    updateDashboardStats();
    renderDashboardQuickTable();
    renderRechargeSectionHistory();
    renderRecords();
    renderHistoryTable();
    renderSalesManagersSection();
    if (state.activeView === 'accounts-report') {
      renderAccountsReport();
    }

    try {
      const cRes = await fetch('/api/campaigns');
      if (cRes.ok) {
        const cData = await cRes.json();
        state.campaigns = cData.campaigns || [];
        updateCampaignBadge();
        renderCampaignHistory();
      }
    } catch (e) {}
  } catch (err) {
    showToast('Unable to reach server. Retrying...');
  }
}

function getCompanyClass(bCompany) {
  const c = (bCompany || '').toLowerCase();
  if (c.includes('air')) return 'company-pill--air';
  if (c.includes('smart')) return 'company-pill--smart';
  if (c.includes('zion')) return 'company-pill--zion';
  return 'company-pill--custom';
}

function populateCompanies() {
  const defaultCompanies = ['Immense Air', 'Immense Smart Solution', 'Zion'];
  const companies = (state.settings && Array.isArray(state.settings.companies) && state.settings.companies.length > 0)
    ? state.settings.companies
    : defaultCompanies;

  // 1. Populate #editBillingCompany in Raise Bill Modal
  const editSelect = document.getElementById('editBillingCompany');
  if (editSelect) {
    const curVal = editSelect.value;
    editSelect.innerHTML = companies.map((c) => `<option value="${c}">${c}</option>`).join('');
    if (curVal && companies.includes(curVal)) {
      editSelect.value = curVal;
    } else if (companies.length > 0) {
      editSelect.value = companies[0];
    }
  }

  // 2. Populate #repFilterEntity in Account History Report Filter
  const repSelect = document.getElementById('repFilterEntity');
  if (repSelect) {
    const curVal = repSelect.value || 'ALL';
    repSelect.innerHTML =
      `<option value="ALL">All Companies</option>` +
      companies.map((c) => `<option value="${c}">${c}</option>`).join('');
    if (curVal && (curVal === 'ALL' || companies.includes(curVal))) {
      repSelect.value = curVal;
    } else {
      repSelect.value = 'ALL';
    }
  }
}

function populateAccountManagers() {
  const managers = state.settings.accountManagers || [];
  const currentVal = accountManagerSelect.value;
  accountManagerSelect.innerHTML =
    `<option value="">Select Account Manager</option>` +
    managers.map((m) => `<option value="${m}">${m}</option>`).join('');
  if (currentVal && managers.includes(currentVal)) {
    accountManagerSelect.value = currentVal;
  } else if (managers.length > 0 && !currentVal) {
    accountManagerSelect.value = managers[0];
  }

  const editAmSelect = document.getElementById('editAccountManager');
  editAmSelect.innerHTML = managers.map((m) => `<option value="${m}">${m}</option>`).join('');

  const campAmSelect = document.getElementById('campaignAccountManager');
  if (campAmSelect) {
    campAmSelect.innerHTML =
      `<option value="">Select Account Manager</option>` +
      managers.map((m) => `<option value="${m}">${m}</option>`).join('');
    if (managers.length > 0) campAmSelect.value = managers[0];
  }

  const currentFilterAm = filterManager.value;
  filterManager.innerHTML =
    `<option value="ALL">All Account Managers</option>` +
    managers.map((m) => `<option value="${m}">${m}</option>`).join('');
  if (currentFilterAm) filterManager.value = currentFilterAm;
}

function updateDashboardStats() {
  const list = getDateFilteredRecharges();
  const pending = list.filter((r) => r.billingStatus === 'Pending');
  const raised = list.filter((r) => r.billingStatus === 'Billing Raised');
  const hold = list.filter((r) => r.billingStatus === 'On Hold');
  const cancelled = list.filter((r) => r.billingStatus === 'Cancelled');

  const pendingAmt = pending.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);
  const raisedAmt = raised.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);
  const holdAmt = hold.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);
  const totalAmt = list.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  // Total Payment Received calculation across all records
  let paymentReceivedAmt = 0;
  let paymentReceivedCount = 0;
  let partialCount = 0;

  list.forEach((r) => {
    const rawP = String(r.paymentStatus || '').toLowerCase();
    const isPaid = rawP.includes('received') || rawP === 'paid';
    const isPartial = rawP.includes('partial');

    if (isPaid) {
      const amt = Number(r.paidAmount) || Number(r.totalAmount) || 0;
      paymentReceivedAmt += amt;
      paymentReceivedCount++;
    } else if (isPartial) {
      const amt = Number(r.paidAmount) || 0;
      paymentReceivedAmt += amt;
      partialCount++;
    }
  });

  // 1st Card: TOTAL RECHARGES
  const elTotalCount = document.getElementById('statTotalCount');
  if (elTotalCount) elTotalCount.textContent = list.length;
  const elTotalSub = document.getElementById('statTotalVolumeSub');
  if (elTotalSub) elTotalSub.textContent = `Total Value: ${formatCurrencyIN(totalAmt)}`;

  // 2nd Card: BILLING RAISED
  const elRaisedCount = document.getElementById('statRaisedCount');
  if (elRaisedCount) elRaisedCount.textContent = raised.length;
  const elRaisedAmount = document.getElementById('statRaisedAmount');
  if (elRaisedAmount) elRaisedAmount.textContent = `${formatCurrencyIN(raisedAmt)} invoiced`;

  // 3rd Card: OUTSTANDING AMOUNT
  const elPendingAmtBig = document.getElementById('statPendingAmountBig');
  if (elPendingAmtBig) elPendingAmtBig.textContent = formatCurrencyIN(pendingAmt);
  const elPendingSub = document.getElementById('statPendingSub');
  if (elPendingSub) elPendingSub.textContent = `${pending.length} recharges pending`;
  const elOldPendingCount = document.getElementById('statPendingCount');
  if (elOldPendingCount) elOldPendingCount.textContent = pending.length;
  const elOldPendingAmt = document.getElementById('statPendingAmount');
  if (elOldPendingAmt) elOldPendingAmt.textContent = `${formatCurrencyIN(pendingAmt)} outstanding`;

  // 4th Card: PAYMENT RECEIVED AMOUNT
  const elPayVal = document.getElementById('statPaymentReceivedVal');
  if (elPayVal) elPayVal.textContent = formatCurrencyIN(paymentReceivedAmt);
  const elPaySub = document.getElementById('statPaymentReceivedSub');
  if (elPaySub) {
    const totalColl = paymentReceivedCount + partialCount;
    elPaySub.textContent = totalColl > 0 
      ? `${totalColl} collection${totalColl > 1 ? 's' : ''} received` 
      : 'No collections yet';
  }

  // Update Dynamic Eye Link Parameters with Active Date Filters
  const dq = buildDateQuerySuffix();
  const eyeTotal = document.getElementById('eyeLinkTotal');
  if (eyeTotal) eyeTotal.href = `details.html?type=all${dq}`;
  const eyeRaised = document.getElementById('eyeLinkRaised');
  if (eyeRaised) eyeRaised.href = `details.html?type=raised${dq}`;
  const eyePending = document.getElementById('eyeLinkPending');
  if (eyePending) eyePending.href = `details.html?type=pending${dq}`;
  const eyePayment = document.getElementById('eyeLinkPayment');
  if (eyePayment) eyePayment.href = `details.html?type=raised${dq}`;

  document.getElementById('opt2PendingBadge').textContent = pending.length;
  const opt3Badge = document.getElementById('opt3HistoryBadge');
  if (opt3Badge) {
    opt3Badge.textContent = state.currentUser?.role === 'accounts' ? raised.length : list.length;
  }
  const mobOpt2Badge = document.getElementById('mobOpt2Badge');
  if (mobOpt2Badge) mobOpt2Badge.textContent = pending.length;
  const uniqueClientsCount = new Set((state.recharges || []).filter(r => r.accountManager !== 'Yash Sharma').map((r) => (r.username || '').toLowerCase()).filter(Boolean)).size;
  const opt4BadgeEl = document.getElementById('opt4ManagersBadge');
  if (opt4BadgeEl) {
    opt4BadgeEl.textContent = uniqueClientsCount;
    opt4BadgeEl.title = `${uniqueClientsCount} Clients Mapped`;
  }
  const dashClientBadge = document.getElementById('dashClientCountBadge');
  if (dashClientBadge) dashClientBadge.textContent = `${uniqueClientsCount} Clients Mapped`;

  document.getElementById('countAll').textContent = list.length;
  document.getElementById('countPending').textContent = pending.length;
  document.getElementById('countRaised').textContent = raised.length;
  document.getElementById('countHold').textContent = hold.length;
  const countCancelledEl = document.getElementById('countCancelled');
  if (countCancelledEl) countCancelledEl.textContent = cancelled.length;

  // Follow-Up Requests count & banner (Admin & Accounts only)
  const followUpPending = list.filter((r) => r.followUpStatus === 'Requested');
  const countFollowUpEl = document.getElementById('countFollowUp');
  if (countFollowUpEl) countFollowUpEl.textContent = followUpPending.length;

  // Update Mobile Status Dropdown option labels with real-time counts & role terminology
  const mobStatusSel = document.getElementById('mobileStatusSelect');
  if (mobStatusSel) {
    const isSupport = state.currentUser?.role === 'support';
    const pendingLabel = isSupport ? 'Bill Not Raised' : 'Pending Verification';
    const raisedLabel = isSupport ? 'Bill Raised' : 'Billing Invoiced';

    const optAll = mobStatusSel.querySelector('option[value="ALL"]');
    if (optAll) optAll.textContent = `Status: All Records (${list.length})`;
    const optPending = mobStatusSel.querySelector('option[value="Pending"]');
    if (optPending) optPending.textContent = `Status: ${pendingLabel} (${pending.length})`;
    const optRaised = mobStatusSel.querySelector('option[value="Billing Raised"]');
    if (optRaised) optRaised.textContent = `Status: ${raisedLabel} (${raised.length})`;
    const optHold = mobStatusSel.querySelector('option[value="On Hold"]');
    if (optHold) optHold.textContent = `Status: On Hold (${hold.length})`;
    const optCancel = mobStatusSel.querySelector('option[value="Cancelled"]');
    if (optCancel) optCancel.textContent = `Status: Cancelled (${cancelled.length})`;
    const optFollow = mobStatusSel.querySelector('option[value="FollowUp"]');
    if (optFollow) optFollow.textContent = `🔔 Follow-Up Requests (${followUpPending.length})`;
  }

  const followUpBanner = document.getElementById('billingFollowUpAlertBanner');
  const isAccounts = state.currentUser?.role === 'accounts';
  if (followUpBanner) {
    if (isAccounts && followUpPending.length > 0) {
      followUpBanner.classList.remove('hidden');
      const alertText = document.getElementById('billingFollowUpAlertText');
      if (alertText) alertText.textContent = `Admin has requested payment follow-up for ${followUpPending.length} client recharge(s)! Please update with supporting proof.`;
    } else {
      followUpBanner.classList.add('hidden');
    }
  }

  // Update Date Filter Summary Label
  if (activeDateFilterSummary) {
    let label = 'All Dates';
    if (state.dateFilterMode === 'today') label = 'Today';
    else if (state.dateFilterMode === 'yesterday') label = 'Yesterday';
    else if (state.dateFilterMode === 'custom') {
      if (state.dateFilterFrom && state.dateFilterTo && state.dateFilterFrom !== state.dateFilterTo) {
        label = `${state.dateFilterFrom} to ${state.dateFilterTo}`;
      } else {
        label = state.dateFilterFrom || state.dateFilterTo || 'Custom Date';
      }
    }
    activeDateFilterSummary.textContent = `Showing: ${label} (${list.length} records)`;
  }

  // Real-Time Blinking Alert Logic strictly for Accounts Role (Admin does NOT see live alerts)
  const isAccountsRole = state.currentUser?.role === 'accounts';
  const opt2Badge = document.getElementById('opt2PendingBadge');
  const kpiCardPending = document.getElementById('kpiCardPending');
  const billingAlertBanner = document.getElementById('billingLiveAlertBanner');
  const dashboardAlertBanner = document.getElementById('dashboardLiveAlertBanner');
  const billingAlertText = document.getElementById('billingLiveAlertText');
  const dashboardAlertText = document.getElementById('dashboardLiveAlertText');

  const unackPending = pending.filter((r) => !r.acknowledged);

  if (isAccountsRole && unackPending.length > 0) {
    // TRIGGER BLINKING & PULSING ON BILLING QUEUE (NEW ENTRIES NOT YET SEEN)
    if (opt2Badge) opt2Badge.classList.add('blink-pulse-badge');
    if (mobOpt2Badge) mobOpt2Badge.classList.add('blink-pulse-badge');

    const topItem = unackPending[0];
    const alertMsg = `${unackPending.length} New Unacknowledged Recharge${unackPending.length > 1 ? 's' : ''} Pending Review! Latest: ${topItem.id} (${topItem.username} · ${formatNumberIN(topItem.rechargeCount)} Credits)`;

    if (billingAlertBanner) {
      billingAlertBanner.classList.remove('hidden');
      if (billingAlertText) billingAlertText.textContent = alertMsg;
    }
  } else {
    // CLEAR BLINKING ONCE ALL PENDING HAVE BEEN ACKNOWLEDGED / SEEN OR FOR ADMIN
    if (opt2Badge) opt2Badge.classList.remove('blink-pulse-badge');
    if (mobOpt2Badge) mobOpt2Badge.classList.remove('blink-pulse-badge');
    if (kpiCardPending) kpiCardPending.classList.remove('blink-pulse-card');
    if (billingAlertBanner) billingAlertBanner.classList.add('hidden');
    if (dashboardAlertBanner) dashboardAlertBanner.classList.add('hidden');
  }
  // Admin dashboard never shows live alert banner
  if (state.currentUser?.role === 'admin' && dashboardAlertBanner) {
    dashboardAlertBanner.classList.add('hidden');
  }

  // Real-Time Payment Call Reminders for Accounts / Billing Desk
  updatePaymentCallRemindersUI();
}

// =========================================================================
// DASHBOARD QUICK TABLE (BILLING RAISED & RECHARGE WITH EYE NEW-TAB OPTION)
// =========================================================================
function renderDashboardQuickTable() {
  if (!dashboardQuickTableBody) return;
  const dateFiltered = getDateFilteredRecharges();
  const filtered = dateFiltered.filter((item) => {
    if (state.dashQuickTab === 'ALL') return true;
    return item.billingStatus === state.dashQuickTab;
  });

  if (filtered.length === 0) {
    dashboardQuickTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:26px;color:var(--ink-muted);">No records found for selected date/filter.</td></tr>`;
    return;
  }

  const isAdmin = state.currentUser?.role === 'admin';
  const isSupportRole = state.currentUser?.role === 'support';

  dashboardQuickTableBody.innerHTML = filtered
    .map((item) => {
      const isPending = item.billingStatus === 'Pending';
      const isRaised = item.billingStatus === 'Billing Raised';
      const isHold = item.billingStatus === 'On Hold';
      const isCancelled = item.billingStatus === 'Cancelled';

      const signalClass = isRaised
        ? 'signal--green'
        : isHold
        ? 'signal--red'
        : isCancelled
        ? 'signal--cancelled'
        : 'signal--yellow';

      const signalLabel = isRaised
        ? 'Bill Raised'
        : isHold
        ? 'On Hold'
        : isCancelled
        ? 'Cancelled'
        : 'Bill Not Raised';

      const billingSignalHtml = `
        <span class="billing-signal-tag ${signalClass}" title="Live Status: ${signalLabel}">
          <span class="signal-indicator-dot"></span>
          <span>${signalLabel}</span>
        </span>
      `;

      const userInitial = (item.username || 'U').trim().charAt(0).toUpperCase();

      return `
        <tr>
          <td data-label="Recharge ID & Date">
            <div class="mob-cell-id-date">
              <div class="tbl-id-text" style="font-weight:700;color:var(--navy);font-size:13.5px;">${item.id}</div>
              <div class="tbl-date-text tnum" style="font-size:11.5px;color:#64748b;">${formatDateTime(item.createdAt)}</div>
            </div>
          </td>
          <td data-label="Username & Client">
            <div class="mob-cell-align-right">
              <div class="tbl-user-cell">
                <div class="user-avatar-badge">${userInitial}</div>
                <div class="tbl-user-meta">
                  <span class="tbl-username">${item.username}</span>
                  ${item.clientName ? `<span class="tbl-company">${item.clientName}</span>` : `<span class="tbl-company-muted">Client Account</span>`}
                </div>
              </div>
            </div>
          </td>
          <td data-label="Channel & Credits">
            <div class="mob-cell-align-right">
              <div class="channel-pills-row mob-cell-pill-row" style="margin-bottom:3px;">
                ${getServiceChannelPillsHtml(item.service)}
              </div>
              <div class="tbl-credits-text tnum" style="font-weight:700;color:var(--navy);font-size:13px;">
                ${formatNumberIN(item.rechargeCount)} <small style="font-size:11.5px;color:#64748b;font-weight:500;">Credits</small>
              </div>
            </div>
          </td>
          <td data-label="Sales / AM">
            <div class="mob-cell-align-right">
              <div class="tbl-am-name" style="font-weight:600;color:var(--navy);font-size:13px;">${item.accountManager || 'Direct'}</div>
              <div class="tbl-source-badge" style="font-size:11px;color:#64748b;">${item.source || 'WhatsApp'}</div>
            </div>
          </td>
          <td data-label="Billing Status">
            <div class="mob-cell-align-right" style="gap:4px;">
              ${billingSignalHtml}
              ${!isSupportRole && isRaised ? `
                <span class="payment-pill ${
                  (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? 'payment-pill--paid' :
                  (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? 'payment-pill--partial' : 'payment-pill--unpaid'
                }">
                  ${
                    (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? '✓ Paid' :
                    (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? `💰 ₹${formatNumberIN(item.paidAmount || 0)}` : '⏳ Unpaid'
                  }
                </span>
              ` : ''}
              ${!isSupportRole && item.followUpStatus === 'Requested' ? `
                <span class="status-subtag status-subtag--followup" title="Admin requested payment follow-up">🔔 Follow-Up Req</span>
              ` : (!isSupportRole && item.followUpStatus === 'Updated') ? `
                <span class="status-subtag status-subtag--done" title="Billing updated follow-up with supporting proof">✓ Follow-Up Done</span>
              ` : ''}
              ${(!isSupportRole && item.followUpNextDate && item.followUpNextDate <= getLocalDateYYYYMMDD(new Date()) && item.paymentStatus !== 'Received' && item.paymentStatus !== 'Payment Received' && item.followUpStatus !== 'Resolved') ? `
                <span class="status-subtag reminder-date-pill--today" onclick="openPaymentRemindersModal()" style="cursor:pointer;" title="Payment Call Scheduled Today: Click to view details">📞 Call Due Today (${item.followUpNextDate})</span>
              ` : ''}
            </div>
          </td>
          <td data-label="Invoice No." class="tnum">
            <div class="mob-cell-align-right">
              ${item.invoiceNumber ? `<span class="invoice-pill">INV: ${item.invoiceNumber}</span>` : '<span class="tbl-dash">—</span>'}
            </div>
          </td>
          <td data-label="Actions" style="text-align:right;">
            <div class="mob-cell-action-row tbl-actions">
              <button type="button" class="tbl-btn tbl-btn--edit" onclick="openEditModal('${item.id}')" title="Edit Recharge Entry">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <span>Edit</span>
              </button>
              ${isAdmin && !isCancelled ? `
                <button type="button" class="tbl-btn tbl-btn--followup" onclick="openQuickAdminFollowUp('${item.id}')" title="Request Payment Follow-Up from Billing Desk">
                  <span>📞 Follow-Up</span>
                </button>
              ` : ''}
              <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="tbl-btn tbl-btn--view" title="Open Full Recharge & Billing Details in New Tab">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>View ↗</span>
              </a>
              ${isAdmin ? `
                <button type="button" class="tbl-btn tbl-btn--delete" onclick="deleteRechargeEntry('${item.id}', '${item.username}')" title="Delete Recharge ${item.id}">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

window.setDashboardQuickTab = function(tabValue) {
  state.dashQuickTab = tabValue;
  if (dashTableTabGroup) {
    dashTableTabGroup.querySelectorAll('.status-pill').forEach((b) => {
      b.classList.toggle('active', b.dataset.dashtab === state.dashQuickTab);
    });
  }
  renderDashboardQuickTable();
};

if (dashTableTabGroup) {
  dashTableTabGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('.status-pill');
    if (!btn) return;
    setDashboardQuickTab(btn.dataset.dashtab);
  });
}

// =========================================================================
// OPTION 2: BILLING QUEUE CARDS (WITH EYE BUTTON FOR NEW TAB DETAILS)
// =========================================================================
function getChannelIconSvg(serviceName) {
  const s = String(serviceName || '').toLowerCase();
  if (s.includes('whatsapp')) {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" style="flex-shrink:0;"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.39 1.28-1.93 1.35-.49.07-1.13.1-3.27-.79-2.74-1.14-4.52-3.92-4.66-4.1-.14-.19-1.12-1.49-1.12-2.84 0-1.35.71-2.02.96-2.29.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4.06.61.56.24.57.82 2 .89 2.15.07.15.12.33.02.53-.1.19-.15.31-.3.48-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.17 1.04 2.15 1.37 2.46 1.52.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.11 1.78.84 2.09.99.31.15.52.23.6.36.08.14.08.79-.16 1.47z"/></svg>`;
  } else if (s.includes('rcs')) {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="#1A73E8" style="flex-shrink:0;"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/><circle cx="8" cy="11" r="1.5" fill="#fff"/><circle cx="12" cy="11" r="1.5" fill="#fff"/><circle cx="16" cy="11" r="1.5" fill="#fff"/></svg>`;
  } else if (s.includes('sms')) {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="#0284C7" style="flex-shrink:0;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
  } else if (s.includes('obd')) {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="#EA580C" style="flex-shrink:0;"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23" stroke="#EA580C" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="#EA580C" stroke-width="2"/></svg>`;
  } else if (s.includes('ivr')) {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="#6366F1" style="flex-shrink:0;"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#6366F1" stroke-width="2"/><circle cx="8" cy="8" r="1.2" fill="#6366F1"/><circle cx="12" cy="8" r="1.2" fill="#6366F1"/><circle cx="16" cy="8" r="1.2" fill="#6366F1"/><circle cx="8" cy="12" r="1.2" fill="#6366F1"/><circle cx="12" cy="12" r="1.2" fill="#6366F1"/><circle cx="16" cy="12" r="1.2" fill="#6366F1"/><circle cx="8" cy="16" r="1.2" fill="#6366F1"/><circle cx="12" cy="16" r="1.2" fill="#6366F1"/><circle cx="16" cy="16" r="1.2" fill="#6366F1"/></svg>`;
  } else {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="#475569" style="flex-shrink:0;"><rect x="2" y="3" width="20" height="7" rx="2" fill="none" stroke="#475569" stroke-width="2"/><rect x="2" y="14" width="20" height="7" rx="2" fill="none" stroke="#475569" stroke-width="2"/><circle cx="6" cy="6.5" r="1" fill="#475569"/><circle cx="6" cy="17.5" r="1" fill="#475569"/></svg>`;
  }
}

function getServiceChannelPillsHtml(serviceStr) {
  if (!serviceStr) return '';
  const parts = serviceStr.split('+').map(s => s.trim()).filter(Boolean);
  return parts.map(p => {
    const icon = getChannelIconSvg(p);
    return `<span class="official-channel-pill">${icon}<span>${p}</span></span>`;
  }).join(' ');
}

function renderRecords() {
  if (!state.currentUser) return;
  const q = state.searchQuery.toLowerCase().trim();
  const isSupportRole = state.currentUser.role === 'support';

  const dateFiltered = getDateFilteredRecharges();
  const filtered = dateFiltered.filter((item) => {
    if (state.filterStatus === 'FollowUp') {
      if (item.followUpStatus !== 'Requested' && item.followUpStatus !== 'Updated') return false;
    } else if (state.filterStatus !== 'ALL' && item.billingStatus !== state.filterStatus) {
      return false;
    }
    if (state.filterService !== 'ALL' && item.service !== state.filterService) return false;
    if (state.filterManager !== 'ALL' && item.accountManager !== state.filterManager) return false;
    if (q) {
      const hay = `${item.id} ${item.username} ${item.clientName} ${item.accountManager} ${item.invoiceNumber} ${item.remarks} ${item.followUpAdminRemark || ''} ${item.followUpBillingRemark || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    recordsList.innerHTML = `
      <div class="empty-state">
        <h3>No matching recharge records</h3>
        <p>Adjust your date filter / search above or log a new client recharge.</p>
      </div>
    `;
    return;
  }

  recordsList.innerHTML = filtered
    .map((item) => {
      const isPending = item.billingStatus === 'Pending';
      const isRaised = item.billingStatus === 'Billing Raised';
      const isHold = item.billingStatus === 'On Hold';
      const isCancelled = item.billingStatus === 'Cancelled';

      const isUnack = isPending && !item.acknowledged;

      const isAccounts = state.currentUser?.role === 'accounts';
      const cardClass = isRaised
        ? 'record-card--raised'
        : isHold
        ? 'record-card--hold'
        : isCancelled
        ? 'record-card--cancelled'
        : (isAccounts && isUnack
          ? 'record-card--pending record-card--pending-alert'
          : 'record-card--pending');

      // SINGLE GREEN / YELLOW / RED / CANCELLED INDICATOR TAG
      const signalClass = isRaised
        ? 'signal--green'
        : isHold
        ? 'signal--red'
        : isCancelled
        ? 'signal--cancelled'
        : 'signal--yellow';

      const signalLabel = isRaised
        ? 'Bill Raised'
        : isHold
        ? 'On Hold'
        : isCancelled
        ? 'Cancelled'
        : 'Bill Not Raised';

      const billingSignalHtml = `
        <span class="billing-signal-tag ${signalClass}" title="Live Billing Status: ${signalLabel}">
          <span class="signal-indicator-dot"></span>
          <span>${signalLabel}</span>
        </span>
      `;

      // ACKNOWLEDGEMENT STATUS CHIP (Only Accounts role needs live alert chips)
      let liveAlertChip = '';
      if (isAccounts) {
        if (isUnack) {
          liveAlertChip = `<span class="live-pending-blink-chip"><span class="signal-indicator-dot" style="background:#EF4444;box-shadow:0 0 0 2px rgba(239,68,68,0.25);"></span><span>ACTION REQUIRED</span></span>`;
        } else if (item.acknowledged && isPending) {
          liveAlertChip = `<span class="ack-seen-pill" title="Seen & acknowledged by ${item.acknowledgedBy || 'Accounts'} on ${formatDateTime(item.acknowledgedAt)}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Seen by Accounts · ${formatDateTime(item.acknowledgedAt)}</span></span>`;
        }
      } else if (state.currentUser?.role === 'admin') {
        if (item.acknowledged && isPending) {
          liveAlertChip = `<span class="ack-seen-pill" title="Seen & acknowledged by ${item.acknowledgedBy || 'Accounts'} on ${formatDateTime(item.acknowledgedAt)}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Seen by Accounts</span></span>`;
        }
      } else {
        // Support role view: See if Accounts has reviewed/acknowledged their submission
        if (item.acknowledged) {
          liveAlertChip = `<span class="ack-seen-pill ack-seen-pill--support" title="Seen & acknowledged by Billing on ${formatDateTime(item.acknowledgedAt)}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Seen by Billing</span></span>`;
        } else if (isPending) {
          liveAlertChip = `<span class="ack-waiting-pill"><span class="signal-indicator-dot" style="background:#F59E0B;"></span><span>Waiting for Billing Review</span></span>`;
        }
      }

      const proofHtml = item.screenshotUrl
        ? `
          <div class="proof-compact-box">
            <img src="${item.screenshotUrl}" alt="Proof" class="proof-compact-thumb" onclick="openImageViewer('${item.screenshotUrl}', '${item.id} · ${item.username}')" title="Click to view full screenshot" />
            <div class="proof-compact-links">
              <button type="button" class="proof-compact-btn" onclick="openImageViewer('${item.screenshotUrl}', '${item.id} · ${item.username}')" title="View Full Proof">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>View</span>
              </button>
              <a href="${item.screenshotUrl}?download=1" class="proof-compact-btn" download title="Download Proof">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            </div>
          </div>
        `
        : `
          <span class="proof-none-compact" title="No screenshot uploaded">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>No Proof</span>
          </span>
        `;

      const eyeNewTabBtn = `
        <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" title="Open Full Recharge & Billing Details in New Tab">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <span>Full Details ↗</span>
        </a>
      `;

      // Security check: ONLY Billing Department (Accounts role) can change billing status!
      let actionBtnsHtml = '';

      if (isAccounts) {
        const ackBtn = (isPending && !item.acknowledged)
          ? `<button type="button" class="btn btn--sm btn--ack" onclick="quickAcknowledgeRecharge('${item.id}')" title="Acknowledge: Entry Dekh Liya Hai">
               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
               <span>Acknowledge</span>
             </button>`
          : (isPending && item.acknowledged
            ? `<span class="btn-ack-done" title="Acknowledged by ${item.acknowledgedBy || 'Accounts'} on ${formatDateTime(item.acknowledgedAt)}">✓ Seen</span>`
            : '');

        const followUpBtn = item.followUpStatus === 'Requested'
          ? `<button type="button" class="btn btn--sm btn--accent" onclick="openQuickBillingFollowUp('${item.id}')" title="Admin Follow-up Request: Update with Proof">📝 Update Follow-Up</button>`
          : '';

        actionBtnsHtml = `
          ${ackBtn}
          ${followUpBtn}
          <button type="button" class="btn btn--sm btn--navy" onclick="openEditModal('${item.id}')">Update Status</button>
          ${eyeNewTabBtn}
        `;
      } else if (state.currentUser?.role === 'admin') {
        let adminFollowUpBtn = '';
        if (item.followUpStatus === 'Requested') {
          adminFollowUpBtn = `<span class="mono-badge" style="background:#fff7ed;color:#ea580c;border:1px solid #fed7aa;font-size:11px;padding:3px 7px;">🔔 Follow-Up Sent</span>`;
        } else if (item.followUpStatus === 'Updated') {
          adminFollowUpBtn = `<button type="button" class="btn btn--sm" style="background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;font-weight:700;font-size:11.5px;padding:3px 8px;" onclick="openEditModal('${item.id}')">✓ Review Proof</button>`;
        } else {
          adminFollowUpBtn = `<button type="button" class="btn btn--sm" style="background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;font-weight:700;font-size:11.5px;padding:3px 8px;" onclick="openQuickAdminFollowUp('${item.id}')" title="Request Payment Follow-Up from Billing Desk">📞 Follow-Up</button>`;
        }

        actionBtnsHtml = `
          ${adminFollowUpBtn}
          <button type="button" class="btn btn--sm btn--navy" onclick="openEditModal('${item.id}')">Edit Entry</button>
          <button type="button" class="btn-delete-row" onclick="deleteRechargeEntry('${item.id}', '${item.username}')" title="Delete Recharge">Delete</button>
          ${eyeNewTabBtn}
        `;
      } else {
        actionBtnsHtml = `
          ${eyeNewTabBtn}
        `;
      }

      const bCompany = item.billingCompany || 'Immense Air';
      const bType = item.invoiceType || 'Tax Invoice';
      const companyClass = getCompanyClass(bCompany);
      const typeClass = bType === 'Tax Invoice' ? 'type-pill--tax' : bType === 'Proforma Invoice' ? 'type-pill--proforma' : 'type-pill--nongst';

      // Payment Status Pill (Strictly for Accounts & Admin, NEVER for Support)
      let paymentPillHtml = '';
      if (!isSupportRole && isRaised) {
        const rawP = item.paymentStatus || 'Pending';
        const isPaid = rawP === 'Received' || rawP === 'Payment Received';
        const isPart = rawP === 'Partial' || rawP === 'Partial Payment';
        const pClass = isPaid ? 'payment-pill--paid' : isPart ? 'payment-pill--partial' : 'payment-pill--unpaid';
        const pText = isPaid
          ? '✓ Paid'
          : isPart
          ? `Partial (₹${formatNumberIN(item.paidAmount || 0)})`
          : 'Unpaid';
        paymentPillHtml = `<span class="payment-pill ${pClass}" title="Payment Status: ${rawP}">Payment: ${pText}</span>`;
      }

      // Payment Follow-Up Pill (Strictly for Accounts & Admin, NEVER for Support)
      let followUpPillHtml = '';
      if (!isSupportRole) {
        if (item.followUpStatus === 'Requested') {
          followUpPillHtml = `
            <span class="mono-badge" style="background:#fff7ed;color:#ea580c;border:1px solid #fed7aa;font-weight:700;" title="Admin requested payment follow-up">
              🔔 Follow-Up Req
            </span>
          `;
        } else if (item.followUpStatus === 'Updated') {
          followUpPillHtml = `
            <span class="mono-badge" style="background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;font-weight:700;" title="Billing updated follow-up">
              ✓ Follow-Up Done ${item.followUpProofUrl ? '📎' : ''}
            </span>
          `;
        }
      }

      const hasNotes = item.remarks || 
        (!isSupportRole && item.billingRemarks) || 
        (!isSupportRole && item.billedAt) ||
        (!isSupportRole && (item.followUpStatus === 'Requested' || item.followUpStatus === 'Updated')) ||
        (!isSupportRole && isRaised && (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment' || item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received'));

      return `
        <article class="record-card ${cardClass}">
          <div class="record-top">
            <div class="record-top-main">
              <div class="record-id-wrap">
                <span class="record-id">${item.id}</span>
                ${billingSignalHtml}
                ${liveAlertChip}
              </div>
              <span class="record-time">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>${formatDateTime(item.createdAt)}</span>
              </span>
            </div>
            ${(!isSupportRole || isRaised) ? `
              <div class="record-top-meta">
                ${paymentPillHtml}
                ${followUpPillHtml}
                ${!isSupportRole ? `
                  <span class="company-pill ${companyClass}">${bCompany}</span>
                  ${item.invoiceNumber ? `
                    <span class="invoice-pill-combined">
                      <span class="inv-type-badge ${typeClass}">${bType}</span>
                      <strong class="inv-num-code">${item.invoiceNumber}</strong>
                    </span>
                  ` : `<span class="type-pill ${typeClass}">${bType}</span>`}
                ` : ''}
              </div>
            ` : ''}
          </div>

          <div class="record-grid">
            <div class="record-col record-col--user">
              <div class="record-label">${isSupportRole ? 'Username' : 'Username &amp; Company'}</div>
              <div class="record-val record-val--user">${item.username}</div>
              ${!isSupportRole && item.clientName ? `<div class="record-sub" title="${item.clientName}">${item.clientName}</div>` : ''}
            </div>

            <div class="record-col record-col--credits">
              <div class="record-label">Recharge Credits</div>
              <div class="record-val record-val--credits">${formatNumberIN(item.rechargeCount)} <small>Credits</small></div>
              <div class="channel-pills-row">${getServiceChannelPillsHtml(item.service)}</div>
            </div>

            <div class="record-col record-col--manager">
              <div class="record-label">Sales / Account Manager</div>
              <div class="record-val record-val--manager">${item.accountManager}</div>
              <div class="record-sub">Source: ${item.source || 'WhatsApp'}</div>
            </div>

            <div class="record-col record-col--proof">
              <div class="record-label">Screenshot Proof</div>
              ${proofHtml}
            </div>

            <div class="record-col record-col--actions">
              <div class="record-actions-wrap">
                ${actionBtnsHtml}
              </div>
            </div>
          </div>

          ${hasNotes ? `
            <div class="record-bottom-notes">
              ${!isSupportRole && item.followUpStatus === 'Requested' ? `
                <div style="width:100%;background:#fff7ed;border:1.5px solid #fed7aa;border-radius:6px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:4px;">
                  <div style="font-size:12.5px;color:#9a3412;">
                    <strong style="color:#c2410c;">⚠️ Admin Follow-Up Instruction:</strong> "${item.followUpAdminRemark || 'Client se payment ka follow-up lo'}"
                    <span style="font-size:11px;color:#b45309;margin-left:6px;">(${formatDateTime(item.followUpRequestedAt)})</span>
                  </div>
                  ${isAccounts ? `
                    <button type="button" class="btn btn--accent btn--sm" style="padding:3px 10px;font-size:11.5px;" onclick="openQuickBillingFollowUp('${item.id}')">
                      <span>📝 Update Follow-Up (With Proof)</span>
                    </button>
                  ` : `
                    <span style="font-size:11px;color:#9a3412;font-weight:600;">⏳ Waiting for Billing Response</span>
                  `}
                </div>
              ` : ''}

              ${!isSupportRole && item.followUpStatus === 'Updated' ? `
                <div style="width:100%;background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:6px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:4px;">
                  <div style="font-size:12.5px;color:#1e293b;">
                    <strong style="color:#16a34a;">🟢 Billing Follow-Up Update:</strong> ${item.followUpBillingOutcome ? `[${item.followUpBillingOutcome}] ` : ''}"${item.followUpBillingRemark || 'Follow-up done'}"
                    ${item.followUpNextDate ? `<span style="margin-left:8px;font-weight:700;color:#0369a1;">📅 Next Date: ${item.followUpNextDate}</span>` : ''}
                    <span style="font-size:11px;color:#64748b;margin-left:6px;">· Updated ${formatDateTime(item.followUpUpdatedAt)}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    ${item.followUpProofUrl ? `
                      <button type="button" class="proof-compact-btn" style="padding:3px 9px;font-size:11.5px;background:#fff;" onclick="openImageViewer('${item.followUpProofUrl}', 'Supporting Proof - ${item.username}')">
                        <span>👁️ View Supporting Proof</span>
                      </button>
                    ` : ''}
                    ${state.currentUser?.role === 'admin' ? `
                      <button type="button" class="btn btn--navy btn--sm" style="padding:3px 9px;font-size:11.5px;" onclick="resolveFollowUp('${item.id}')" title="Acknowledge & Close Follow-Up">
                        <span>✓ Close Follow-Up</span>
                      </button>
                      <button type="button" class="btn btn--ghost btn--sm" style="padding:3px 8px;font-size:11px;" onclick="openQuickAdminFollowUp('${item.id}')" title="Request fresh follow-up">
                        <span>🔄 Re-Follow-up</span>
                      </button>
                    ` : ''}
                  </div>
                </div>
              ` : ''}

              ${item.remarks ? `<span class="note-item"><strong style="color:var(--navy);">Support Note:</strong> ${item.remarks}</span>` : ''}
              ${!isSupportRole && item.billingRemarks ? `<span class="note-item"><strong style="color:var(--navy);">Billing Note:</strong> ${item.billingRemarks}</span>` : ''}
              ${!isSupportRole && item.billedAt ? `<span class="note-item note-item--success">✓ Invoice confirmed on ${formatDateTime(item.billedAt)}</span>` : ''}
              ${!isSupportRole && isRaised && (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? `
                <span class="note-item" style="color:#B45309;background:#FEF3C7;border-color:#FCD34D;">
                  <strong>💰 Partial Payment:</strong> ₹${formatCurrencyIN(item.paidAmount || 0)} 
                  ${item.totalAmount ? `· <strong>Remaining Balance:</strong> ₹${formatCurrencyIN(Math.max(0, (item.totalAmount || 0) - (item.paidAmount || 0)))}` : ''}
                  ${item.paymentMode ? `· Mode: ${item.paymentMode}` : ''}
                  ${item.paymentDate ? `· Date: ${item.paymentDate}` : ''}
                </span>
              ` : ''}
              ${!isSupportRole && isRaised && (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? `
                <span class="note-item note-item--success">
                  <strong>✓ Full Payment Received:</strong> ₹${formatCurrencyIN(item.paidAmount || item.totalAmount || 0)}
                  ${item.paymentMode ? `· Mode: ${item.paymentMode}` : ''}
                  ${item.paymentDate ? `· Date: ${item.paymentDate}` : ''}
                </span>
              ` : ''}
            </div>
          ` : ''}
        </article>
      `;
    })
    .join('');
}

// =========================================================================
// OPTION 1: SUB-SECTION RECHARGE HISTORY (KAB RECHARGE SUBMIT HUA)
// =========================================================================
function renderRechargeSectionHistory() {
  if (!rechargeSectionHistoryBody) return;
  const isSuperAdmin = state.currentUser?.role === 'admin';
  const isSupportRole = state.currentUser?.role === 'support';
  const dateFiltered = getDateFilteredRecharges();

  // Sort by recharge submission date/time descending (most recent first)
  const sorted = [...dateFiltered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  const countBadge = document.getElementById('rechargeHistoryTabBadge');
  if (countBadge) countBadge.textContent = sorted.length;
  const sectionCount = document.getElementById('rechargeSectionCountBadge');
  if (sectionCount) sectionCount.textContent = `${sorted.length} records`;

  if (sorted.length === 0) {
    rechargeSectionHistoryBody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:26px;color:var(--ink-muted);">No recharge submissions found for selected date.</td></tr>`;
    return;
  }

  rechargeSectionHistoryBody.innerHTML = sorted
    .map((item) => {
      const isPending = item.billingStatus === 'Pending';
      const isRaised = item.billingStatus === 'Billing Raised';
      const isCancelled = item.billingStatus === 'Cancelled';
      const isHold = item.billingStatus === 'On Hold';
      const badgeClass = isSupportRole
        ? (isRaised ? 'status-badge--raised' : isCancelled ? 'status-badge--cancelled' : 'status-badge--pending')
        : (isPending
        ? 'status-badge--pending'
        : isRaised
        ? 'status-badge--raised'
        : isCancelled
        ? 'status-badge--cancelled'
        : 'status-badge--hold');

      const statusText = isSupportRole
        ? (isRaised ? 'Bill Raised' : isCancelled ? 'Cancelled' : 'Bill Not Raised')
        : item.billingStatus;

      const proofBtn = item.screenshotUrl
        ? `<button type="button" class="btn btn--sm btn--ghost" onclick="openImageViewer('${item.screenshotUrl}', '${item.id} · ${item.username}')">View</button>`
        : `<span style="color:var(--ink-muted);font-size:11px;">None</span>`;

      return `
        <tr>
          <td>
            <div style="font-family:var(--font-mono);font-weight:700;">${item.id}</div>
            <div style="font-size:11px;color:var(--ink-muted);" class="tnum">${formatDateTime(item.createdAt)}</div>
          </td>
          <td>
            <strong>${item.username}</strong>
            <div style="font-size:11.5px;color:var(--ink-secondary);">${item.clientName || '—'}</div>
          </td>
          <td class="tnum">
            <div>
              ${(item.servicesList && item.servicesList.length > 0)
                ? item.servicesList.map((s) => `<span class="service-tag" data-svc="${s.service}" style="margin-right:4px;">${s.service}</span>`).join('')
                : `<span class="service-tag" data-svc="${item.service}">${item.service}</span>`
              }
            </div>
            <div style="font-weight:700;margin-top:3px;color:var(--navy);">${formatNumberIN(item.rechargeCount)} <small style="color:var(--ink-muted);font-weight:600;">Units</small></div>
            ${item.servicesDetail ? `<div style="font-size:11px;color:var(--ink-secondary);margin-top:1px;">${item.servicesDetail}</div>` : ''}
          </td>
          <td class="tnum" style="font-weight:700;">${formatRechargeAmountCell(item, isSupportRole)}</td>
          <td>${item.accountManager}</td>
          <td><span class="status-badge ${badgeClass}">${statusText}</span></td>
          <td>${proofBtn}</td>
          <td>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" title="Open Full Recharge & Billing Details in New Tab">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>View Details ↗</span>
              </a>
              ${isSuperAdmin ? `
                <button type="button" class="btn-delete-row" onclick="deleteRechargeEntry('${item.id}', '${item.username}')" title="Delete Recharge ${item.id}">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  <span>Delete</span>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

// =========================================================================
// OPTION 01: 2-TAB SWITCHER (1. ADD NEW RECHARGE | 2. RECHARGE HISTORY)
// =========================================================================
const rechargeViewTabs = document.getElementById('rechargeViewTabs');
if (rechargeViewTabs) {
  rechargeViewTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.recharge-tab-btn');
    if (!btn) return;
    switchRechargeSubTab(btn.dataset.rtab);
  });
}

window.switchRechargeSubTab = function(tabName) {
  const isSupport = state.currentUser?.role === 'support';
  if (isSupport && tabName === 'history') {
    tabName = 'form';
  }
  state.activeRechargeSubTab = tabName || 'form';
  const btnForm = document.getElementById('tabBtnRechargeForm');
  const btnBulk = document.getElementById('tabBtnRechargeBulk');
  const btnHistory = document.getElementById('tabBtnRechargeHistory');
  const paneForm = document.getElementById('rechargeTabForm');
  const paneBulk = document.getElementById('rechargeTabBulk');
  const paneHistory = document.getElementById('rechargeTabHistory');
  const hintEl = document.getElementById('rechargeTabHint');

  if (btnHistory) {
    if (isSupport) {
      btnHistory.classList.add('hidden');
    } else {
      btnHistory.classList.remove('hidden');
    }
  }

  if (btnForm) btnForm.classList.toggle('active', state.activeRechargeSubTab === 'form');
  if (btnBulk) btnBulk.classList.toggle('active', state.activeRechargeSubTab === 'bulk');
  if (btnHistory) btnHistory.classList.toggle('active', state.activeRechargeSubTab === 'history');

  if (paneForm) paneForm.classList.toggle('hidden', state.activeRechargeSubTab !== 'form');
  if (paneBulk) paneBulk.classList.toggle('hidden', state.activeRechargeSubTab !== 'bulk');
  if (paneHistory) paneHistory.classList.toggle('hidden', isSupport || state.activeRechargeSubTab !== 'history');

  if (hintEl) {
    if (state.activeRechargeSubTab === 'form') {
      hintEl.textContent = 'Fill single recharge form and submit for billing verification';
    } else if (state.activeRechargeSubTab === 'bulk') {
      hintEl.textContent = 'Upload Excel or CSV file to submit multiple client recharges in one shot';
    } else {
      hintEl.textContent = 'Showing all submitted client recharges for selected date';
    }
  }

  if (state.activeRechargeSubTab === 'history') {
    renderRechargeSectionHistory();
  }
};

// =========================================================================
// BULK EXCEL / CSV RECHARGE UPLOAD MODULE
// =========================================================================

// 1. Download Sample CSV Template
const downloadBulkSampleBtn = document.getElementById('downloadBulkSampleBtn');
if (downloadBulkSampleBtn) {
  downloadBulkSampleBtn.addEventListener('click', () => {
    const csvContent =
`Username,Service,Units,AccountManager,ApprovalMedium,Remarks
apex_bulk_sms,SMS,50000,Rahul Sharma,WhatsApp Message,Flash sale OTP recharge
zenith_rcs,RCS,100000,Priya Verma,Email Approval,Client urgent broadcast
fintech_wa,WhatsApp,25000,Amit Patel,WhatsApp Message,Marketing template recharge
cloud_wa_virt,Virtual WhatsApp,30000,Neha Gupta,Client Portal,Virtual WA route
care_ivr,IVR,15000,Vikram Singh,Verbal / Call,IVR outbound support`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'immnse_bulk_recharge_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded sample bulk recharge template (.csv)');
  });
}

// 2. Bulk File Selector & Drag-Drop Zone
const bulkUploadZone = document.getElementById('bulkUploadZone');
const bulkFileInput = document.getElementById('bulkFileInput');
const bulkUploadEmpty = document.getElementById('bulkUploadEmpty');
const bulkUploadLoaded = document.getElementById('bulkUploadLoaded');
const bulkLoadedFileName = document.getElementById('bulkLoadedFileName');
const bulkLoadedFileSize = document.getElementById('bulkLoadedFileSize');
const removeBulkFileBtn = document.getElementById('removeBulkFileBtn');
const bulkPreviewSection = document.getElementById('bulkPreviewSection');
const bulkPreviewTableBody = document.getElementById('bulkPreviewTableBody');
const bulkValidCountBadge = document.getElementById('bulkValidCountBadge');
const bulkSubmitCount = document.getElementById('bulkSubmitCount');
const cancelBulkUploadBtn = document.getElementById('cancelBulkUploadBtn');
const submitBulkRechargesBtn = document.getElementById('submitBulkRechargesBtn');

if (bulkUploadZone && bulkFileInput) {
  bulkUploadZone.addEventListener('click', (e) => {
    if (e.target.closest('#removeBulkFileBtn')) return;
    bulkFileInput.click();
  });

  bulkUploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    bulkUploadZone.style.borderColor = 'var(--navy)';
  });
  bulkUploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    bulkUploadZone.style.borderColor = 'var(--accent)';
  });
  bulkUploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    bulkUploadZone.style.borderColor = 'var(--accent)';
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleBulkFile(e.dataTransfer.files[0]);
    }
  });

  bulkFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleBulkFile(e.target.files[0]);
    }
  });
}

function handleBulkFile(file) {
  if (!file) return;
  const fileName = file.name.toLowerCase();
  const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
  const isCsv = fileName.endsWith('.csv') || fileName.endsWith('.txt');

  if (!isExcel && !isCsv) {
    showToast('Please upload an Excel (.xlsx, .xls) or CSV file');
    return;
  }

  if (bulkLoadedFileName) bulkLoadedFileName.textContent = file.name;
  if (bulkLoadedFileSize) bulkLoadedFileSize.textContent = (file.size / 1024).toFixed(1) + ' KB';
  if (bulkUploadEmpty) bulkUploadEmpty.classList.add('hidden');
  if (bulkUploadLoaded) bulkUploadLoaded.classList.remove('hidden');

  const reader = new FileReader();

  if (isExcel && window.XLSX) {
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        parseAndRenderBulkRows(json);
      } catch (err) {
        showToast('Error reading Excel file: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    // CSV Text Parser
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const rows = parseCSVText(text);
        parseAndRenderBulkRows(rows);
      } catch (err) {
        showToast('Error parsing CSV file: ' + err.message);
      }
    };
    reader.readAsText(file);
  }
}

function parseCSVText(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = splitCSVLine(lines[0]);
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = splitCSVLine(lines[i]);
    if (values.length === 0 || values.every((v) => !v)) continue;
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = values[idx] ? values[idx].trim() : '';
    });
    result.push(obj);
  }
  return result;
}

function splitCSVLine(line) {
  const values = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuote = !inQuote;
    } else if (c === ',' && !inQuote) {
      values.push(cur.replace(/^"|"$/g, '').trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  values.push(cur.replace(/^"|"$/g, '').trim());
  return values;
}

function parseAndRenderBulkRows(rawRows) {
  const parsed = [];
  const validServices = ['SMS', 'RCS', 'WhatsApp', 'Virtual WhatsApp', 'OBD', 'IVR', 'SMPP'];
  const defaultManager = (state.settings?.accountManagers && state.settings.accountManagers[0]) || 'Rahul Sharma';

  rawRows.forEach((row) => {
    let username = '';
    let service = 'SMS';
    let count = 0;
    let manager = defaultManager;
    let source = 'WhatsApp Message';
    let remarks = 'Bulk Excel Import';

    Object.keys(row).forEach((k) => {
      const lk = k.toLowerCase().replace(/[^a-z0-9]/g, '');
      const val = String(row[k] || '').trim();

      if (lk.includes('user')) username = val;
      else if (lk.includes('service') || lk.includes('channel')) {
        const found = validServices.find((s) => s.toLowerCase() === val.toLowerCase());
        if (found) service = found;
        else if (val) service = val;
      }
      else if (lk.includes('unit') || lk.includes('count') || lk.includes('credit') || lk.includes('qty')) {
        count = Number(val.replace(/,/g, '')) || 0;
      }
      else if (lk.includes('manager')) {
        if (val) manager = val;
      }
      else if (lk.includes('medium') || lk.includes('source') || lk.includes('approval')) {
        if (val) source = val;
      }
      else if (lk.includes('remark') || lk.includes('note')) {
        if (val) remarks = val;
      }
    });

    if (username && count > 0) {
      parsed.push({
        username,
        service,
        rechargeCount: count,
        accountManager: manager,
        source,
        remarks
      });
    }
  });

  state.bulkParsedItems = parsed;

  if (parsed.length === 0) {
    showToast('No valid rows found. Each row must have Username and Units/Count.');
    if (bulkPreviewSection) bulkPreviewSection.classList.add('hidden');
    return;
  }

  if (bulkValidCountBadge) bulkValidCountBadge.textContent = `${parsed.length} Valid Recharges`;
  if (bulkSubmitCount) bulkSubmitCount.textContent = parsed.length;

  if (bulkPreviewTableBody) {
    bulkPreviewTableBody.innerHTML = parsed.map((item, idx) => `
      <tr>
        <td style="font-weight:700;color:var(--ink-muted);">${idx + 1}</td>
        <td><strong style="color:var(--navy);font-family:var(--font-mono);">${item.username}</strong></td>
        <td><span class="service-tag" data-svc="${item.service}">${item.service}</span></td>
        <td class="tnum" style="font-weight:700;">${formatNumberIN(item.rechargeCount)}</td>
        <td>${item.accountManager}</td>
        <td><span style="font-size:12px;color:var(--ink-secondary);">${item.source}</span></td>
        <td style="font-size:12px;color:var(--ink-muted);">${item.remarks}</td>
      </tr>
    `).join('');
  }

  if (bulkPreviewSection) bulkPreviewSection.classList.remove('hidden');
  showToast(`Parsed ${parsed.length} recharge entries successfully!`);
}

// 3. Reset / Cancel Bulk Upload
function resetBulkUpload() {
  state.bulkParsedItems = [];
  state.bulkProofData = '';
  state.bulkProofName = '';
  if (bulkFileInput) bulkFileInput.value = '';
  if (bulkUploadEmpty) bulkUploadEmpty.classList.remove('hidden');
  if (bulkUploadLoaded) bulkUploadLoaded.classList.add('hidden');
  if (bulkPreviewSection) bulkPreviewSection.classList.add('hidden');
  if (bulkPreviewTableBody) bulkPreviewTableBody.innerHTML = '';
  if (bulkProofPreviewContainer) bulkProofPreviewContainer.classList.add('hidden');
  if (bulkProofEmpty) bulkProofEmpty.classList.remove('hidden');
  if (bulkProofInput) bulkProofInput.value = '';
}

if (removeBulkFileBtn) removeBulkFileBtn.addEventListener('click', resetBulkUpload);
if (cancelBulkUploadBtn) cancelBulkUploadBtn.addEventListener('click', resetBulkUpload);

// 4. Batch Proof Screenshot Handler
const bulkProofZone = document.getElementById('bulkProofZone');
const bulkProofInput = document.getElementById('bulkProofInput');
const bulkProofEmpty = document.getElementById('bulkProofEmpty');
const bulkProofPreviewContainer = document.getElementById('bulkProofPreviewContainer');
const bulkProofPreviewImg = document.getElementById('bulkProofPreviewImg');
const bulkProofFileName = document.getElementById('bulkProofFileName');
const removeBulkProofBtn = document.getElementById('removeBulkProofBtn');

if (bulkProofZone && bulkProofInput) {
  bulkProofZone.addEventListener('click', (e) => {
    if (e.target.closest('#removeBulkProofBtn')) return;
    bulkProofInput.click();
  });

  bulkProofInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      state.bulkProofData = dataUrl;
      state.bulkProofName = file.name || 'bulk_proof.png';

      if (bulkProofPreviewImg && file.type.startsWith('image/')) {
        bulkProofPreviewImg.src = dataUrl;
        bulkProofPreviewImg.style.display = 'block';
      }
      if (bulkProofFileName) bulkProofFileName.textContent = state.bulkProofName;
      if (bulkProofEmpty) bulkProofEmpty.classList.add('hidden');
      if (bulkProofPreviewContainer) bulkProofPreviewContainer.classList.remove('hidden');
    } catch (err) {
      showToast('Failed to load batch screenshot');
    }
  });
}

if (removeBulkProofBtn) {
  removeBulkProofBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.bulkProofData = '';
    state.bulkProofName = '';
    if (bulkProofInput) bulkProofInput.value = '';
    if (bulkProofPreviewContainer) bulkProofPreviewContainer.classList.add('hidden');
    if (bulkProofEmpty) bulkProofEmpty.classList.remove('hidden');
  });
}

// 5. Submit Bulk Recharges to Billing Queue
if (submitBulkRechargesBtn) {
  submitBulkRechargesBtn.addEventListener('click', async () => {
    if (!state.bulkParsedItems || state.bulkParsedItems.length === 0) {
      showToast('Please upload an Excel or CSV file with recharge rows first');
      return;
    }

    submitBulkRechargesBtn.disabled = true;
    submitBulkRechargesBtn.innerHTML = `<span>Importing ${state.bulkParsedItems.length} Recharges...</span>`;

    try {
      const payload = {
        items: state.bulkParsedItems,
        screenshotData: state.bulkProofData || '',
        screenshotName: state.bulkProofName || '',
        submittedBy: state.currentUser?.username || 'support'
      };

      const res = await fetch('/api/recharges/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Bulk upload failed');

      showToast(`🎉 ${data.count} Recharges imported successfully to Billing Queue!`);
      resetBulkUpload();
      await fetchAllData();
      if (state.currentUser?.role === 'support') {
        switchRechargeSubTab('form');
      } else {
        switchRechargeSubTab('history');
      }
    } catch (err) {
      showToast(`Bulk upload error: ${err.message}`);
    } finally {
      submitBulkRechargesBtn.disabled = false;
      submitBulkRechargesBtn.innerHTML = `<span>Import &amp; Submit <strong id="bulkSubmitCount">${state.bulkParsedItems.length}</strong> Recharges</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    }
  });
}

// =========================================================================
// EXTERNAL CAMPAIGN MODULE (2-TAB DISPATCH & CAMPAIGN AUDIT)
// =========================================================================
const campaignViewTabs = document.getElementById('campaignViewTabs');
if (campaignViewTabs) {
  campaignViewTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.recharge-tab-btn');
    if (!btn) return;
    switchCampaignSubTab(btn.dataset.ctab);
  });
}

window.switchCampaignSubTab = function (tabName) {
  state.activeCampaignSubTab = tabName || 'form';
  const btnForm = document.getElementById('tabBtnCampaignForm');
  const btnHistory = document.getElementById('tabBtnCampaignHistory');
  const paneForm = document.getElementById('campaignTabForm');
  const paneHistory = document.getElementById('campaignTabHistory');
  const hint = document.getElementById('campaignTabHint');

  if (btnForm && btnHistory && paneForm && paneHistory) {
    if (tabName === 'history') {
      btnForm.classList.remove('active');
      btnHistory.classList.add('active');
      paneForm.classList.add('hidden');
      paneHistory.classList.remove('hidden');
      if (hint) hint.textContent = '';
      renderCampaignHistory();
    } else {
      btnHistory.classList.remove('active');
      btnForm.classList.add('active');
      paneHistory.classList.add('hidden');
      paneForm.classList.remove('hidden');
      if (hint) hint.textContent = 'Log client external campaign for direct broadcast & billing';
    }
  }
};

function updateCampaignBadge() {
  const badge = document.getElementById('campaignBadge');
  const count = state.campaigns.length;
  if (badge) badge.textContent = count;
  const tabBadge = document.getElementById('campaignHistoryTabBadge');
  if (tabBadge) tabBadge.textContent = count;
}

// Campaign Service Chips
const campaignServiceChips = document.getElementById('campaignServiceChips');
const campaignSelectedServiceInput = document.getElementById('campaignSelectedService');
if (campaignServiceChips && campaignSelectedServiceInput) {
  campaignServiceChips.addEventListener('click', (e) => {
    const btn = e.target.closest('.service-chip');
    if (!btn) return;
    campaignServiceChips.querySelectorAll('.service-chip').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    campaignSelectedServiceInput.value = btn.dataset.cservice;
  });
}

// Campaign Units Preset Chips
document.querySelectorAll('.preset-btn[data-ccount]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const countInput = document.getElementById('campaignUnits');
    if (countInput) {
      countInput.value = btn.dataset.ccount;
    }
  });
});

// Campaign File / Proof Upload & Paste Handling
const campaignUploadZone = document.getElementById('campaignUploadZone');
const campaignFileInput = document.getElementById('campaignFileInput');
const campaignUploadEmpty = document.getElementById('campaignUploadEmpty');
const campaignUploadPreviewContainer = document.getElementById('campaignUploadPreviewContainer');
const campaignUploadPreviewImg = document.getElementById('campaignUploadPreviewImg');
const campaignUploadFileName = document.getElementById('campaignUploadFileName');
const removeCampaignImgBtn = document.getElementById('removeCampaignImgBtn');

if (campaignUploadZone && campaignFileInput) {
  campaignUploadZone.addEventListener('click', (e) => {
    if (e.target.closest('#removeCampaignImgBtn')) return;
    campaignFileInput.click();
  });

  campaignFileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      state.currentCampaignFileData = dataUrl;
      state.currentCampaignFileName = file.name || 'campaign_base.png';

      if (campaignUploadPreviewImg) {
        if (file.type.startsWith('image/')) {
          campaignUploadPreviewImg.src = dataUrl;
          campaignUploadPreviewImg.style.display = 'block';
        } else {
          campaignUploadPreviewImg.style.display = 'none';
        }
      }
      if (campaignUploadFileName) campaignUploadFileName.textContent = state.currentCampaignFileName;
      if (campaignUploadEmpty) campaignUploadEmpty.classList.add('hidden');
      if (campaignUploadPreviewContainer) campaignUploadPreviewContainer.classList.remove('hidden');
    } catch (err) {
      showToast('Failed to read campaign file');
    }
  });
}

if (removeCampaignImgBtn) {
  removeCampaignImgBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.currentCampaignFileData = '';
    state.currentCampaignFileName = '';
    if (campaignFileInput) campaignFileInput.value = '';
    if (campaignUploadPreviewContainer) campaignUploadPreviewContainer.classList.add('hidden');
    if (campaignUploadEmpty) campaignUploadEmpty.classList.remove('hidden');
  });
}

// Campaign Form Submission - Cleaned strictly for Support Desk
const campaignForm = document.getElementById('campaignForm');
if (campaignForm) {
  campaignForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('campaignSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Logging External Campaign...</span>';

    try {
      const payload = {
        username: document.getElementById('campaignUsername').value.trim(),
        service: campaignSelectedServiceInput ? campaignSelectedServiceInput.value : 'SMS',
        campaignUnits: Number(document.getElementById('campaignUnits').value) || 0,
        accountManager: document.getElementById('campaignAccountManager').value,
        source: document.getElementById('campaignSource').value,
        remarks: document.getElementById('campaignRemarks') ? document.getElementById('campaignRemarks').value.trim() : '',
        screenshotData: state.currentCampaignFileData || '',
        screenshotName: state.currentCampaignFileName || '',
        submittedBy: state.currentUser?.username || 'support'
      };

      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit campaign');

      showToast(`Campaign ${data.campaign.id} submitted successfully!`);
      campaignForm.reset();
      state.currentCampaignFileData = '';
      state.currentCampaignFileName = '';
      if (campaignUploadPreviewContainer) campaignUploadPreviewContainer.classList.add('hidden');
      if (campaignUploadEmpty) campaignUploadEmpty.classList.remove('hidden');

      // Refresh campaigns & switch to history tab
      const cRes = await fetch('/api/campaigns');
      if (cRes.ok) {
        const cData = await cRes.json();
        state.campaigns = cData.campaigns || [];
        updateCampaignBadge();
      }
      switchCampaignSubTab('history');
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Submit External Campaign</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    }
  });
}

// Campaign History Search & Filter Events
const campaignSearchInput = document.getElementById('campaignSearchInput');
if (campaignSearchInput) {
  campaignSearchInput.addEventListener('input', (e) => {
    state.campaignSearchQuery = e.target.value;
    renderCampaignHistory();
  });
}

const campaignFilterService = document.getElementById('campaignFilterService');
if (campaignFilterService) {
  campaignFilterService.addEventListener('change', (e) => {
    state.campaignFilterService = e.target.value;
    renderCampaignHistory();
  });
}

const campaignFilterStatus = document.getElementById('campaignFilterStatus');
if (campaignFilterStatus) {
  campaignFilterStatus.addEventListener('change', (e) => {
    state.campaignFilterStatus = e.target.value;
    renderCampaignHistory();
  });
}

function renderCampaignHistory() {
  const tbody = document.getElementById('campaignHistoryTableBody');
  if (!tbody) return;

  const isAccounts = state.currentUser?.role === 'accounts';
  const isSupport = state.currentUser?.role === 'support';
  const isAdmin = state.currentUser?.role === 'admin';
  const isSupportRole = isSupport;
  const isSuperAdmin = isAdmin;

  const q = (state.campaignSearchQuery || '').toLowerCase().trim();
  const service = state.campaignFilterService || 'ALL';
  const status = state.campaignFilterStatus || 'ALL';

  const list = state.campaigns.filter((c) => {
    if (service !== 'ALL' && c.service !== service) return false;
    if (status !== 'ALL' && c.campaignStatus !== status) return false;
    if (q) {
      const hay = `${c.id} ${c.username} ${c.service} ${c.accountManager} ${c.remarks || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const countBadge = document.getElementById('campaignSectionCountBadge');
  if (countBadge) countBadge.textContent = `${list.length} campaigns`;
  const tabBadge = document.getElementById('campaignHistoryTabBadge');
  if (tabBadge) tabBadge.textContent = state.campaigns.length;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align:center;padding:48px 20px;color:var(--ink-muted);">
          <div style="font-size:24px;margin-bottom:6px;">🚀</div>
          <strong style="color:var(--navy);">No External Campaigns Found</strong>
          <div style="font-size:12px;margin-top:4px;">Log a new external broadcast campaign in Tab 1 or adjust your search filter.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map((c) => {
    const isPending = c.billingStatus === 'Pending';
    const isRaised = c.billingStatus === 'Billing Raised';
    const billBadgeClass = isRaised ? 'status-badge--raised' : 'status-badge--pending';
    const billStatusText = isSupportRole
      ? (isRaised ? 'Bill Raised' : 'Bill Not Raised')
      : (c.billingStatus || 'Pending');

    const proofBtn = c.screenshotUrl
      ? `<button type="button" class="btn btn--sm btn--ghost" onclick="openImageViewer('${c.screenshotUrl}', '${c.id} · ${c.username}')">Proof</button>`
      : `<span style="color:var(--ink-muted);font-size:11px;">None</span>`;

    // Rate & Amount display:
    let rateAmountHtml = '';
    if (isSupportRole) {
      rateAmountHtml = `<span style="color:var(--ink-muted);font-size:11.5px;font-style:italic;">Managed by Accounts</span>`;
    } else {
      if (c.totalAmount > 0) {
        rateAmountHtml = `
          <div class="tnum" style="font-weight:700;color:var(--navy);">${formatCurrencyIN(c.totalAmount)}</div>
          ${c.ratePerUnit > 0 ? `<div style="font-size:11px;color:var(--ink-muted);" class="tnum">@ ₹${c.ratePerUnit}/unit</div>` : ''}
        `;
      } else {
        rateAmountHtml = `<button type="button" class="btn btn--sm btn--accent" style="font-size:11px;padding:3px 8px;" onclick="openCampaignEditModal('${c.id}')">+ Add Rate</button>`;
      }
    }

    let actionBtnHtml = '';
    if (isAccounts || isSuperAdmin) {
      actionBtnHtml = `<button type="button" class="btn btn--sm btn--navy" onclick="openCampaignEditModal('${c.id}')">Update / Rate</button>`;
    } else {
      actionBtnHtml = `<button type="button" class="btn btn--sm btn--ghost" onclick="openCampaignEditModal('${c.id}')">View</button>`;
    }

    return `
      <tr>
        <td>
          <div style="font-family:var(--font-mono);font-weight:700;color:var(--navy);">${c.id}</div>
          <div style="font-size:11px;color:var(--ink-muted);" class="tnum">${formatDateTime(c.createdAt)}</div>
        </td>
        <td>
          <strong style="color:var(--navy);">${c.username}</strong>
        </td>
        <td>
          <span class="service-tag" data-svc="${c.service}">${c.service}</span>
        </td>
        <td class="tnum" style="font-weight:700;">${formatNumberIN(c.campaignUnits)}</td>
        <td>${rateAmountHtml}</td>
        <td>${c.accountManager}</td>
        <td><span style="font-size:12px;color:var(--ink-secondary);">${c.source || 'WhatsApp Message'}</span></td>
        <td><span class="status-badge ${billBadgeClass}">${billStatusText}</span></td>
        <td>${proofBtn}</td>
        <td>${actionBtnHtml}</td>
      </tr>
    `;
  }).join('');
}

// Campaign Modal Logic
window.openCampaignEditModal = function (id) {
  const c = state.campaigns.find((item) => item.id === id);
  if (!c) return;

  state.editingCampaignId = id;
  const modal = document.getElementById('campaignEditModal');
  if (!modal) return;

  const idBadge = document.getElementById('editCampaignModalId');
  if (idBadge) idBadge.textContent = c.id;
  const uInput = document.getElementById('editCampaignUsername');
  if (uInput) uInput.value = c.username;
  const sInput = document.getElementById('editCampaignService');
  if (sInput) sInput.value = c.service || '';
  const unitsInput = document.getElementById('editCampaignUnits');
  if (unitsInput) unitsInput.value = c.campaignUnits || 0;
  const rInput = document.getElementById('editCampaignRate');
  if (rInput) rInput.value = c.ratePerUnit || '';
  const aInput = document.getElementById('editCampaignAmount');
  if (aInput) aInput.value = c.totalAmount || '';
  const bSelect = document.getElementById('editCampaignBillingStatus');
  if (bSelect) bSelect.value = c.billingStatus || 'Pending';
  const invInput = document.getElementById('editCampaignInvoice');
  if (invInput) invInput.value = c.invoiceNumber || '';
  const remInput = document.getElementById('editCampaignRemarks');
  if (remInput) remInput.value = c.remarks || '';

  // Auto calculate total amount on rate change
  if (rInput && aInput && unitsInput) {
    const calc = () => {
      const u = Number(unitsInput.value) || 0;
      const r = Number(rInput.value) || 0;
      if (r > 0 && u > 0) {
        aInput.value = (u * r).toFixed(2);
      }
    };
    rInput.oninput = calc;
    unitsInput.oninput = calc;
  }

  modal.classList.remove('hidden');
};

const closeCampaignEditModal = document.getElementById('closeCampaignEditModal');
const cancelCampaignEditBtn = document.getElementById('cancelCampaignEditBtn');
const campaignEditModal = document.getElementById('campaignEditModal');

function hideCampaignEditModal() {
  if (campaignEditModal) campaignEditModal.classList.add('hidden');
  state.editingCampaignId = null;
}

if (closeCampaignEditModal) closeCampaignEditModal.addEventListener('click', hideCampaignEditModal);
if (cancelCampaignEditBtn) cancelCampaignEditBtn.addEventListener('click', hideCampaignEditModal);

const campaignEditForm = document.getElementById('campaignEditForm');
if (campaignEditForm) {
  campaignEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.editingCampaignId) return;

    try {
      const rateInput = document.getElementById('editCampaignRate');
      const amountInput = document.getElementById('editCampaignAmount');
      const unitsInput = document.getElementById('editCampaignUnits');
      const rate = rateInput ? Number(rateInput.value) || 0 : 0;
      const amount = amountInput ? Number(amountInput.value) || 0 : 0;

      const payload = {
        campaignUnits: unitsInput ? Number(unitsInput.value) || 0 : 0,
        ratePerUnit: rate,
        totalAmount: amount,
        billingStatus: document.getElementById('editCampaignBillingStatus')?.value || 'Pending',
        invoiceNumber: document.getElementById('editCampaignInvoice')?.value.trim() || '',
        remarks: document.getElementById('editCampaignRemarks')?.value.trim() || ''
      };

      const res = await fetch(`/api/campaigns/${encodeURIComponent(state.editingCampaignId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update campaign');

      showToast(`Campaign ${state.editingCampaignId} updated!`);
      hideCampaignEditModal();

      const cRes = await fetch('/api/campaigns');
      if (cRes.ok) {
        const cData = await cRes.json();
        state.campaigns = cData.campaigns || [];
        updateCampaignBadge();
        renderCampaignHistory();
      }
    } catch (err) {
      showToast(`Update error: ${err.message}`);
    }
  });
}

const deleteCampaignBtn = document.getElementById('deleteCampaignBtn');
if (deleteCampaignBtn) {
  deleteCampaignBtn.addEventListener('click', async () => {
    if (!state.editingCampaignId) return;
    if (!confirm(`Are you sure you want to delete Campaign "${state.editingCampaignId}"?`)) return;

    try {
      const res = await fetch(`/api/campaigns/${encodeURIComponent(state.editingCampaignId)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete campaign');

      showToast(`Campaign deleted.`);
      hideCampaignEditModal();

      const cRes = await fetch('/api/campaigns');
      if (cRes.ok) {
        const cData = await cRes.json();
        state.campaigns = cData.campaigns || [];
        updateCampaignBadge();
        renderCampaignHistory();
      }
    } catch (err) {
      showToast(`Delete error: ${err.message}`);
    }
  });
}

// =========================================================================
// OPTION 3: RECHARGE & BILLING HISTORY TABLE (WITH EYE NEW-TAB BUTTON)
// =========================================================================
function renderHistoryTable() {
  if (!historyTableBody) return;
  const q = state.historySearchQuery.toLowerCase().trim();
  const isSuperAdmin = state.currentUser?.role === 'admin';
  const isSupportRole = state.currentUser?.role === 'support';
  const subTab = state.historySubTab || 'recharge';

  const dateFiltered = getDateFilteredRecharges();

  let list = dateFiltered;
  if (subTab === 'recharge') {
    // Recharge History: all recharges, sorted by createdAt desc (kab recharge submit hua)
    list = [...dateFiltered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } else if (subTab === 'billing') {
    // Billing History: only billed/invoiced recharges, sorted by billedAt desc (kab invoice bani)
    list = dateFiltered
      .filter((r) => r.billingStatus === 'Billing Raised' || Boolean(r.invoiceNumber) || Boolean(r.billedAt))
      .sort((a, b) => new Date(b.billedAt || b.createdAt || 0) - new Date(a.billedAt || a.createdAt || 0));
  } else {
    // all records
    list = [...dateFiltered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  const filtered = list.filter((item) => {
    if (!q) return true;
    const clientPart = isSupportRole ? '' : ` ${item.clientName || ''}`;
    const hay = `${item.id} ${item.username}${clientPart} ${item.service} ${item.accountManager} ${item.billingStatus} ${item.invoiceNumber || ''} ${item.billingRemarks || ''} ${item.remarks || ''}`.toLowerCase();
    return hay.includes(q);
  });

  if (historyTabCountBadge) {
    historyTabCountBadge.textContent = `${filtered.length} records`;
  }

  // Update dynamic Table Header based on active tab
  if (historyTableHead) {
    if (subTab === 'billing' && !isSupportRole) {
      historyTableHead.innerHTML = `
        <tr>
          <th>Invoice No. &amp; Billed Date</th>
          <th>Billing Entity &amp; Type</th>
          <th>Recharge ID &amp; Date</th>
          <th>Panel Username</th>
          <th>Company Name</th>
          <th>Service &amp; Units</th>
          <th>Invoiced Value (₹)</th>
          <th>Account Manager</th>
          <th>Billing Status</th>
          <th>Billing Remarks</th>
          <th>Action</th>
        </tr>
      `;
    } else if (isSupportRole) {
      historyTableHead.innerHTML = `
        <tr>
          <th>Recharge ID &amp; Date</th>
          <th>Username</th>
          <th>Channel &amp; Credits</th>
          <th>Account Manager</th>
          <th>Billing Status</th>
          <th>Proof</th>
          <th>Action</th>
        </tr>
      `;
    } else {
      historyTableHead.innerHTML = `
        <tr>
          <th>Recharge ID &amp; Date Logged</th>
          <th>Panel Username</th>
          <th>Company Name</th>
          <th>Service &amp; Units</th>
          <th>Billable Value</th>
          <th>Account Manager</th>
          <th>Billing Status</th>
          <th>Billing Entity &amp; Type</th>
          <th>Invoice No. &amp; Billed Date</th>
          <th>Proof</th>
          <th>Action</th>
        </tr>
      `;
    }
  }

  if (filtered.length === 0) {
    const colCount = isSupportRole ? 7 : 11;
    historyTableBody.innerHTML = `<tr><td colspan="${colCount}" style="text-align:center;padding:30px;color:var(--ink-muted);">No ${subTab === 'billing' ? 'billing invoice' : 'recharge'} records found for selected filter.</td></tr>`;
    return;
  }

  if (subTab === 'billing' && !isSupportRole) {
    historyTableBody.innerHTML = filtered
      .map((item) => {
        const badgeClass = 'status-badge--raised';
        const bCompany = item.billingCompany || 'Immense Air';
        const bType = item.invoiceType || 'Tax Invoice';
        const companyClass = getCompanyClass(bCompany);
        const typeClass = bType === 'Tax Invoice' ? 'type-pill--tax' : bType === 'Proforma Invoice' ? 'type-pill--proforma' : 'type-pill--nongst';

        return `
          <tr>
            <td data-label="Invoice No. & Date">
              <div class="mob-cell-id-date">
                <div>
                  <span class="invoice-pill-combined">
                    <span class="inv-type-badge ${typeClass}">${bType}</span>
                    <strong class="inv-num-code" style="font-size:13px;">${item.invoiceNumber || 'No Invoice'}</strong>
                  </span>
                </div>
                <div style="font-size:11.5px;color:#64748b;font-family:var(--font-mono);">
                  ${item.billedAt ? formatDateTime(item.billedAt) : 'Invoice Raised'}
                </div>
              </div>
            </td>
            <td data-label="Recharge ID">
              <div class="mob-cell-align-right" style="flex-direction:row;gap:6px;align-items:center;">
                <span class="record-id" style="white-space:nowrap;">${item.id}</span>
                <span style="font-size:11px;color:#64748b;white-space:nowrap;">Rech: ${formatDateTime(item.createdAt)}</span>
              </div>
            </td>
            <td data-label="Billing Entity">
              <div class="mob-cell-align-right">
                <span class="company-pill ${companyClass}">${bCompany}</span>
              </div>
            </td>
            <td data-label="Username">
              <div class="mob-cell-align-right">
                <strong style="color:var(--navy);font-size:13.5px;">${item.username}</strong>
              </div>
            </td>
            <td data-label="Company Name">
              <div class="mob-cell-align-right" style="color:#334155;font-weight:600;max-width:240px;text-align:right;">${item.clientName || '—'}</div>
            </td>
            <td data-label="Service & Units">
              <div class="mob-cell-align-right">
                <div><strong style="color:var(--navy);font-size:13px;">${formatNumberIN(item.rechargeCount)}</strong> <small style="font-size:11.5px;color:#64748b;">Credits</small></div>
                <div class="channel-pills-row" style="margin-top:2px;justify-content:flex-end;">${getServiceChannelPillsHtml(item.service)}</div>
              </div>
            </td>
            <td data-label="Invoiced Value">
              <div class="mob-cell-align-right" style="font-weight:800;color:var(--green);font-size:14.5px;font-family:var(--font-mono);">${formatCurrencyIN(item.totalAmount)}</div>
            </td>
            <td data-label="Account Manager">
              <div class="mob-cell-align-right">
                <div style="font-weight:700;color:var(--navy);font-size:13px;">${item.accountManager}</div>
                <div style="font-size:11px;color:#64748b;">${item.source || 'WhatsApp Message'}</div>
              </div>
            </td>
            <td data-label="Billing Status">
              <div class="mob-cell-align-right" style="flex-direction:row;gap:6px;flex-wrap:wrap;justify-content:flex-end;align-items:center;">
                <span class="status-badge ${badgeClass}">${item.billingStatus}</span>
                ${!isSupportRole ? `
                  <span class="payment-pill ${
                    (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? 'payment-pill--paid' :
                    (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? 'payment-pill--partial' : 'payment-pill--unpaid'
                  }">
                    ${
                      (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? '✓ Paid' :
                      (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? `Partial ₹${formatNumberIN(item.paidAmount || 0)}` : 'Unpaid'
                    }
                  </span>
                ` : ''}
              </div>
            </td>
            <td data-label="Remarks">
              <div class="mob-cell-align-right" style="font-size:12px;color:#475569;text-align:right;max-width:240px;">${item.billingRemarks || item.remarks || '—'}</div>
            </td>
            <td data-label="Action">
              <div class="mob-cell-action-row" style="display:flex;align-items:center;gap:6px;width:100%;justify-content:stretch;">
                <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" style="flex:1;justify-content:center;padding:8px 12px;" title="Open Full Recharge & Billing Details in New Tab">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>View Details ↗</span>
                </a>
                ${isSuperAdmin ? `
                  <button type="button" class="btn-delete-row" style="padding:8px 14px;" onclick="deleteRechargeEntry('${item.id}', '${item.username}')" title="Delete Recharge ${item.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    <span>Delete</span>
                  </button>
                ` : ''}
              </div>
            </td>
          </tr>
        `;
      })
      .join('');
  } else {
    // Recharge History or All Records
    historyTableBody.innerHTML = filtered
      .map((item) => {
        const isPending = item.billingStatus === 'Pending';
        const isRaised = item.billingStatus === 'Billing Raised';
        const isHold = item.billingStatus === 'On Hold';
        const isCancelled = item.billingStatus === 'Cancelled';

        const signalClass = isRaised ? 'signal--green' : isHold ? 'signal--red' : isCancelled ? 'signal--cancelled' : 'signal--yellow';
        const signalLabel = isRaised ? 'Bill Raised' : isHold ? 'On Hold' : isCancelled ? 'Cancelled' : 'Bill Not Raised';

        const billingSignalHtml = `
          <span class="billing-signal-tag ${signalClass}" title="Live Billing Status: ${signalLabel}">
            <span class="signal-indicator-dot"></span>
            <span>${signalLabel}</span>
          </span>
        `;

        const bCompany = item.billingCompany || 'Immense Air';
        const bType = item.invoiceType || 'Tax Invoice';
        const companyClass = getCompanyClass(bCompany);
        const typeClass = bType === 'Tax Invoice' ? 'type-pill--tax' : bType === 'Proforma Invoice' ? 'type-pill--proforma' : 'type-pill--nongst';

        const proofBtn = item.screenshotUrl
          ? `<button type="button" class="btn btn--sm btn--ghost" style="padding:4px 9px;display:inline-flex;align-items:center;gap:4px;font-size:12px;" onclick="openImageViewer('${item.screenshotUrl}', '${item.id} · ${item.username}')">
               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
               <span>View Proof</span>
             </button>`
          : `<span style="color:#94a3b8;font-size:12px;">No Proof</span>`;

        if (isSupportRole) {
          // CLEAN SUPPORT RECHARGE REPORT ROW (NO BILLING AMOUNT & NO COMPANY NAME SHOWN!)
          return `
            <tr>
              <td data-label="Recharge ID & Date">
                <div class="mob-cell-id-date">
                  <div style="font-weight:700;color:var(--navy);font-size:13.5px;">${item.id}</div>
                  <div style="font-size:11.5px;color:#64748b;margin-top:2px;">${formatDateTime(item.createdAt)}</div>
                </div>
              </td>
              <td data-label="Username"><strong style="color:var(--navy);font-size:13.5px;">${item.username}</strong></td>
              <td data-label="Channel & Credits">
                <div class="mob-cell-align-right">
                  <div style="font-weight:700;color:var(--navy);font-size:13px;">${formatNumberIN(item.rechargeCount)} <small style="font-size:11.5px;color:#64748b;font-weight:500;">Credits</small></div>
                  <div class="channel-pills-row mob-cell-pill-row" style="margin-top:3px;">${getServiceChannelPillsHtml(item.service)}</div>
                </div>
              </td>
              <td data-label="Account Manager">
                <div class="mob-cell-align-right">
                  <div style="font-weight:600;color:var(--navy);font-size:13px;">${item.accountManager}</div>
                  <div style="font-size:11.5px;color:#64748b;">${item.source || 'WhatsApp Message'}</div>
                </div>
              </td>
              <td data-label="Billing Status">
                ${billingSignalHtml}
                ${item.acknowledged && item.billingStatus === 'Pending' ? `<div style="margin-top:4px;"><span class="ack-seen-pill ack-seen-pill--support" style="font-size:10px;padding:2px 7px;">✓ Seen by Billing</span></div>` : ''}
              </td>
              <td data-label="Proof">${proofBtn}</td>
              <td data-label="Action">
                <div class="mob-cell-action-row" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" title="Open Full Recharge & Billing Details in New Tab">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>View Details ↗</span>
                  </a>
                </div>
              </td>
            </tr>
          `;
        }

        // Accounts / Admin View (Includes Billable Amounts, Invoices, Entities)
        return `
          <tr>
            <td data-label="Recharge ID & Date">
              <div class="mob-cell-id-date">
                <div style="font-weight:700;color:var(--navy);font-size:13px;">${item.id}</div>
                <div style="font-size:11.5px;color:#64748b;margin-top:2px;">${formatDateTime(item.createdAt)}</div>
              </div>
            </td>
            <td data-label="Username"><strong style="color:var(--navy);font-size:13.5px;">${item.username}</strong></td>
            <td data-label="Company Name" style="color:#475569;">${item.clientName || '—'}</td>
            <td data-label="Service & Units">
              <div class="mob-cell-align-right">
                <div style="font-weight:700;color:var(--navy);font-size:13px;">${formatNumberIN(item.rechargeCount)} <small style="font-size:11.5px;color:#64748b;font-weight:500;">Credits</small></div>
                <div class="channel-pills-row mob-cell-pill-row" style="margin-top:3px;">${getServiceChannelPillsHtml(item.service)}</div>
              </div>
            </td>
            <td data-label="Billable Value" class="tnum" style="font-weight:700;color:var(--green);font-size:13.5px;">${formatRechargeAmountCell(item, false)}</td>
            <td data-label="Account Manager">
              <div class="mob-cell-align-right">
                <div style="font-weight:600;color:var(--navy);font-size:13px;">${item.accountManager}</div>
                <div style="font-size:11.5px;color:#64748b;">${item.source || 'WhatsApp Message'}</div>
              </div>
            </td>
            <td data-label="Billing Status">
              ${billingSignalHtml}
              ${item.acknowledged && item.billingStatus === 'Pending' ? `<div style="margin-top:4px;"><span class="ack-seen-pill" style="font-size:10px;padding:2px 7px;">✓ Acknowledged</span></div>` : ''}
              ${!isSupportRole && isRaised ? `
                <div style="margin-top:4px;">
                  <span class="payment-pill ${
                    (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? 'payment-pill--paid' :
                    (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? 'payment-pill--partial' : 'payment-pill--unpaid'
                  }">
                    ${
                      (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? '✓ Paid' :
                      (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? `💰 Partial (₹${formatNumberIN(item.paidAmount || 0)})` : '⏳ Unpaid'
                    }
                  </span>
                </div>
              ` : ''}
            </td>
            <td data-label="Billing Entity">
              <div><span class="company-pill ${companyClass}">🏢 ${bCompany}</span></div>
              <div style="margin-top:4px;"><span class="type-pill ${typeClass}">${bType}</span></div>
            </td>
            <td data-label="Invoice No. & Date" class="tnum">
              <div style="font-weight:700;color:var(--navy);">${item.invoiceNumber || '—'}</div>
              <div style="font-size:11.5px;color:#64748b;">${item.billedAt ? formatDateTime(item.billedAt) : 'Not billed yet'}</div>
            </td>
            <td data-label="Proof">${proofBtn}</td>
            <td data-label="Action">
              <div class="mob-cell-action-row" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" title="Open Full Recharge & Billing Details in New Tab">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>View Details ↗</span>
                </a>
                ${isSuperAdmin ? `
                  <button type="button" class="btn-delete-row" onclick="deleteRechargeEntry('${item.id}', '${item.username}')" title="Delete Recharge ${item.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    <span>Delete</span>
                  </button>
                ` : ''}
              </div>
            </td>
          </tr>
        `;
      })
      .join('');
  }
}

if (historySubTabsGroup) {
  historySubTabsGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('.status-pill');
    if (!btn) return;
    state.historySubTab = btn.dataset.htab;
    historySubTabsGroup.querySelectorAll('.status-pill').forEach((b) => {
      b.classList.toggle('active', b.dataset.htab === state.historySubTab);
    });
    renderHistoryTable();
  });
}

if (historySearchInput) {
  historySearchInput.addEventListener('input', (e) => {
    state.historySearchQuery = e.target.value;
    renderHistoryTable();
  });
}

// =========================================================================
// OPTION 4: CLIENT LIST DIRECTORY (BY ACCOUNT MANAGER) & OUTSTANDING SUMMARY
// =========================================================================
function renderMasterClientList() {
  const tableBody = document.getElementById('masterClientListTableBody');
  const countEl = document.getElementById('clientListCount');
  const pillsContainer = document.getElementById('clientListManagerPills');
  const groupedContainer = document.getElementById('clientGroupedContainer');
  const groupedWrap = document.getElementById('clientGroupedViewWrap');
  const tableWrap = document.getElementById('clientMasterTableViewWrap');
  const btnGrouped = document.getElementById('clientViewModeGroupedBtn');
  const btnTable = document.getElementById('clientViewModeTableBtn');

  if (!tableBody && !groupedContainer) return;

  const currentMode = state.clientListViewMode || 'grouped';

  if (groupedWrap && tableWrap) {
    if (currentMode === 'grouped') {
      groupedWrap.classList.remove('hidden');
      tableWrap.classList.add('hidden');
      if (btnGrouped) btnGrouped.classList.add('active');
      if (btnTable) btnTable.classList.remove('active');
    } else {
      groupedWrap.classList.add('hidden');
      tableWrap.classList.remove('hidden');
      if (btnGrouped) btnGrouped.classList.remove('active');
      if (btnTable) btnTable.classList.add('active');
    }
  }

  // Master list of all Account Managers (Exclude Yash Sharma)
  const managerSet = new Set((state.settings.accountManagers || []).filter(m => m !== 'Yash Sharma'));
  (state.recharges || []).forEach((r) => {
    if (r.accountManager && r.accountManager !== 'Yash Sharma') managerSet.add(r.accountManager);
  });
  const managers = Array.from(managerSet).filter(Boolean);

  // Group clients by (Account Manager + Username)
  const clientMap = {};
  (state.recharges || []).forEach((r) => {
    if (r.accountManager === 'Yash Sharma') return;
    const am = r.accountManager || 'Unassigned';
    const uname = r.username || 'Unknown';
    const key = am + '___' + uname.toLowerCase();

    if (!clientMap[key]) {
      clientMap[key] = {
        accountManager: am,
        username: uname,
        clientName: r.clientName || '—',
        services: new Set(),
        rechargesCount: 0,
        totalUnits: 0,
        outstandingAmt: 0,
        billedAmt: 0,
        totalBusiness: 0
      };
    }

    const c = clientMap[key];
    if (r.clientName && c.clientName === '—') c.clientName = r.clientName;
    if (r.service) {
      r.service.split('+').forEach((s) => c.services.add(s.trim()));
    }
    c.rechargesCount++;
    c.totalUnits += Number(r.rechargeCount) || 0;
    const amt = Number(r.totalAmount) || 0;
    c.totalBusiness += amt;
    if (r.billingStatus === 'Billing Raised') {
      c.billedAmt += amt;
    } else {
      c.outstandingAmt += amt;
    }
  });

  const allClients = Object.values(clientMap);

  // Update Top Metric KPI summary counters
  const statClientsEl = document.getElementById('clientStatTotalClients');
  if (statClientsEl) statClientsEl.textContent = allClients.length;

  const statAmsEl = document.getElementById('clientStatTotalAMs');
  if (statAmsEl) statAmsEl.textContent = managers.length;

  const totalRechargesCount = (state.recharges || []).length;
  const statRechargesEl = document.getElementById('clientStatTotalRecharges');
  if (statRechargesEl) statRechargesEl.textContent = totalRechargesCount;

  const totalOutstanding = allClients.reduce((sum, c) => sum + (c.outstandingAmt || 0), 0);
  const statOutstandingEl = document.getElementById('clientStatOutstanding');
  if (statOutstandingEl) statOutstandingEl.textContent = formatCurrencyIN(totalOutstanding);

  // Filter & Search
  const curManager = state.clientListManager || 'ALL';
  const q = (state.clientListSearchQuery || '').toLowerCase().trim();

  // 2. Render Manager Quick Pills
  if (pillsContainer) {
    pillsContainer.innerHTML = `
      <button type="button" class="status-pill ${curManager === 'ALL' ? 'active' : ''}" data-am="ALL">
        All Managers (${allClients.length} Clients)
      </button>
      ${managers.map((m) => {
        const mCount = allClients.filter(c => c.accountManager === m).length;
        return `
          <button type="button" class="status-pill ${curManager === m ? 'active' : ''}" data-am="${m}">
            ${m} (${mCount})
          </button>
        `;
      }).join('')}
    `;

    pillsContainer.querySelectorAll('.status-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.clientListManager = btn.dataset.am;
        renderMasterClientList();
      });
    });
  }

  const filteredClients = allClients.filter((c) => {
    if (curManager !== 'ALL' && c.accountManager !== curManager) return false;
    if (q) {
      const hay = `${c.accountManager} ${c.username} ${c.clientName} ${Array.from(c.services).join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Sort by Account Manager name then Username
  filteredClients.sort((a, b) => a.accountManager.localeCompare(b.accountManager) || a.username.localeCompare(b.username));

  if (countEl) countEl.textContent = filteredClients.length;

  // 3. Render GROUPED BY ACCOUNT MANAGER (VIEW 1)
  if (groupedContainer) {
    const managersToRender = curManager === 'ALL' ? managers : [curManager];
    
    let groupedHtml = '';
    let renderedCount = 0;

    managersToRender.forEach((am) => {
      const mgrClients = filteredClients.filter(c => c.accountManager === am);
      if (q && mgrClients.length === 0) return; // If searching and this AM has no matches, skip
      
      renderedCount++;
      const mgrUnits = mgrClients.reduce((s, c) => s + c.totalUnits, 0);
      const mgrOutstanding = mgrClients.reduce((s, c) => s + c.outstandingAmt, 0);
      const mgrBilled = mgrClients.reduce((s, c) => s + c.billedAmt, 0);
      const mgrTotal = mgrClients.reduce((s, c) => s + c.totalBusiness, 0);

      const rowsHtml = mgrClients.length > 0
        ? mgrClients.map((c) => {
            const servicesArr = Array.from(c.services);
            const servicesHtml = servicesArr.length > 0
              ? servicesArr.map((s) => `<span class="service-tag" data-svc="${s}" style="margin-right:3px;">${s}</span>`).join('')
              : '<span style="color:var(--ink-muted);font-size:11px;">—</span>';
            const uInitial = (c.username || 'U').charAt(0).toUpperCase();

            return `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span class="user-avatar-badge">${uInitial}</span>
                    <strong style="font-size:13.5px;color:var(--navy);">${c.username}</strong>
                  </div>
                </td>
                <td>
                  <div style="font-weight:600;color:#334155;font-size:13px;">${c.clientName || 'Standard Client'}</div>
                </td>
                <td>
                  <div>${servicesHtml}</div>
                </td>
                <td class="tnum" style="text-align:center;">
                  <strong style="color:var(--navy);">${c.rechargesCount}</strong>
                </td>
                <td class="tnum" style="font-weight:700;color:var(--navy);">
                  ${formatNumberIN(c.totalUnits)} <small style="color:#64748b;font-weight:500;">Credits</small>
                </td>
                <td class="tnum" style="font-weight:700;color:${c.outstandingAmt > 0 ? 'var(--orange)' : 'var(--ink-muted)'};">
                  ${c.outstandingAmt > 0 ? formatCurrencyIN(c.outstandingAmt) : '₹0'}
                </td>
                <td class="tnum" style="font-weight:700;color:${c.billedAmt > 0 ? 'var(--green)' : 'var(--ink-muted)'};">
                  ${c.billedAmt > 0 ? formatCurrencyIN(c.billedAmt) : '₹0'}
                </td>
                <td class="tnum" style="font-weight:800;color:var(--navy);font-size:13.5px;">
                  ${formatCurrencyIN(c.totalBusiness)}
                </td>
                <td>
                  <a href="details.html?username=${encodeURIComponent(c.username)}${buildDateQuerySuffix()}" target="_blank" class="tbl-btn tbl-btn--view" title="View all recharges & invoices for ${c.username}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>View ↗</span>
                  </a>
                </td>
              </tr>
            `;
          }).join('')
        : `
          <tr>
            <td colspan="9" style="text-align:center;padding:24px;color:var(--ink-muted);font-style:italic;">
              No clients currently mapped under Account Manager ${am}.
            </td>
          </tr>
        `;

      groupedHtml += `
        <div class="am-group-card">
          <div class="am-group-header">
            <div class="am-group-title">
              <div class="am-group-avatar">${am.charAt(0).toUpperCase()}</div>
              <div>
                <div class="am-group-name">${am}</div>
                <div style="font-size:11.5px;color:var(--ink-secondary);">Sales &amp; Account Manager</div>
              </div>
              <span class="mono-badge" style="background:#e0f2fe;color:#0369a1;font-weight:700;font-size:11.5px;padding:3px 8px;border-radius:4px;margin-left:4px;">
                ${mgrClients.length} ${mgrClients.length === 1 ? 'Client' : 'Clients'} Mapped
              </span>
            </div>

            <div class="am-group-metrics">
              <span class="am-group-metric-badge" title="Total Volume">
                <span style="color:#64748b;">Credits:</span> <strong>${formatNumberIN(mgrUnits)}</strong>
              </span>
              <span class="am-group-metric-badge" style="background:#fff7ed;border-color:#fed7aa;" title="Pending Unbilled">
                <span style="color:#c2410c;">Unbilled:</span> <strong style="color:#ea580c;">${formatCurrencyIN(mgrOutstanding)}</strong>
              </span>
              <span class="am-group-metric-badge" style="background:#f0fdf4;border-color:#bbf7d0;" title="Billed Raised">
                <span style="color:#16a34a;">Billed:</span> <strong style="color:#16a34a;">${formatCurrencyIN(mgrBilled)}</strong>
              </span>
              <a href="details.html?am=${encodeURIComponent(am)}${buildDateQuerySuffix()}" target="_blank" class="btn btn--navy btn--sm" style="padding:4px 10px;font-size:12px;text-decoration:none;display:inline-flex;align-items:center;gap:5px;">
                <span>View Full AM Ledger ↗</span>
              </a>
            </div>
          </div>

          <div class="table-responsive">
            <table class="history-table" style="margin:0;">
              <thead>
                <tr>
                  <th>Client Username</th>
                  <th>Company / Client Name</th>
                  <th>Channels Used</th>
                  <th style="text-align:center;">Recharges</th>
                  <th>Volume (Units)</th>
                  <th>Unbilled (₹)</th>
                  <th>Billed (₹)</th>
                  <th>Total (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;
    });

    if (renderedCount === 0) {
      groupedContainer.innerHTML = `
        <div class="empty-state" style="padding:40px 20px;text-align:center;background:#ffffff;border:1px dashed var(--rule);border-radius:8px;">
          <h3>No clients found</h3>
          <p style="color:var(--ink-secondary);font-size:13px;">No clients match the current filter or search query "${q}".</p>
        </div>
      `;
    } else {
      groupedContainer.innerHTML = groupedHtml;
    }
  }

  // 4. Render MASTER TABLE (VIEW 2)
  if (tableBody) {
    if (filteredClients.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align:center;padding:32px;color:var(--ink-muted);">
            No clients found for the selected Account Manager or search query.
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = filteredClients.map((c) => {
        const servicesArr = Array.from(c.services);
        const servicesHtml = servicesArr.length > 0
          ? servicesArr.map((s) => `<span class="service-tag" data-svc="${s}" style="margin-right:3px;">${s}</span>`).join('')
          : '<span style="color:var(--ink-muted);font-size:11px;">—</span>';

        const uInitial = (c.username || 'U').charAt(0).toUpperCase();
        return `
          <tr>
            <td>
              <span class="mono-badge" style="background:#e0f2fe;color:#0369a1;font-weight:700;font-size:11.5px;padding:3px 8px;border-radius:4px;">
                ${c.accountManager}
              </span>
            </td>
            <td>
              <div style="display:flex;align-items:center;gap:10px;">
                <span class="user-avatar-badge">${uInitial}</span>
                <strong style="font-size:13.5px;color:var(--navy);">${c.username}</strong>
              </div>
            </td>
            <td>
              <div style="font-weight:600;color:#334155;font-size:13px;">${c.clientName || 'Standard Client'}</div>
            </td>
            <td>
              <div>${servicesHtml}</div>
            </td>
            <td class="tnum" style="text-align:center;">
              <strong style="color:var(--navy);">${c.rechargesCount}</strong>
            </td>
            <td class="tnum" style="font-weight:700;color:var(--navy);">
              ${formatNumberIN(c.totalUnits)} <small style="color:#64748b;font-weight:500;">Credits</small>
            </td>
            <td class="tnum" style="font-weight:700;color:${c.outstandingAmt > 0 ? 'var(--orange)' : 'var(--ink-muted)'};">
              ${c.outstandingAmt > 0 ? formatCurrencyIN(c.outstandingAmt) : '₹0'}
            </td>
            <td class="tnum" style="font-weight:700;color:${c.billedAmt > 0 ? 'var(--green)' : 'var(--ink-muted)'};">
              ${c.billedAmt > 0 ? formatCurrencyIN(c.billedAmt) : '₹0'}
            </td>
            <td class="tnum" style="font-weight:800;color:var(--navy);font-size:14px;">
              ${formatCurrencyIN(c.totalBusiness)}
            </td>
            <td>
              <a href="details.html?username=${encodeURIComponent(c.username)}${buildDateQuerySuffix()}" target="_blank" class="tbl-btn tbl-btn--view" title="View all recharges & invoices for ${c.username}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>View ↗</span>
              </a>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

const clientListSearchInput = document.getElementById('clientListSearchInput');
if (clientListSearchInput) {
  clientListSearchInput.addEventListener('input', (e) => {
    state.clientListSearchQuery = e.target.value;
    renderMasterClientList();
  });
}

const clientViewModeGroupedBtn = document.getElementById('clientViewModeGroupedBtn');
const clientViewModeTableBtn = document.getElementById('clientViewModeTableBtn');

if (clientViewModeGroupedBtn) {
  clientViewModeGroupedBtn.addEventListener('click', () => {
    state.clientListViewMode = 'grouped';
    renderMasterClientList();
  });
}

if (clientViewModeTableBtn) {
  clientViewModeTableBtn.addEventListener('click', () => {
    state.clientListViewMode = 'table';
    renderMasterClientList();
  });
}

const exportClientListBtn = document.getElementById('exportClientListBtn');
if (exportClientListBtn) {
  exportClientListBtn.addEventListener('click', () => {
    exportClientListExcel();
  });
}

function exportClientListExcel() {
  if (typeof XLSX === 'undefined') {
    showToast('Excel library loading...', 'warn');
    return;
  }
  const clientMap = {};
  (state.recharges || []).forEach((r) => {
    const am = r.accountManager || 'Unassigned';
    const uname = r.username || 'Unknown';
    const key = am + '___' + uname.toLowerCase();

    if (!clientMap[key]) {
      clientMap[key] = {
        accountManager: am,
        username: uname,
        clientName: r.clientName || '—',
        services: new Set(),
        rechargesCount: 0,
        totalUnits: 0,
        outstandingAmt: 0,
        billedAmt: 0,
        totalBusiness: 0
      };
    }

    const c = clientMap[key];
    if (r.clientName && c.clientName === '—') c.clientName = r.clientName;
    if (r.service) r.service.split('+').forEach((s) => c.services.add(s.trim()));
    c.rechargesCount++;
    c.totalUnits += Number(r.rechargeCount) || 0;
    const amt = Number(r.totalAmount) || 0;
    c.totalBusiness += amt;
    if (r.billingStatus === 'Billing Raised') {
      c.billedAmt += amt;
    } else {
      c.outstandingAmt += amt;
    }
  });

  const rows = Object.values(clientMap).map((c) => ({
    'Account Manager': c.accountManager,
    'Client Username': c.username,
    'Company / Client Name': c.clientName,
    'Channels Used': Array.from(c.services).join(', '),
    'Total Recharges': c.rechargesCount,
    'Total Volume (Units)': c.totalUnits,
    'Outstanding Amount (INR)': c.outstandingAmt,
    'Billing Raised (INR)': c.billedAmt,
    'Total Business (INR)': c.totalBusiness
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Clients_AM_Wise');
  XLSX.writeFile(wb, 'IMMNSE_Client_List_Account_Manager_Wise.xlsx');
  showToast('Client List exported to Excel successfully!', 'success');
}

const dashGoToClientsBtn = document.getElementById('dashGoToClientsBtn');
if (dashGoToClientsBtn) {
  dashGoToClientsBtn.addEventListener('click', () => {
    switchView('sales-managers');
  });
}

function renderSalesManagersSection() {
  renderMasterClientList();
  if (!amSummaryCardsGrid) return;

  const dateFiltered = getDateFilteredRecharges();
  const managerSet = new Set((state.settings.accountManagers || []).filter(m => m !== 'Yash Sharma'));
  state.recharges.forEach((r) => {
    if (r.accountManager && r.accountManager !== 'Yash Sharma') managerSet.add(r.accountManager);
  });
  const managers = Array.from(managerSet);

  amSummaryCardsGrid.innerHTML = managers
    .map((am) => {
      const amItems = dateFiltered.filter((r) => r.accountManager === am);
      const pendingItems = amItems.filter((r) => r.billingStatus !== 'Billing Raised');
      const raisedItems = amItems.filter((r) => r.billingStatus === 'Billing Raised');

      const outstandingAmt = pendingItems.reduce((s, r) => s + (Number(r.totalAmount) || 0), 0);
      const billedAmt = raisedItems.reduce((s, r) => s + (Number(r.totalAmount) || 0), 0);

      const uniqueUsers = new Set(amItems.map((r) => r.username.toLowerCase())).size;
      const isSelected = state.selectedSalesManager === am;

      return `
        <div class="am-summary-card ${isSelected ? 'selected' : ''}">
          <div class="am-summary-card__head">
            <div>
              <span class="mono-label">SALES / ACCOUNT MANAGER</span>
              <div class="am-summary-card__name">${am}</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="mono-hint tnum">${uniqueUsers} Clients</span>
              <a href="details.html?am=${encodeURIComponent(am)}${buildDateQuerySuffix()}" target="_blank" class="kpi-eye-btn" title="Open ${am}'s All Recharges & Billing in New Tab">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </a>
            </div>
          </div>

          <div class="am-summary-card__metrics">
            <div class="am-metric-box am-metric-box--outstanding">
              <div class="am-metric-box__label">UNBILLED OUTSTANDING</div>
              <div class="am-metric-box__val tnum">${formatCurrencyIN(outstandingAmt)}</div>
              <div class="am-metric-box__sub tnum">${pendingItems.length} pending recharges</div>
            </div>

            <div class="am-metric-box">
              <div class="am-metric-box__label">BILLING RAISED</div>
              <div class="am-metric-box__val tnum" style="color:var(--green);">${formatCurrencyIN(billedAmt)}</div>
              <div class="am-metric-box__sub tnum">${raisedItems.length} invoiced recharges</div>
            </div>
          </div>

          <button type="button" class="btn ${isSelected ? 'btn--accent' : 'btn--navy'} btn--block btn--sm" onclick="openSalesManagerDrilldown('${am.replace(/'/g, "\\'")}')">
            <span>View User &amp; Company Wise Details (${amItems.length})</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      `;
    })
    .join('');

  if (state.selectedSalesManager) {
    renderManagerDrilldownTables(state.selectedSalesManager);
  }
}

window.openSalesManagerDrilldown = function (amName) {
  state.selectedSalesManager = amName;
  renderSalesManagersSection();
  amDrilldownSection.classList.remove('hidden');
  amDrilldownSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function renderManagerDrilldownTables(amName) {
  drilldownTitle.textContent = `${amName} — User-Wise & Company-Wise Outstanding Details`;
  const dateFiltered = getDateFilteredRecharges();
  const amItems = dateFiltered.filter((r) => r.accountManager === amName);

  const clientGroups = {};
  amItems.forEach((r) => {
    const key = r.username.toLowerCase();
    if (!clientGroups[key]) {
      clientGroups[key] = {
        username: r.username,
        clientName: r.clientName || '—',
        services: new Set(),
        totalRecharges: 0,
        outstandingAmt: 0,
        outstandingCount: 0,
        billedAmt: 0,
        billedCount: 0,
        totalAmt: 0
      };
    }
    const g = clientGroups[key];
    if (r.clientName && g.clientName === '—') g.clientName = r.clientName;
    g.services.add(r.service);
    g.totalRecharges += 1;
    const amt = Number(r.totalAmount) || 0;
    g.totalAmt += amt;
    if (r.billingStatus === 'Billing Raised') {
      g.billedAmt += amt;
      g.billedCount += 1;
    } else {
      g.outstandingAmt += amt;
      g.outstandingCount += 1;
    }
  });

  const groupArray = Object.values(clientGroups).sort((a, b) => b.outstandingAmt - a.outstandingAmt);

  if (groupArray.length === 0) {
    amUserWiseTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--ink-muted);">No clients or recharges logged under ${amName} for selected date.</td></tr>`;
  } else {
    amUserWiseTableBody.innerHTML = groupArray
      .map(
        (g) => `
        <tr>
          <td><strong>${g.username}</strong></td>
          <td><strong>${g.clientName}</strong></td>
          <td>${Array.from(g.services).map((s) => `<span class="service-tag" data-svc="${s}" style="margin-right:4px;">${s}</span>`).join('')}</td>
          <td class="tnum">${g.totalRecharges} entries</td>
          <td class="tnum" style="color:var(--orange);font-weight:800;">
            ${formatCurrencyIN(g.outstandingAmt)}
            <div style="font-size:11px;font-weight:500;color:var(--ink-muted);">${g.outstandingCount} pending</div>
          </td>
          <td class="tnum" style="color:var(--green);font-weight:700;">
            ${formatCurrencyIN(g.billedAmt)}
            <div style="font-size:11px;font-weight:500;color:var(--ink-muted);">${g.billedCount} billed</div>
          </td>
          <td class="tnum" style="font-weight:800;">${formatCurrencyIN(g.totalAmt)}</td>
          <td>
            <a href="details.html?username=${encodeURIComponent(g.username)}${buildDateQuerySuffix()}" target="_blank" class="eye-action-btn" title="Open ${g.username}'s All Recharges & Billing in New Tab">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>View ↗</span>
            </a>
          </td>
        </tr>
      `
      )
      .join('');
  }

  if (amItems.length === 0) {
    amEntriesTableBody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--ink-muted);">No entries found.</td></tr>`;
  } else {
    amEntriesTableBody.innerHTML = amItems
      .map((item) => {
        const isPending = item.billingStatus === 'Pending';
        const isRaised = item.billingStatus === 'Billing Raised';
        const badgeClass = isPending
          ? 'status-badge--pending'
          : isRaised
          ? 'status-badge--raised'
          : 'status-badge--hold';

        const proofBtn = item.screenshotUrl
          ? `<button type="button" class="btn btn--sm btn--ghost" onclick="openImageViewer('${item.screenshotUrl}', '${item.id} · ${item.username}')">Proof</button>`
          : `<span style="color:var(--ink-muted);font-size:11px;">None</span>`;

        return `
          <tr>
            <td>
              <div style="font-family:var(--font-mono);font-weight:700;">${item.id}</div>
              <div style="font-size:11px;color:var(--ink-muted);" class="tnum">${formatDateTime(item.createdAt)}</div>
            </td>
            <td><strong>${item.username}</strong></td>
            <td>${item.clientName || '—'}</td>
            <td class="tnum"><span class="service-tag" data-svc="${item.service}">${item.service}</span> <strong>${formatNumberIN(item.rechargeCount)}</strong></td>
            <td class="tnum" style="font-weight:700;">${formatRechargeAmountCell(item, isSupportRole)}</td>
            <td><span class="status-badge ${badgeClass}">${item.billingStatus}</span></td>
            <td class="tnum">${item.invoiceNumber || '—'}</td>
            <td>${proofBtn}</td>
            <td>
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <button type="button" class="btn btn--sm btn--navy" onclick="openEditModal('${item.id}')">${isAdmin ? 'Edit' : 'View'}</button>
                <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" title="Open Full Recharge & Billing Details in New Tab">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </a>
                ${isAdmin ? `
                  <button type="button" class="btn-delete-row" onclick="deleteRechargeEntry('${item.id}', '${item.username}')" title="Delete Recharge ${item.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                ` : ''}
              </div>
            </td>
          </tr>
        `;
      })
      .join('');
  }
}

closeDrilldownBtn.addEventListener('click', () => {
  state.selectedSalesManager = null;
  amDrilldownSection.classList.add('hidden');
  renderSalesManagersSection();
});

addAmFromSalesBtn.addEventListener('click', () => {
  addManagerBtn.click();
});

// =========================================================================
// ACCOUNTS & GST FINANCIAL REPORT (PIE CHARTS, BREAKDOWNS & SUMMARY)
// =========================================================================
function getReportFilteredRecharges() {
  const mode = state.repDateMode || 'all';
  const entity = state.repFilterEntity || 'ALL';
  const invType = state.repFilterInvoiceType || 'ALL';
  const service = state.repFilterService || 'ALL';

  const now = new Date();
  const todayStr = getLocalDateYYYYMMDD(now);
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  const yesterdayStr = getLocalDateYYYYMMDD(yest);
  const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  return state.recharges.filter((item) => {
    // 1. Date Filter
    if (item.createdAt) {
      const itemDateStr = getLocalDateYYYYMMDD(new Date(item.createdAt));
      if (mode === 'today') {
        if (itemDateStr !== todayStr) return false;
      } else if (mode === 'yesterday') {
        if (itemDateStr !== yesterdayStr) return false;
      } else if (mode === 'this_month') {
        if (!itemDateStr.startsWith(currentYearMonth)) return false;
      } else if (mode === 'custom') {
        const f = state.repDateFrom;
        const t = state.repDateTo;
        if (f && t && (itemDateStr < f || itemDateStr > t)) return false;
        if (f && !t && itemDateStr < f) return false;
        if (!f && t && itemDateStr > t) return false;
      }
    }

    // 2. Billing Company Entity Filter
    if (entity !== 'ALL') {
      const itemCompany = item.billingCompany || 'Immense Air';
      if (itemCompany !== entity) return false;
    }

    // 3. Invoice Type Filter (Tax Invoice / Non GST / Proforma Invoice)
    if (invType !== 'ALL') {
      const itemType = item.invoiceType || (item.billingStatus === 'Billing Raised' ? 'Tax Invoice' : 'Unbilled');
      if (itemType !== invType) return false;
    }

    // 4. Service Channel Filter
    if (service !== 'ALL') {
      if (item.service !== service) return false;
    }

    return true;
  });
}

function renderAccountsReport() {
  if (!accountsReportPanel) return;
  const list = getReportFilteredRecharges();
  const todayStr = getLocalDateYYYYMMDD(new Date());

  // 1. Total Recharge
  const totalCount = list.length;
  const totalAmount = list.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  // 2. Total Billing Raised
  const raised = list.filter((r) => r.billingStatus === 'Billing Raised');
  const raisedAmount = raised.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);
  const raisedCount = raised.length;

  // 3. Pending Bill (Unbilled / On Hold / Pending)
  const pendingBill = list.filter((r) => r.billingStatus === 'Pending' || r.billingStatus === 'On Hold' || !r.billingStatus);
  const pendingBillAmount = pendingBill.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);
  const pendingBillCount = pendingBill.length;

  // 4. Follow-Up Items
  const followUpItems = list.filter((r) => {
    return (
      r.followUpStatus === 'Requested' ||
      r.followUpStatus === 'Updated' ||
      r.followUpStatus === 'Resolved' ||
      Boolean(r.followUpNextDate) ||
      Boolean(r.followUpAdminRemark) ||
      Boolean(r.followUpBillingRemark)
    );
  });
  const totalFollowUpCount = followUpItems.length;
  const totalFollowUpAmount = followUpItems.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  // 5. Pending Follow-Up (calls due today or overdue, or requested by admin awaiting billing action)
  const pendingFollowUpItems = followUpItems.filter((r) => {
    return (
      r.followUpStatus === 'Requested' ||
      (r.followUpNextDate &&
        r.followUpNextDate <= todayStr &&
        r.paymentStatus !== 'Received' &&
        r.paymentStatus !== 'Payment Received' &&
        r.followUpStatus !== 'Resolved')
    );
  });
  const pendingFollowUpCount = pendingFollowUpItems.length;
  const pendingFollowUpAmount = pendingFollowUpItems.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  // Updated & Resolved follow-ups
  const updatedFollowUpItems = followUpItems.filter((r) => r.followUpStatus === 'Updated');
  const updatedFollowUpCount = updatedFollowUpItems.length;
  const updatedFollowUpAmount = updatedFollowUpItems.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  const resolvedFollowUpItems = followUpItems.filter((r) => {
    return (
      r.followUpStatus === 'Resolved' ||
      r.paymentStatus === 'Received' ||
      r.paymentStatus === 'Payment Received'
    );
  });
  const resolvedFollowUpCount = resolvedFollowUpItems.length;
  const resolvedFollowUpAmount = resolvedFollowUpItems.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  // Update KPI metric elements (Hero Count + Amount Pill)
  // Card 1: Total Recharge
  const elTotalCnt = document.getElementById('repKpiTotalCount');
  if (elTotalCnt) elTotalCnt.textContent = totalCount;
  const elTotalAmt = document.getElementById('repKpiTotalAmount');
  if (elTotalAmt) elTotalAmt.textContent = formatCurrencyIN(totalAmount);

  // Card 2: Total Billing Raised
  const elRaisedCnt = document.getElementById('repKpiRaisedCount');
  if (elRaisedCnt) elRaisedCnt.textContent = raisedCount;
  const elRaisedAmt = document.getElementById('repKpiRaisedAmount');
  if (elRaisedAmt) elRaisedAmt.textContent = formatCurrencyIN(raisedAmount);
  const elRaisedPct = document.getElementById('repKpiRaisedPct');
  const raisedPctVal = totalCount > 0 ? ((raisedCount / totalCount) * 100).toFixed(1) : '0';
  if (elRaisedPct) elRaisedPct.textContent = `${raisedPctVal}% of recharges invoiced`;

  // Card 3: Pending Bill
  const elPendingBillCnt = document.getElementById('repKpiPendingBillCount');
  if (elPendingBillCnt) elPendingBillCnt.textContent = pendingBillCount;
  const elPendingBillAmt = document.getElementById('repKpiPendingBillAmount');
  if (elPendingBillAmt) elPendingBillAmt.textContent = formatCurrencyIN(pendingBillAmount);
  const elPendingBillPct = document.getElementById('repKpiPendingBillPct');
  const pendingBillPctVal = totalCount > 0 ? ((pendingBillCount / totalCount) * 100).toFixed(1) : '0';
  if (elPendingBillPct) elPendingBillPct.textContent = `${pendingBillPctVal}% awaiting billing verification`;

  // Card 4: Total Follow-Up
  const elTotalFuCnt = document.getElementById('repKpiTotalFollowUpCount');
  if (elTotalFuCnt) elTotalFuCnt.textContent = totalFollowUpCount;
  const elTotalFuAmt = document.getElementById('repKpiTotalFollowUpAmount');
  if (elTotalFuAmt) elTotalFuAmt.textContent = formatCurrencyIN(totalFollowUpAmount);

  // Card 5: Pending Follow-Up
  const elPendingFuCnt = document.getElementById('repKpiPendingFollowUpCount');
  if (elPendingFuCnt) elPendingFuCnt.textContent = pendingFollowUpCount;
  const elPendingFuAmt = document.getElementById('repKpiPendingFollowUpAmount');
  if (elPendingFuAmt) elPendingFuAmt.textContent = formatCurrencyIN(pendingFollowUpAmount);
  const elPendingFuSub = document.getElementById('repKpiPendingFollowUpSub');
  if (elPendingFuSub) {
    elPendingFuSub.textContent = pendingFollowUpCount > 0 ? `${pendingFollowUpCount} calls due / action required` : 'No overdue calls pending';
  }

  // Summary Text
  const summaryEl = document.getElementById('repActiveSummary');
  if (summaryEl) {
    let dLabel = 'All Dates';
    if (state.repDateMode === 'today') dLabel = 'Today';
    else if (state.repDateMode === 'yesterday') dLabel = 'Yesterday';
    else if (state.repDateMode === 'this_month') dLabel = 'This Month';
    else if (state.repDateMode === 'custom') dLabel = `${state.repDateFrom || 'Start'} to ${state.repDateTo || 'End'}`;
    summaryEl.textContent = `Filtered: ${dLabel} · ${list.length} Records (Total: ${formatCurrencyIN(totalAmount)})`;
  }

  // Render Visual Pie Charts (Focused on Counts & Ratios)
  renderReportCharts({
    totalAmount,
    totalCount,
    raisedAmount,
    raisedCount,
    pendingBillAmount,
    pendingBillCount,
    followUpItems,
    totalFollowUpCount,
    totalFollowUpAmount,
    pendingFollowUpCount,
    pendingFollowUpAmount,
    updatedFollowUpCount,
    updatedFollowUpAmount,
    resolvedFollowUpCount,
    resolvedFollowUpAmount,
    list
  });

  // Render Table Breakdown
  renderReportSummaryTable({
    totalAmount,
    totalCount,
    raised,
    raisedAmount,
    pendingBill,
    pendingBillAmount,
    followUpItems,
    totalFollowUpCount,
    totalFollowUpAmount,
    pendingFollowUpItems,
    pendingFollowUpCount,
    pendingFollowUpAmount,
    updatedFollowUpItems,
    updatedFollowUpCount,
    updatedFollowUpAmount,
    resolvedFollowUpItems,
    resolvedFollowUpCount,
    resolvedFollowUpAmount
  });
}

function renderReportCharts(data) {
  if (typeof Chart === 'undefined') return;

  // Cleanly destroy previous chart instances
  ['financial', 'followUp', 'tax', 'entity', 'channel'].forEach((key) => {
    if (state.chartInstances && state.chartInstances[key]) {
      state.chartInstances[key].destroy();
      state.chartInstances[key] = null;
    }
  });

  // =========================================================================
  // PIE CHART 1: Billing Status by COUNT (Billing Raised vs Pending Bills)
  // =========================================================================
  const canvasFin = document.getElementById('repChartFinancialCanvas');
  if (canvasFin) {
    const ctxFin = canvasFin.getContext('2d');
    const hasBillingData = (data.raisedCount + data.pendingBillCount) > 0;

    state.chartInstances.financial = new Chart(ctxFin, {
      type: 'pie',
      data: {
        labels: hasBillingData
          ? [`Billing Raised (${data.raisedCount})`, `Pending Bills (${data.pendingBillCount})`]
          : ['No Records in Filter'],
        datasets: [{
          data: hasBillingData
            ? [data.raisedCount, data.pendingBillCount]
            : [1],
          backgroundColor: hasBillingData
            ? ['#10B981', '#FF6418']
            : ['#E2E8F0'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 14,
              font: { family: 'Geist, sans-serif', size: 12, weight: '600' },
              padding: 14
            }
          },
          tooltip: {
            callbacks: {
              label: (c) => {
                if (!hasBillingData) return 'No data';
                const count = c.raw || 0;
                const total = (data.raisedCount + data.pendingBillCount) || 1;
                const pct = ((count / total) * 100).toFixed(1);
                const amt = c.dataIndex === 0 ? data.raisedAmount : data.pendingBillAmount;
                return ` ${c.label}: ${count} records (${formatCurrencyIN(amt)} · ${pct}%)`;
              }
            }
          }
        }
      }
    });

    const finStatsRow = document.getElementById('repFinStatsRow');
    if (finStatsRow) {
      finStatsRow.innerHTML = `
        <div class="chart-stat-item"><span class="chart-stat-dot" style="background:#0D1B33;"></span>Total Recharges: <strong>${data.totalCount} entries</strong> (${formatCurrencyIN(data.totalAmount)})</div>
        <div class="chart-stat-item"><span class="chart-stat-dot" style="background:#10B981;"></span>Billing Raised: <strong>${data.raisedCount} billed</strong> (${formatCurrencyIN(data.raisedAmount)})</div>
        <div class="chart-stat-item"><span class="chart-stat-dot" style="background:#FF6418;"></span>Pending Bills: <strong>${data.pendingBillCount} pending</strong> (${formatCurrencyIN(data.pendingBillAmount)})</div>
      `;
    }
  }

  // =========================================================================
  // PIE CHART 2: Payment Follow-Up Status by COUNT
  // =========================================================================
  const canvasFu = document.getElementById('repChartFollowUpCanvas');
  if (canvasFu) {
    const ctxFu = canvasFu.getContext('2d');
    const hasFollowUpData = data.totalFollowUpCount > 0;

    const fuPending = data.pendingFollowUpCount;
    const fuUpdated = data.updatedFollowUpCount;
    const fuResolved = data.resolvedFollowUpCount;

    state.chartInstances.followUp = new Chart(ctxFu, {
      type: 'pie',
      data: {
        labels: hasFollowUpData
          ? [`Pending Calls (${fuPending})`, `Follow-Up Done (${fuUpdated})`, `Resolved / Paid (${fuResolved})`]
          : ['No Follow-Up Records in Filter'],
        datasets: [{
          data: hasFollowUpData
            ? [fuPending, fuUpdated, fuResolved]
            : [1],
          backgroundColor: hasFollowUpData
            ? ['#EA580C', '#10B981', '#0284C7']
            : ['#E2E8F0'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 14,
              font: { family: 'Geist, sans-serif', size: 12, weight: '600' },
              padding: 14
            }
          },
          tooltip: {
            callbacks: {
              label: (c) => {
                if (!hasFollowUpData) return 'No follow-up records';
                const cases = c.raw || 0;
                const total = data.totalFollowUpCount || 1;
                const pct = ((cases / total) * 100).toFixed(1);
                return ` ${c.label}: ${cases} cases (${pct}% of follow-ups)`;
              }
            }
          }
        }
      }
    });

    const fuStatsRow = document.getElementById('repFollowUpStatsRow');
    if (fuStatsRow) {
      fuStatsRow.innerHTML = `
        <div class="chart-stat-item"><span class="chart-stat-dot" style="background:#0D1B33;"></span>Total Follow-Ups: <strong>${data.totalFollowUpCount} Cases</strong></div>
        <div class="chart-stat-item"><span class="chart-stat-dot" style="background:#EA580C;"></span>Pending Calls: <strong>${data.pendingFollowUpCount} Cases</strong></div>
        <div class="chart-stat-item"><span class="chart-stat-dot" style="background:#10B981;"></span>Done / Resolved: <strong>${data.updatedFollowUpCount + data.resolvedFollowUpCount} Cases</strong></div>
      `;
    }
  }
}

function renderReportSummaryTable(data) {
  const tbody = document.getElementById('repSummaryTableBody');
  if (!tbody) return;

  const total = data.totalAmount || 1;
  const rows = [
    {
      name: 'Total Billing Raised',
      items: data.raised,
      amt: data.raisedAmount,
      status: '<span class="status-badge status-badge--raised">✓ Billing Raised</span>'
    },
    {
      name: 'Pending Bill (Unbilled / Under Review)',
      items: data.pendingBill,
      amt: data.pendingBillAmount,
      status: '<span class="status-badge status-badge--pending">⏳ Pending Bill</span>'
    },
    {
      name: 'Payment Follow-Up: Pending Action / Call Due',
      items: data.pendingFollowUpItems,
      amt: data.pendingFollowUpAmount,
      status: '<span class="status-badge" style="background:#FFF7ED;color:#C2410C;border:1px solid #FFEDD5;">⚠️ Follow-Up Pending</span>'
    },
    {
      name: 'Payment Follow-Up: Done / Updated with Proof',
      items: data.updatedFollowUpItems,
      amt: data.updatedFollowUpAmount,
      status: '<span class="status-badge status-badge--raised">🟢 Follow-Up Done</span>'
    },
    {
      name: 'Payment Follow-Up: Resolved / Payment Realized',
      items: data.resolvedFollowUpItems,
      amt: data.resolvedFollowUpAmount,
      status: '<span class="status-badge" style="background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;">✓ Follow-Up Resolved</span>'
    }
  ];

  tbody.innerHTML = rows.map((r) => {
    const units = r.items.reduce((sum, item) => sum + (Number(item.rechargeCount) || 0), 0);
    const pct = ((r.amt / total) * 100).toFixed(1);
    return `
      <tr>
        <td><strong>${r.name}</strong></td>
        <td class="tnum">${r.items.length} records</td>
        <td class="tnum">${formatNumberIN(units)} units</td>
        <td class="tnum" style="font-weight:700;">${formatCurrencyIN(r.amt)}</td>
        <td class="tnum">${data.totalAmount > 0 ? pct + '%' : '0%'}</td>
        <td>${r.status}</td>
      </tr>
    `;
  }).join('') + `
    <tr style="background:var(--paper);font-weight:800;border-top:2px solid var(--rule-strong);">
      <td>TOTAL AUDITED RECHARGE VOLUME</td>
      <td class="tnum">${data.totalCount} records</td>
      <td class="tnum">${formatNumberIN(data.raised.concat(data.pendingBill).reduce((s, i) => s + (Number(i.rechargeCount) || 0), 0))} units</td>
      <td class="tnum" style="color:var(--navy);font-size:15px;">${formatCurrencyIN(data.totalAmount)}</td>
      <td class="tnum">100.0%</td>
      <td><span class="mono-badge">AUDITED TOTAL</span></td>
    </tr>
  `;
}

function exportReportCsv() {
  const list = getReportFilteredRecharges();
  if (list.length === 0) {
    showToast('No records found for current filter to export.');
    return;
  }
  const headers = [
    'Recharge ID',
    'Created Date',
    'Client Username',
    'Client / Company Name',
    'CPaaS Service',
    'Credits / Units',
    'Rate',
    'Total Billable Amount (INR)',
    'Account Manager',
    'Billing Status',
    'Billing Company',
    'Invoice Type',
    'Invoice Number',
    'Billed Date',
    'Billing Remarks'
  ];
  const escapeCsv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = list.map((r) => [
    r.id,
    r.createdAt ? new Date(r.createdAt).toLocaleString('en-IN') : '',
    r.username,
    r.clientName,
    r.service,
    r.rechargeCount,
    r.ratePerUnit || 0,
    r.totalAmount || 0,
    r.accountManager,
    r.billingStatus,
    r.billingCompany || 'Immense Air',
    r.invoiceType || (r.billingStatus === 'Billing Raised' ? 'Tax Invoice' : 'Unbilled'),
    r.invoiceNumber || '',
    r.billedAt ? new Date(r.billedAt).toLocaleString('en-IN') : '',
    r.billingRemarks || ''
  ]);
  const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows.map((r) => r.map(escapeCsv).join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ImmenseAir_Accounts_Report_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Accounts & GST Report exported to CSV');
}

// REPORT CONTROLS EVENT LISTENERS
const repDateQuickPills = document.getElementById('repDateQuickPills');
const mobileRepDateSelect = document.getElementById('mobileRepDateSelect');

if (repDateQuickPills) {
  repDateQuickPills.addEventListener('click', (e) => {
    const btn = e.target.closest('.date-pill');
    if (!btn) return;
    const mode = btn.dataset.repdate;
    state.repDateMode = mode;
    repDateQuickPills.querySelectorAll('.date-pill').forEach((b) => b.classList.toggle('active', b === btn));
    if (mobileRepDateSelect) {
      mobileRepDateSelect.value = mode;
    }
    const customBox = document.getElementById('repCustomDateInputs');
    if (customBox) {
      customBox.style.display = mode === 'custom' ? (window.innerWidth <= 900 ? 'grid' : 'flex') : 'none';
    }
    if (mode !== 'custom') {
      renderAccountsReport();
    }
  });
}

if (mobileRepDateSelect) {
  mobileRepDateSelect.addEventListener('change', (e) => {
    const mode = e.target.value;
    state.repDateMode = mode;
    if (repDateQuickPills) {
      repDateQuickPills.querySelectorAll('.date-pill').forEach((b) => b.classList.toggle('active', b.dataset.repdate === mode));
    }
    const customBox = document.getElementById('repCustomDateInputs');
    if (customBox) {
      customBox.style.display = mode === 'custom' ? (window.innerWidth <= 900 ? 'grid' : 'flex') : 'none';
    }
    if (mode !== 'custom') {
      renderAccountsReport();
    }
  });
}

const repApplyCustomDateBtn = document.getElementById('repApplyCustomDateBtn');
if (repApplyCustomDateBtn) {
  repApplyCustomDateBtn.addEventListener('click', () => {
    state.repDateFrom = document.getElementById('repDateFrom')?.value || '';
    state.repDateTo = document.getElementById('repDateTo')?.value || '';
    renderAccountsReport();
  });
}

const repFilterEntity = document.getElementById('repFilterEntity');
if (repFilterEntity) {
  repFilterEntity.addEventListener('change', (e) => {
    state.repFilterEntity = e.target.value;
    renderAccountsReport();
  });
}

const repFilterInvoiceType = document.getElementById('repFilterInvoiceType');
if (repFilterInvoiceType) {
  repFilterInvoiceType.addEventListener('change', (e) => {
    state.repFilterInvoiceType = e.target.value;
    renderAccountsReport();
  });
}

const repFilterService = document.getElementById('repFilterService');
if (repFilterService) {
  repFilterService.addEventListener('change', (e) => {
    state.repFilterService = e.target.value;
    renderAccountsReport();
  });
}

const repResetFiltersBtn = document.getElementById('repResetFiltersBtn');
if (repResetFiltersBtn) {
  repResetFiltersBtn.addEventListener('click', () => {
    state.repDateMode = 'all';
    state.repDateFrom = '';
    state.repDateTo = '';
    state.repFilterEntity = 'ALL';
    state.repFilterInvoiceType = 'ALL';
    state.repFilterService = 'ALL';
    if (repDateQuickPills) {
      repDateQuickPills.querySelectorAll('.date-pill').forEach((b) => b.classList.toggle('active', b.dataset.repdate === 'all'));
    }
    if (mobileRepDateSelect) {
      mobileRepDateSelect.value = 'all';
    }
    const customBox = document.getElementById('repCustomDateInputs');
    if (customBox) customBox.style.display = 'none';
    const dFrom = document.getElementById('repDateFrom');
    if (dFrom) dFrom.value = '';
    const dTo = document.getElementById('repDateTo');
    if (dTo) dTo.value = '';
    if (repFilterEntity) repFilterEntity.value = 'ALL';
    if (repFilterInvoiceType) repFilterInvoiceType.value = 'ALL';
    if (repFilterService) repFilterService.value = 'ALL';
    renderAccountsReport();
  });
}

const repExportCsvBtn = document.getElementById('repExportCsvBtn');
if (repExportCsvBtn) {
  repExportCsvBtn.addEventListener('click', exportReportCsv);
}

// =========================================================================
// SCREENSHOT UPLOAD & FORM SUBMISSION
// =========================================================================
async function handleSelectedFile(file) {
  if (!file) return;
  try {
    const dataUrl = await fileToDataUrl(file);
    state.currentScreenshotData = dataUrl;
    state.currentScreenshotName = file.name || 'approval_proof.jpg';

    uploadPreviewImg.src = dataUrl;
    uploadFileName.textContent = state.currentScreenshotName;
    uploadEmpty.classList.add('hidden');
    uploadPreviewContainer.classList.remove('hidden');
    showToast('Approval screenshot attached');
  } catch (e) {
    showToast('Could not read selected image');
  }
}

uploadZone.addEventListener('click', (e) => {
  if (e.target === removeImgBtn) return;
  screenshotInput.click();
});

screenshotInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    handleSelectedFile(e.target.files[0]);
  }
});

removeImgBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  state.currentScreenshotData = '';
  state.currentScreenshotName = '';
  screenshotInput.value = '';
  uploadPreviewContainer.classList.add('hidden');
  uploadEmpty.classList.remove('hidden');
});

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});
uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('dragover');
});
uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    handleSelectedFile(e.dataTransfer.files[0]);
  }
});

async function handleCampaignSelectedFile(file) {
  if (!file) return;
  try {
    const dataUrl = await fileToDataUrl(file);
    state.currentCampaignFileData = dataUrl;
    state.currentCampaignFileName = file.name || 'campaign_proof.png';

    if (campaignUploadPreviewImg) {
      if (file.type && file.type.startsWith('image/')) {
        campaignUploadPreviewImg.src = dataUrl;
        campaignUploadPreviewImg.style.display = 'block';
      } else {
        campaignUploadPreviewImg.style.display = 'none';
      }
    }
    if (campaignUploadFileName) campaignUploadFileName.textContent = state.currentCampaignFileName;
    if (campaignUploadEmpty) campaignUploadEmpty.classList.add('hidden');
    if (campaignUploadPreviewContainer) campaignUploadPreviewContainer.classList.remove('hidden');
    showToast(`Campaign file attached: ${state.currentCampaignFileName}`);
  } catch (err) {
    showToast('Failed to attach campaign file');
  }
}

window.addEventListener('paste', (e) => {
  if (!state.currentUser) return;
  const items = (e.clipboardData || e.originalEvent.clipboardData)?.items;
  if (!items) return;
  for (const item of items) {
    if (item.type.indexOf('image') === 0) {
      const file = item.getAsFile();
      if (state.activeView === 'external-campaign') {
        handleCampaignSelectedFile(file);
      } else {
        handleSelectedFile(file);
      }
      break;
    }
  }
});

// Multi-Channel Service Chips & Dynamic Units Inputs
function renderChannelUnitsInputs() {
  const wrapper = document.getElementById('channelUnitsWrapper');
  if (!wrapper) return;

  const channels = state.selectedChannels && state.selectedChannels.length > 0 ? state.selectedChannels : ['SMS'];
  state.selectedChannels = channels;

  // Single-channel mode (standard clean look)
  if (channels.length === 1) {
    const svc = channels[0];
    const curVal = state.channelUnits[svc] !== undefined ? state.channelUnits[svc] : '';
    wrapper.innerHTML = `
      <div class="form-label-row">
        <label class="form-label" for="rechargeCount">04. ${svc} Credits / Units <span class="req">*</span></label>
        <div class="preset-chips">
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="10000">10K</button>
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="50000">50K</button>
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="100000">1L</button>
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="500000">5L</button>
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="1000000">10L</button>
        </div>
      </div>
      <input type="number" id="rechargeCount" class="form-input form-input--lg tnum channel-unit-input" data-service="${svc}" value="${curVal}" placeholder="Enter credit quantity (e.g. 50000)" min="1" required />
    `;
    attachChannelUnitListeners();
    return;
  }

  // Multi-channel mode (e.g. SMS + RCS + WhatsApp together in 1 entry!)
  let rowsHtml = channels.map((svc) => {
    const curVal = state.channelUnits[svc] !== undefined ? state.channelUnits[svc] : '';
    return `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;background:white;padding:10px 14px;border-radius:6px;border:1px solid var(--rule);">
        <div style="min-width:140px;display:flex;align-items:center;gap:8px;">
          <span class="service-tag" data-svc="${svc}">${svc}</span>
          <strong style="font-size:13px;color:var(--navy);">${svc}:</strong>
        </div>
        <input type="number" class="form-input tnum channel-unit-input" data-service="${svc}" value="${curVal}" placeholder="Enter ${svc} units (e.g. 25000)" min="1" required style="flex:1;min-width:140px;" />
        <div class="preset-chips">
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="10000">10K</button>
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="50000">50K</button>
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="100000">1L</button>
          <button type="button" class="preset-btn tnum" data-svc="${svc}" data-count="500000">5L</button>
        </div>
      </div>
    `;
  }).join('');

  const totalSum = calculateMultiChannelTotal();

  wrapper.innerHTML = `
    <div style="background:var(--paper-subtle);border:1px solid var(--rule);border-radius:8px;padding:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div>
          <strong style="font-size:13.5px;color:var(--navy);">04. Units for Each Selected Channel:</strong>
          <span style="font-size:12px;color:var(--ink-secondary);display:block;margin-top:2px;">All ${channels.length} channels will be combined into <strong>1 single entry</strong> for Tally billing</span>
        </div>
        <span class="badge badge--navy" style="font-size:11px;font-weight:700;">${channels.length} Channels in 1 Entry</span>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        ${rowsHtml}
      </div>

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--rule);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <span style="font-size:13px;color:var(--ink-secondary);">Total Combined Recharge Units:</span>
        <strong class="tnum" style="font-size:16px;color:var(--accent);" id="multiChannelTotalBadge">${formatNumberIN(totalSum)} Units</strong>
      </div>
    </div>
  `;
  attachChannelUnitListeners();
}

function calculateMultiChannelTotal() {
  const channels = state.selectedChannels || ['SMS'];
  return channels.reduce((sum, svc) => {
    return sum + (Number(state.channelUnits[svc]) || 0);
  }, 0);
}

function attachChannelUnitListeners() {
  document.querySelectorAll('.channel-unit-input').forEach((input) => {
    input.addEventListener('input', (e) => {
      const svc = e.target.dataset.service;
      state.channelUnits[svc] = e.target.value;
      const totalBadge = document.getElementById('multiChannelTotalBadge');
      if (totalBadge) {
        totalBadge.textContent = `${formatNumberIN(calculateMultiChannelTotal())} Units`;
      }
    });
  });

  document.querySelectorAll('#channelUnitsWrapper .preset-btn[data-svc]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const svc = btn.dataset.svc;
      const count = btn.dataset.count;
      state.channelUnits[svc] = count;
      const input = document.querySelector(`.channel-unit-input[data-service="${svc}"]`);
      if (input) input.value = count;
      const totalBadge = document.getElementById('multiChannelTotalBadge');
      if (totalBadge) {
        totalBadge.textContent = `${formatNumberIN(calculateMultiChannelTotal())} Units`;
      }
    });
  });
}

// Multi-selection for serviceChips
if (serviceChips) {
  serviceChips.addEventListener('click', (e) => {
    const btn = e.target.closest('.service-chip');
    if (!btn) return;
    const svc = btn.dataset.service;
    if (!state.selectedChannels) state.selectedChannels = ['SMS'];

    const idx = state.selectedChannels.indexOf(svc);
    if (idx !== -1) {
      if (state.selectedChannels.length > 1) {
        state.selectedChannels.splice(idx, 1);
        btn.classList.remove('active');
        delete state.channelUnits[svc];
      } else {
        showToast('At least 1 CPaaS service channel must be selected');
      }
    } else {
      state.selectedChannels.push(svc);
      btn.classList.add('active');
      if (!state.channelUnits[svc]) state.channelUnits[svc] = '';
    }

    if (selectedServiceInput) {
      selectedServiceInput.value = state.selectedChannels.join(' + ');
    }
    renderChannelUnitsInputs();
  });
}

// Initial render of channel units inputs
renderChannelUnitsInputs();

addManagerBtn.addEventListener('click', async () => {
  const name = prompt('Enter New Sales / Account Manager Full Name:');
  if (!name || !name.trim()) return;
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newAccountManager: name.trim() })
    });
    const data = await res.json();
    if (data.settings) {
      state.settings = data.settings;
      populateAccountManagers();
      accountManagerSelect.value = name.trim();
      updateDashboardStats();
      renderSalesManagersSection();
      showToast(`Account Manager added: ${name.trim()}`);
    }
  } catch (e) {
    showToast('Failed to add Account Manager');
  }
});

rechargeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Saving Recharge Entry...</span>';

  try {
    const channels = state.selectedChannels && state.selectedChannels.length > 0 ? state.selectedChannels : ['SMS'];
    const servicesList = [];
    let totalUnits = 0;

    channels.forEach((svc) => {
      const count = Number(state.channelUnits[svc]) || 0;
      if (count > 0) {
        servicesList.push({ service: svc, count });
        totalUnits += count;
      }
    });

    if (servicesList.length === 0) {
      showToast('Please enter recharge units for the selected channel(s)');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Submit Recharge Entry</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
      return;
    }

    const combinedServiceName = servicesList.map((s) => s.service).join(' + ');
    const detailStr = servicesList.map((s) => `${s.service}: ${formatNumberIN(s.count)}`).join(' | ');

    const payload = {
      username: document.getElementById('username').value.trim(),
      clientName: document.getElementById('clientName') ? document.getElementById('clientName').value.trim() : '',
      service: combinedServiceName,
      servicesList: servicesList,
      servicesDetail: detailStr,
      rechargeCount: totalUnits,
      ratePerUnit: 0,
      totalAmount: 0,
      accountManager: accountManagerSelect.value,
      source: document.getElementById('source').value,
      remarks: document.getElementById('remarks').value.trim(),
      submittedBy: state.currentUser?.username || 'support',
      screenshotData: state.currentScreenshotData,
      screenshotName: state.currentScreenshotName
    };

    const res = await fetch('/api/recharges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Submission failed');

    document.getElementById('username').value = '';
    state.selectedChannels = ['SMS'];
    state.channelUnits = { SMS: '' };
    if (serviceChips) {
      serviceChips.querySelectorAll('.service-chip').forEach((c) => {
        c.classList.toggle('active', c.dataset.service === 'SMS');
      });
    }
    renderChannelUnitsInputs();
    document.getElementById('remarks').value = '';
    removeImgBtn.click();

    await fetchAllData();
    showToast(`Logged ${result.entry.id} (${combinedServiceName}) — Sent to Billing!`);
    if (state.currentUser?.role === 'support') {
      switchRechargeSubTab('form');
    } else {
      switchRechargeSubTab('history');
    }
  } catch (err) {
    showToast(`Error: ${err.message}`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Submit Recharge Entry</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  }
});

// =========================================================================
// BILLING DEPT & ADMIN STATUS ACTIONS (STRICT ROLE ENFORCEMENT)
// =========================================================================
window.quickMarkBillingRaised = function (id) {
  if (state.currentUser?.role !== 'accounts') {
    showToast('Permission Denied: Only Billing Department can update billing status.');
    return;
  }
  openEditModal(id);
  const raisedRadio = document.querySelector('input[name="editBillingStatus"][value="Billing Raised"]');
  if (raisedRadio) raisedRadio.checked = true;
};

window.quickMarkPending = async function (id) {
  if (state.currentUser?.role !== 'accounts') {
    showToast('Permission Denied: Only Billing Department can update billing status.');
    return;
  }

  try {
    const res = await fetch(`/api/recharges/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userRole: state.currentUser?.role,
        billingStatus: 'Pending'
      })
    });
    if (res.ok) {
      await fetchAllData();
      showToast(`${id} moved back to Pending Billing`);
    } else {
      showToast('Failed to update status');
    }
  } catch (e) {
    showToast('Failed to update status');
  }
};

window.quickAcknowledgeRecharge = async function (id) {
  try {
    const nowIso = new Date().toISOString();
    const ackName = state.currentUser?.name || 'Accounts Department';
    
    // 1. Instantly update in-memory state so UI updates in 0 milliseconds!
    const localItem = (state.recharges || []).find((r) => r.id === id);
    if (localItem) {
      localItem.acknowledged = true;
      localItem.acknowledgedAt = nowIso;
      localItem.acknowledgedBy = ackName;
    }
    updateDashboardStats();
    renderRecords();
    renderHistoryTable();

    // 2. Persist to backend
    const res = await fetch(`/api/recharges/${encodeURIComponent(id)}/acknowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acknowledgedBy: ackName })
    });
    if (res.ok) {
      showToast(`✓ Acknowledged ${id} (Seen by Accounts)`);
      await fetchAllData();
    } else {
      showToast('Failed to acknowledge entry');
    }
  } catch (e) {
    showToast('Failed to acknowledge entry');
  }
};

window.acknowledgeAllPending = async function () {
  try {
    const nowIso = new Date().toISOString();
    const ackName = state.currentUser?.name || 'Accounts Department';

    // 1. Instantly update in-memory state
    (state.recharges || []).forEach((r) => {
      if (r.billingStatus === 'Pending') {
        r.acknowledged = true;
        r.acknowledgedAt = nowIso;
        r.acknowledgedBy = ackName;
      }
    });
    updateDashboardStats();
    renderRecords();
    renderHistoryTable();

    // 2. Persist to backend
    const res = await fetch('/api/recharges/acknowledge-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acknowledgedBy: ackName })
    });
    if (res.ok) {
      const data = await res.json();
      showToast(`✓ All pending recharges acknowledged (${data.count} entries seen)`);
      await fetchAllData();
    } else {
      showToast('Failed to acknowledge entries');
    }
  } catch (e) {
    showToast('Failed to acknowledge entries');
  }
};

window.deleteRechargeEntry = async function (id, username) {
  if (state.currentUser?.role !== 'admin') {
    showToast('Permission Denied: Only Admin can delete recharge records.');
    return;
  }

  const label = username ? `"${username}" (${id})` : `record ${id}`;
  if (!confirm(`Are you sure you want to permanently delete recharge ${label}?\nThis action cannot be undone.`)) {
    return;
  }

  try {
    const res = await fetch(`/api/recharges/${encodeURIComponent(id)}?userRole=${encodeURIComponent(state.currentUser?.role || '')}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      showToast(`Deleted ${id} permanently`);
      await fetchAllData();
    } else {
      showToast('Failed to delete recharge entry');
    }
  } catch (err) {
    showToast('Error deleting recharge entry');
  }
};

window.openEditModal = function (id) {
  const item = state.recharges.find((r) => r.id === id);
  if (!item) return;

  const isAccounts = state.currentUser?.role === 'accounts';
  const isSupport = state.currentUser?.role === 'support';
  const isAdmin = state.currentUser?.role === 'admin';
  const isSupportRole = state.currentUser?.role === 'support';

  state.editScreenshotData = '';
  state.editScreenshotName = '';

  const screenshotEl = document.getElementById('editScreenshotInput');
  if (screenshotEl) {
    screenshotEl.value = '';
    screenshotEl.disabled = isAccounts;
    screenshotEl.classList.toggle('hidden', isAccounts);
  }

  document.getElementById('editModalId').textContent = item.id;
  document.getElementById('editEntryId').value = item.id;
  
  const editUsernameInput = document.getElementById('editUsername');
  if (editUsernameInput) {
    editUsernameInput.value = item.username;
    editUsernameInput.readOnly = isAccounts;
    if (isAccounts) {
      editUsernameInput.style.backgroundColor = '#f1f5f9';
      editUsernameInput.style.cursor = 'not-allowed';
      editUsernameInput.style.color = '#334155';
      editUsernameInput.title = 'Panel Username is set by Support / Sales and is locked for Accounts.';
    } else {
      editUsernameInput.style.backgroundColor = '';
      editUsernameInput.style.cursor = '';
      editUsernameInput.style.color = '';
      editUsernameInput.removeAttribute('title');
    }
  }
  const editUsernameLockTag = document.getElementById('editUsernameLockTag');
  if (editUsernameLockTag) {
    editUsernameLockTag.classList.toggle('hidden', !isAccounts);
  }

  document.getElementById('editClientName').value = item.clientName || '';
  
  const editServiceInput = document.getElementById('editService');
  if (editServiceInput) {
    editServiceInput.value = item.service || 'SMS';
  }

  // Determine services breakdown (SMS, RCS, WhatsApp, etc.)
  let services = [];
  if (Array.isArray(item.servicesList) && item.servicesList.length > 0) {
    services = item.servicesList;
  } else if (item.service && item.service.includes('+')) {
    const parts = item.service.split('+').map((p) => p.trim());
    const avg = Math.round(item.rechargeCount / parts.length);
    services = parts.map((p) => ({ service: p, count: avg, rate: item.ratePerUnit || '' }));
  } else {
    services = [
      { service: item.service || 'SMS', count: item.rechargeCount, rate: item.ratePerUnit || '' }
    ];
  }

  // Populate interactive Per-Service Rate inputs (SMS ke samne SMS ka rate, RCS ke samne RCS ka rate)
  const ratesContainer = document.getElementById('editRatesContainer');
  if (ratesContainer) {
    ratesContainer.innerHTML = services.map((s) => {
      const rateVal = s.rate !== undefined && s.rate !== null && s.rate !== '' ? s.rate : '';
      const subtotal = rateVal !== '' ? (s.count * Number(rateVal)).toFixed(2) : '0.00';
      return `
        <div class="edit-rate-row" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;background:white;padding:12px 14px;border-radius:6px;border:1px solid var(--rule);margin-bottom:8px;">
          <div style="min-width:140px;display:flex;align-items:center;gap:8px;">
            <span class="service-tag" data-svc="${s.service}">${s.service}</span>
            <div>
              <strong style="font-size:13.5px;color:var(--navy);display:block;">${s.service}</strong>
              <span style="font-size:12px;color:var(--ink-secondary);font-weight:600;" class="tnum">${formatNumberIN(s.count)} Units</span>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:210px;justify-content:flex-end;">
            <label style="font-size:12px;color:var(--ink-muted);font-weight:700;margin:0;">Rate (₹):</label>
            <input type="number" class="form-input tnum edit-rate-field" data-service="${s.service}" data-count="${s.count}" value="${rateVal}" placeholder="e.g. 0.12" step="0.0001" min="0" style="width:115px;font-weight:700;color:var(--navy);" />
            <span style="font-size:12px;color:var(--ink-muted);">=</span>
            <strong class="tnum edit-rate-subtotal" data-service="${s.service}" style="font-size:14px;color:var(--navy);min-width:90px;text-align:right;">₹${formatNumberIN(subtotal)}</strong>
          </div>
        </div>
      `;
    }).join('');

    ratesContainer.querySelectorAll('.edit-rate-field').forEach((input) => {
      input.addEventListener('input', recalcEditModalTotals);
    });
  }

  const editGstToggle = document.getElementById('editGstToggle');
  if (editGstToggle) {
    if (item.gstEnabled !== undefined) {
      editGstToggle.checked = Boolean(item.gstEnabled);
    } else {
      editGstToggle.checked = (item.invoiceType !== 'Non GST');
    }
    editGstToggle.disabled = isSupport;
  }

  const editAmSelect = document.getElementById('editAccountManager');
  if (editAmSelect) {
    editAmSelect.value = item.accountManager;
    editAmSelect.disabled = isAccounts;
    if (isAccounts) {
      editAmSelect.style.backgroundColor = '#f1f5f9';
      editAmSelect.style.cursor = 'not-allowed';
      editAmSelect.style.color = '#334155';
      editAmSelect.title = 'Sales / Account Manager is set by Support and is locked for Accounts.';
    } else {
      editAmSelect.style.backgroundColor = '';
      editAmSelect.style.cursor = '';
      editAmSelect.style.color = '';
      editAmSelect.removeAttribute('title');
    }
  }
  const editAmLockTag = document.getElementById('editAmLockTag');
  if (editAmLockTag) {
    editAmLockTag.classList.toggle('hidden', !isAccounts);
  }
  document.getElementById('editRechargeCount').value = item.rechargeCount;
  document.getElementById('editTotalAmount').value = item.totalAmount || '';
  document.getElementById('editRemarks').value = item.remarks || '';

  const editAccountsBox = document.getElementById('editAccountsActionBox');
  const editBillingCompany = document.getElementById('editBillingCompany');
  const editInvoiceType = document.getElementById('editInvoiceType');
  const editInvoiceInput = document.getElementById('editInvoiceNumber');
  const editBillingRemarks = document.getElementById('editBillingRemarks');
  const radios = document.querySelectorAll('input[name="editBillingStatus"]');

  // Support Role: completely hide confidential billing box, only show simple "Bill Raised" or "Bill Not Raised" badge
  const supportStatusBox = document.getElementById('editSupportStatusBox');
  const supportStatusBadge = document.getElementById('editSupportStatusBadge');
  if (supportStatusBox && supportStatusBadge) {
    if (isSupport) {
      supportStatusBox.classList.remove('hidden');
      if (editAccountsBox) editAccountsBox.classList.add('hidden');
      const isRaised = item.billingStatus === 'Billing Raised';
      const isCancelled = item.billingStatus === 'Cancelled';
      const isHold = item.billingStatus === 'On Hold';
      supportStatusBadge.textContent = isRaised ? 'Bill Raised' : isCancelled ? 'Cancelled' : isHold ? 'On Hold' : 'Bill Not Raised';
      supportStatusBadge.className = 'status-badge ' + (isRaised ? 'status-badge--raised' : isCancelled ? 'status-badge--cancelled' : isHold ? 'status-badge--hold' : 'status-badge--pending');
    } else {
      supportStatusBox.classList.add('hidden');
      if (editAccountsBox) editAccountsBox.classList.remove('hidden');
    }
  }

  if (editBillingCompany) {
    editBillingCompany.value = item.billingCompany || 'Immense Air';
    editBillingCompany.disabled = !isAccounts;
  }
  if (editInvoiceType) {
    editInvoiceType.value = item.invoiceType || 'Tax Invoice';
    editInvoiceType.disabled = !isAccounts;
  }
  if (editInvoiceInput) {
    editInvoiceInput.value = item.invoiceNumber || '';
    editInvoiceInput.disabled = !isAccounts;
  }
  if (editBillingRemarks) {
    editBillingRemarks.value = item.billingRemarks || '';
    editBillingRemarks.disabled = !isAccounts;
  }

  // Payment Collection Status fields (Accounts & Admin only)
  const editPaymentStatus = document.getElementById('editPaymentStatus');
  const editPaidAmount = document.getElementById('editPaidAmount');
  const editPaymentMode = document.getElementById('editPaymentMode');
  const editPaymentDate = document.getElementById('editPaymentDate');
  const paymentBalanceHint = document.getElementById('paymentBalanceHint');

  if (editPaymentStatus) {
    const rawP = item.paymentStatus || 'Pending';
    if (rawP === 'Received' || rawP === 'Payment Received') {
      editPaymentStatus.value = 'Received';
    } else if (rawP === 'Partial' || rawP === 'Partial Payment') {
      editPaymentStatus.value = 'Partial';
    } else {
      editPaymentStatus.value = 'Pending';
    }
    editPaymentStatus.disabled = isSupport;
  }

  if (editPaidAmount) {
    editPaidAmount.value = (item.paidAmount !== undefined && item.paidAmount !== null && item.paidAmount !== '') ? item.paidAmount : '';
    editPaidAmount.disabled = isSupport;
  }

  if (editPaymentMode) {
    editPaymentMode.value = item.paymentMode || 'Bank Transfer / NEFT';
    editPaymentMode.disabled = isSupport;
  }

  if (editPaymentDate) {
    editPaymentDate.value = item.paymentDate || '';
    editPaymentDate.disabled = isSupport;
  }

  function updatePaymentBalanceHint() {
    if (!paymentBalanceHint) return;
    const curStatus = editPaymentStatus?.value;
    const curPaid = Number(editPaidAmount?.value) || 0;
    const totalInput = Number(document.getElementById('editTotalAmount')?.value);
    const finalAmt = (!isNaN(totalInput) && totalInput > 0) ? totalInput : (Number(item.totalAmount) || 0);

    if (curStatus === 'Partial') {
      const balance = Math.max(0, finalAmt - curPaid);
      paymentBalanceHint.textContent = `(Pending Bal: ₹${formatCurrencyIN(balance)})`;
      paymentBalanceHint.style.color = '#B45309';
    } else if (curStatus === 'Received') {
      paymentBalanceHint.textContent = '(Fully Paid)';
      paymentBalanceHint.style.color = '#15803D';
    } else {
      paymentBalanceHint.textContent = '(Unpaid)';
      paymentBalanceHint.style.color = '#B91C1C';
    }
  }

  if (editPaymentStatus) {
    editPaymentStatus.onchange = function () {
      const totalInput = Number(document.getElementById('editTotalAmount')?.value);
      const finalAmt = (!isNaN(totalInput) && totalInput > 0) ? totalInput : (Number(item.totalAmount) || 0);
      if (editPaymentStatus.value === 'Received') {
        if (editPaidAmount) editPaidAmount.value = finalAmt > 0 ? finalAmt : '';
      } else if (editPaymentStatus.value === 'Pending') {
        if (editPaidAmount) editPaidAmount.value = 0;
      }
      updatePaymentBalanceHint();
    };
  }

  if (editPaidAmount) {
    editPaidAmount.oninput = updatePaymentBalanceHint;
  }

  updatePaymentBalanceHint();

  // Lock status fields if NOT logged in as Billing / Accounts
  radios.forEach((r) => {
    r.checked = r.value === item.billingStatus;
    r.disabled = !isAccounts;
  });

  // Security rule: Accounts / Billing department CANNOT upload or replace supporting screenshot proof!
  const editScreenshotLockNotice = document.getElementById('editScreenshotLockNotice');
  const editCurrentProofWrap = document.getElementById('editCurrentProofWrap');
  const editViewCurrentProofBtn = document.getElementById('editViewCurrentProofBtn');

  if (editScreenshotLockNotice) {
    editScreenshotLockNotice.classList.toggle('hidden', !isAccounts);
  }
  if (editCurrentProofWrap && editViewCurrentProofBtn) {
    if (item.screenshotUrl) {
      editCurrentProofWrap.classList.remove('hidden');
      editViewCurrentProofBtn.href = item.screenshotUrl;
    } else {
      editCurrentProofWrap.classList.add('hidden');
    }
  }

  let modalLockNotice = document.getElementById('modalBillingLockNotice');
  if (!modalLockNotice && editAccountsBox) {
    modalLockNotice = document.createElement('div');
    modalLockNotice.id = 'modalBillingLockNotice';
    modalLockNotice.style.cssText = 'padding:9px 12px;background:rgba(255,100,24,0.1);border:1px solid rgba(255,100,24,0.3);border-radius:6px;font-size:12px;color:var(--navy);margin-bottom:10px;font-weight:600;display:flex;align-items:center;gap:6px;';
    modalLockNotice.innerHTML = '<span>🔒</span><span>Billing Status &amp; Invoice is managed by Billing Department (Accounts Login) only. Admin/Support cannot change status.</span>';
    editAccountsBox.prepend(modalLockNotice);
  }
  if (modalLockNotice) {
    modalLockNotice.style.display = isAccounts ? 'none' : 'flex';
  }

  const delBtn = document.getElementById('deleteEntryBtn');
  if (delBtn) {
    delBtn.classList.toggle('hidden', state.currentUser?.role !== 'admin');
  }

  const modalEl = document.getElementById('editModal');
  if (modalEl) {
    modalEl.classList.remove('hidden');
  }

  // Recalculate totals, base taxable subtotal, and 18% GST live
  recalcEditModalTotals();
};

editScreenshotInput.addEventListener('change', async (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    state.editScreenshotData = await fileToDataUrl(file);
    state.editScreenshotName = file.name;
  }
});

function closeEditModal() {
  const modalEl = document.getElementById('editModal');
  if (modalEl) modalEl.classList.add('hidden');
}

function recalcEditModalTotals() {
  const rows = document.querySelectorAll('#editRatesContainer .edit-rate-row');
  let baseGrandTotal = 0;
  let hasAnyRate = false;

  rows.forEach((row) => {
    const rateInput = row.querySelector('.edit-rate-field');
    const subtotalEl = row.querySelector('.edit-rate-subtotal');
    if (!rateInput) return;

    const count = Number(rateInput.dataset.count) || 0;
    const rate = Number(rateInput.value) || 0;
    if (rateInput.value !== '') hasAnyRate = true;

    const sub = Math.round(count * rate * 100) / 100;
    baseGrandTotal += sub;
    if (subtotalEl) {
      subtotalEl.textContent = `₹${sub.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  });

  const gstToggle = document.getElementById('editGstToggle');
  const isGstEnabled = gstToggle ? gstToggle.checked : true;
  const gstAmount = isGstEnabled ? Math.round(baseGrandTotal * 0.18 * 100) / 100 : 0;
  const finalTotal = isGstEnabled ? Math.round((baseGrandTotal + gstAmount) * 100) / 100 : baseGrandTotal;

  const baseText = document.getElementById('editBaseAmountText');
  const gstText = document.getElementById('editGstTaxText');
  const gstBadge = document.getElementById('editGstAmountBadge');

  if (baseText) {
    baseText.textContent = `₹${baseGrandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  if (gstText) {
    if (isGstEnabled) {
      gstText.textContent = `+ ₹${gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (18%)`;
      gstText.style.color = 'var(--accent)';
    } else {
      gstText.textContent = `₹0.00 (GST Disabled / Non-GST)`;
      gstText.style.color = 'var(--ink-muted)';
    }
  }

  if (gstBadge) {
    if (isGstEnabled) {
      gstBadge.textContent = `GST (18%): +₹${gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      gstBadge.className = 'badge badge--accent tnum';
    } else {
      gstBadge.textContent = `GST: Disabled`;
      gstBadge.className = 'badge badge--navy tnum';
    }
  }

  const totalInput = document.getElementById('editTotalAmount');
  if (totalInput && hasAnyRate) {
    totalInput.value = finalTotal > 0 ? finalTotal.toFixed(2) : '';
  }
}

// Bind GST Toggle and Invoice Type change listeners
const editGstToggleEl = document.getElementById('editGstToggle');
if (editGstToggleEl) {
  editGstToggleEl.addEventListener('change', () => {
    const invSelect = document.getElementById('editInvoiceType');
    if (invSelect) {
      if (!editGstToggleEl.checked && invSelect.value === 'Tax Invoice') {
        invSelect.value = 'Non GST';
      } else if (editGstToggleEl.checked && invSelect.value === 'Non GST') {
        invSelect.value = 'Tax Invoice';
      }
    }
    recalcEditModalTotals();
  });
}

const editInvoiceTypeEl = document.getElementById('editInvoiceType');
if (editInvoiceTypeEl) {
  editInvoiceTypeEl.addEventListener('change', (e) => {
    if (editGstToggleEl) {
      if (e.target.value === 'Non GST') {
        editGstToggleEl.checked = false;
      } else if (e.target.value === 'Tax Invoice' || e.target.value === 'Proforma Invoice') {
        editGstToggleEl.checked = true;
      }
      recalcEditModalTotals();
    }
  });
}

closeEditModalBtn.addEventListener('click', closeEditModal);
cancelEditBtn.addEventListener('click', closeEditModal);

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('editEntryId').value;
  const isAccounts = state.currentUser?.role === 'accounts';
  const isSupport = state.currentUser?.role === 'support';
  const isAdmin = state.currentUser?.role === 'admin';
  const isSupportRole = state.currentUser?.role === 'support';

  // Collect per-channel rates entered by billing team (SMS ke samne SMS ka rate, etc.)
  const rateRows = document.querySelectorAll('#editRatesContainer .edit-rate-row');
  const updatedServicesList = [];
  const detailParts = [];
  let baseAmountTotal = 0;

  rateRows.forEach((row) => {
    const rateInput = row.querySelector('.edit-rate-field');
    if (!rateInput) return;
    const svc = rateInput.dataset.service;
    const count = Number(rateInput.dataset.count) || 0;
    const rate = Number(rateInput.value) || 0;
    const sub = Math.round(count * rate * 100) / 100;
    baseAmountTotal += sub;
    updatedServicesList.push({
      service: svc,
      count: count,
      rate: rate,
      amount: sub
    });
    detailParts.push(`${svc}: ${formatNumberIN(count)} @ ₹${rate} (= ₹${formatNumberIN(sub)})`);
  });

  const isGstChecked = Boolean(document.getElementById('editGstToggle')?.checked);
  const gstAmountVal = isGstChecked ? Math.round(baseAmountTotal * 0.18 * 100) / 100 : 0;
  const rawTotalInput = Number(document.getElementById('editTotalAmount').value);
  const finalTotalAmount = !isNaN(rawTotalInput) && rawTotalInput > 0 ? rawTotalInput : Math.round((baseAmountTotal + gstAmountVal) * 100) / 100;

  const payload = {
    userRole: state.currentUser?.role,
    username: document.getElementById('editUsername').value.trim(),
    clientName: document.getElementById('editClientName').value.trim(),
    service: document.getElementById('editService').value,
    accountManager: document.getElementById('editAccountManager').value,
    rechargeCount: Number(document.getElementById('editRechargeCount').value),
    baseAmount: baseAmountTotal,
    gstEnabled: isGstChecked,
    gstRate: isGstChecked ? 18 : 0,
    gstAmount: gstAmountVal,
    totalAmount: finalTotalAmount,
    remarks: document.getElementById('editRemarks').value.trim()
  };

  if (updatedServicesList.length > 0) {
    payload.servicesList = updatedServicesList;
    payload.servicesDetail = detailParts.join(' | ');
  }

  // Strictly ONLY send billing updates if user is Accounts/Billing Dept!
  if (isAccounts) {
    payload.billingStatus = document.querySelector('input[name="editBillingStatus"]:checked')?.value || 'Pending';
    payload.billingCompany = document.getElementById('editBillingCompany')?.value || 'Immense Air';
    payload.invoiceType = document.getElementById('editInvoiceType')?.value || 'Tax Invoice';
    payload.invoiceNumber = document.getElementById('editInvoiceNumber').value.trim();
    payload.billingRemarks = document.getElementById('editBillingRemarks').value.trim();
  }

  // Payment Collection update (Accounts and Admin only, NEVER for Support)
  if (isAccounts || isAdmin) {
    const payStatusEl = document.getElementById('editPaymentStatus');
    if (payStatusEl) {
      payload.paymentStatus = payStatusEl.value || 'Pending';
      payload.paidAmount = Number(document.getElementById('editPaidAmount')?.value) || 0;
      payload.paymentMode = document.getElementById('editPaymentMode')?.value || '';
      payload.paymentDate = document.getElementById('editPaymentDate')?.value || '';
    }
  }

  if (state.editScreenshotData && !isAccounts) {
    payload.screenshotData = state.editScreenshotData;
    payload.screenshotName = state.editScreenshotName;
  }

  try {
    const res = await fetch(`/api/recharges/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      closeEditModal();
      await fetchAllData();
      showToast(`Record ${id} updated successfully`);
    } else {
      const errData = await res.json();
      showToast(`Update failed: ${errData.error || 'Server error'}`);
    }
  } catch (err) {
    showToast('Could not update record');
  }
});

deleteEntryBtn.addEventListener('click', async () => {
  if (state.currentUser?.role !== 'admin') {
    showToast('Permission Denied: Only Super Admin can delete records.');
    return;
  }
  const id = document.getElementById('editEntryId').value;
  if (!confirm(`Permanently delete recharge record ${id}?\nThis action cannot be undone.`)) return;
  try {
    const res = await fetch(`/api/recharges/${encodeURIComponent(id)}?userRole=${encodeURIComponent(state.currentUser?.role || '')}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      closeEditModal();
      await fetchAllData();
      showToast(`Deleted ${id}`);
    }
  } catch (err) {
    showToast('Failed to delete entry');
  }
});

// =========================================================================
// CHANNEL BREAKDOWN POPUP (SMS, RCS, WHATSAPP, VIRTUAL WHATSAPP, OBD, IVR)
// =========================================================================
function getChannelColor(channelName) {
  const s = String(channelName || '').toLowerCase();
  if (s.includes('whatsapp')) return '#25D366';
  if (s.includes('rcs')) return '#1A73E8';
  if (s.includes('sms')) return '#0284C7';
  if (s.includes('obd')) return '#EA580C';
  if (s.includes('ivr')) return '#6366F1';
  return '#475569';
}

window.openChannelBreakdownModal = function (mode = 'all') {
  const modal = document.getElementById('channelBreakdownModal');
  if (!modal) return;

  const dateFiltered = getDateFilteredRecharges();
  let targetList = dateFiltered;
  let modalTitle = '1. Total Recharges — Channel Breakdown';
  let badgeText = 'TOTAL RECHARGES';
  let detailType = 'all';

  if (mode === 'raised') {
    targetList = dateFiltered.filter((r) => r.billingStatus === 'Billing Raised');
    modalTitle = '2. Billing Raised — User & Invoices Breakdown';
    badgeText = 'BILLING RAISED INVOICES';
    detailType = 'raised';
  } else if (mode === 'pending') {
    targetList = dateFiltered.filter((r) => r.billingStatus === 'Pending');
    modalTitle = '3. Outstanding Amount — Pending Recharges';
    badgeText = 'OUTSTANDING PENDING';
    detailType = 'pending';
  } else if (mode === 'payment') {
    targetList = dateFiltered.filter((r) => {
      const rawP = String(r.paymentStatus || '').toLowerCase();
      return rawP.includes('received') || rawP === 'paid' || (rawP.includes('partial') && Number(r.paidAmount) > 0);
    });
    modalTitle = '4. Payment Received — User Collections';
    badgeText = 'PAYMENT RECEIVED';
    detailType = 'raised';
  }

  const badgeEl = document.getElementById('channelBreakdownBadge');
  if (badgeEl) badgeEl.textContent = badgeText;
  const titleEl = document.getElementById('channelBreakdownTitle');
  if (titleEl) titleEl.textContent = modalTitle;

  const dateSummaryText = activeDateFilterSummary ? activeDateFilterSummary.textContent : 'All Dates';
  const subtitleEl = document.getElementById('channelBreakdownSubtitle');
  if (subtitleEl) subtitleEl.textContent = `${dateSummaryText} · (${targetList.length} ${mode === 'raised' ? 'Bills Raised' : mode === 'payment' ? 'Collections' : 'Records'})`;

  const listEl = document.getElementById('channelBreakdownList');
  const summaryEl = document.getElementById('channelBreakdownSummary');

  if (mode === 'raised') {
    // RENDER USER-WISE BILLS RAISED (Kiss user ka kiss company/channel me bill raise hua)
    if (targetList.length === 0) {
      if (listEl) {
        listEl.innerHTML = `
          <div style="text-align:center;padding:32px;color:var(--ink-muted);background:#f8fafc;border-radius:8px;border:1px dashed var(--rule);">
            No raised billing records found for the selected date filter.
          </div>
        `;
      }
    } else {
      if (listEl) {
        listEl.innerHTML = targetList.map((item) => {
          const bCompany = item.billingCompany || 'Immense Air';
          const bType = item.invoiceType || 'Tax Invoice';
          const companyClass = getCompanyClass(bCompany);
          const typeClass = bType === 'Tax Invoice' ? 'type-pill--tax' : bType === 'Proforma Invoice' ? 'type-pill--proforma' : 'type-pill--nongst';

          const rawP = item.paymentStatus || 'Pending';
          const isPaid = rawP === 'Received' || rawP === 'Payment Received';
          const isPart = rawP === 'Partial' || rawP === 'Partial Payment';
          const pClass = isPaid ? 'payment-pill--paid' : isPart ? 'payment-pill--partial' : 'payment-pill--unpaid';
          const pText = isPaid ? '✓ Paid' : isPart ? `💰 Partial (₹${formatNumberIN(item.paidAmount || 0)})` : '⏳ Unpaid';
          const paymentPillHtml = `<span class="payment-pill ${pClass}" title="Payment Status: ${rawP}">${pText}</span>`;

          return `
            <div class="billed-user-card">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--navy);background:#f1f5f9;padding:2px 7px;border-radius:4px;">${item.id}</span>
                    <strong style="font-size:15.5px;color:var(--navy);">${item.username}</strong>
                    ${item.clientName ? `<span style="font-size:12.5px;color:var(--ink-secondary);font-weight:600;">· ${item.clientName}</span>` : ''}
                  </div>

                  <div style="display:flex;align-items:center;gap:6px;margin-top:6px;flex-wrap:wrap;">
                    <span class="company-pill ${companyClass}">🏢 ${bCompany}</span>
                    <span class="type-pill ${typeClass}">${bType}</span>
                    ${item.invoiceNumber ? `<span class="invoice-pill" style="font-weight:700;">INV: ${item.invoiceNumber}</span>` : '<span class="invoice-pill" style="color:var(--ink-muted);">INV: Pending</span>'}
                    ${paymentPillHtml}
                  </div>
                </div>

                <div class="tnum" style="text-align:right;">
                  <strong style="font-size:17.5px;color:var(--green);display:block;">${formatCurrencyIN(item.totalAmount)}</strong>
                  <span style="font-size:12px;color:#64748b;font-weight:600;">${formatNumberIN(item.rechargeCount)} Credits</span>
                </div>
              </div>

              <div style="margin-top:10px;padding-top:10px;border-top:1px dashed #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12px;color:#64748b;">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <span class="channel-pills-row">${getServiceChannelPillsHtml(item.service)}</span>
                  <span>· AM: <strong style="color:var(--navy);">${item.accountManager}</strong></span>
                  ${item.billedAt ? `<span>· Billed: <strong>${formatDateTime(item.billedAt)}</strong></span>` : ''}
                </div>
                <div>
                  <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" style="font-size:11.5px;padding:3px 9px;" title="View Full Bill Details in New Tab">
                    View Full Bill ↗
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (summaryEl) {
      const totalBilledAmt = targetList.reduce((s, r) => s + (Number(r.totalAmount) || 0), 0);
      const totalCredits = targetList.reduce((s, r) => s + (Number(r.rechargeCount) || 0), 0);
      summaryEl.innerHTML = `
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">TOTAL BILLS RAISED</span>
          <strong style="font-size:15.5px;color:var(--navy);">${targetList.length} Invoices</strong>
        </div>
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">TOTAL CREDITS</span>
          <strong style="font-size:15.5px;color:var(--navy);">${formatNumberIN(totalCredits)} Credits</strong>
        </div>
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">TOTAL INVOICED</span>
          <strong style="font-size:16px;color:var(--green);">${formatCurrencyIN(totalBilledAmt)}</strong>
        </div>
      `;
    }
  } else if (mode === 'pending') {
    // RENDER USER-WISE OUTSTANDING / PENDING RECHARGES
    if (targetList.length === 0) {
      if (listEl) {
        listEl.innerHTML = `
          <div style="text-align:center;padding:32px;color:var(--ink-muted);background:#f8fafc;border-radius:8px;border:1px dashed var(--rule);">
            No pending recharge records found for the selected date filter.
          </div>
        `;
      }
    } else {
      if (listEl) {
        listEl.innerHTML = targetList.map((item) => {
          return `
            <div class="billed-user-card billed-user-card--pending">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--navy);background:#f1f5f9;padding:2px 7px;border-radius:4px;">${item.id}</span>
                    <strong style="font-size:15.5px;color:var(--navy);">${item.username}</strong>
                    ${item.clientName ? `<span style="font-size:12.5px;color:var(--ink-secondary);font-weight:600;">· ${item.clientName}</span>` : ''}
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;margin-top:6px;flex-wrap:wrap;">
                    <span class="status-badge status-badge--pending">Bill Not Raised</span>
                    <span class="channel-pills-row">${getServiceChannelPillsHtml(item.service)}</span>
                  </div>
                </div>
                <div class="tnum" style="text-align:right;">
                  <strong style="font-size:17.5px;color:var(--orange);display:block;">${formatCurrencyIN(item.totalAmount)}</strong>
                  <span style="font-size:12px;color:#64748b;font-weight:600;">${formatNumberIN(item.rechargeCount)} Credits</span>
                </div>
              </div>
              <div style="margin-top:10px;padding-top:10px;border-top:1px dashed #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12px;color:#64748b;">
                <div>
                  <span>Sales/AM: <strong style="color:var(--navy);">${item.accountManager}</strong></span> · 
                  <span>Logged: ${formatDateTime(item.createdAt)}</span>
                </div>
                <div>
                  <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" style="font-size:11.5px;padding:3px 9px;">
                    View Entry ↗
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (summaryEl) {
      const totalPendingAmt = targetList.reduce((s, r) => s + (Number(r.totalAmount) || 0), 0);
      const totalCredits = targetList.reduce((s, r) => s + (Number(r.rechargeCount) || 0), 0);
      summaryEl.innerHTML = `
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">PENDING RECHARGES</span>
          <strong style="font-size:15.5px;color:var(--navy);">${targetList.length} Entries</strong>
        </div>
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">PENDING CREDITS</span>
          <strong style="font-size:15.5px;color:var(--navy);">${formatNumberIN(totalCredits)} Credits</strong>
        </div>
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">OUTSTANDING AMT</span>
          <strong style="font-size:16px;color:var(--orange);">${formatCurrencyIN(totalPendingAmt)}</strong>
        </div>
      `;
    }
  } else if (mode === 'payment') {
    // RENDER USER-WISE PAYMENTS RECEIVED
    if (targetList.length === 0) {
      if (listEl) {
        listEl.innerHTML = `
          <div style="text-align:center;padding:32px;color:var(--ink-muted);background:#f8fafc;border-radius:8px;border:1px dashed var(--rule);">
            No payment collection records found for the selected date filter.
          </div>
        `;
      }
    } else {
      if (listEl) {
        listEl.innerHTML = targetList.map((item) => {
          const rawP = item.paymentStatus || 'Pending';
          const isPaid = rawP === 'Received' || rawP === 'Payment Received';
          const amtReceived = isPaid ? (Number(item.paidAmount) || Number(item.totalAmount) || 0) : (Number(item.paidAmount) || 0);
          const balancePending = Math.max(0, (Number(item.totalAmount) || 0) - amtReceived);

          return `
            <div class="billed-user-card billed-user-card--payment">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--navy);background:#f1f5f9;padding:2px 7px;border-radius:4px;">${item.id}</span>
                    <strong style="font-size:15.5px;color:var(--navy);">${item.username}</strong>
                    ${item.clientName ? `<span style="font-size:12.5px;color:var(--ink-secondary);font-weight:600;">· ${item.clientName}</span>` : ''}
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;margin-top:6px;flex-wrap:wrap;">
                    <span class="payment-pill ${isPaid ? 'payment-pill--paid' : 'payment-pill--partial'}">
                      ${isPaid ? '✓ Full Payment Received' : `💰 Partial (₹${formatCurrencyIN(amtReceived)})`}
                    </span>
                    ${item.invoiceNumber ? `<span class="invoice-pill">INV: ${item.invoiceNumber}</span>` : ''}
                    ${item.paymentMode ? `<span style="font-size:11px;color:#64748b;background:#f8fafc;border:1px solid #e2e8f0;padding:2px 7px;border-radius:4px;">${item.paymentMode}</span>` : ''}
                  </div>
                </div>

                <div class="tnum" style="text-align:right;">
                  <strong style="font-size:17.5px;color:#059669;display:block;">+₹${formatCurrencyIN(amtReceived)}</strong>
                  ${balancePending > 0 ? `<span style="font-size:11.5px;color:#B45309;font-weight:700;">Bal: ₹${formatCurrencyIN(balancePending)}</span>` : '<span style="font-size:11.5px;color:#15803D;font-weight:600;">✓ Fully Paid</span>'}
                </div>
              </div>

              <div style="margin-top:10px;padding-top:10px;border-top:1px dashed #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12px;color:#64748b;">
                <div>
                  <span>Total Invoiced: <strong>${formatCurrencyIN(item.totalAmount)}</strong></span> · 
                  <span>AM: <strong style="color:var(--navy);">${item.accountManager}</strong></span>
                  ${item.paymentDate ? ` · Date: ${item.paymentDate}` : ''}
                </div>
                <div>
                  <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="eye-action-btn" style="font-size:11.5px;padding:3px 9px;">
                    View Details ↗
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (summaryEl) {
      let totalCollAmt = 0;
      targetList.forEach((r) => {
        const rawP = String(r.paymentStatus || '').toLowerCase();
        if (rawP.includes('received') || rawP === 'paid') {
          totalCollAmt += (Number(r.paidAmount) || Number(r.totalAmount) || 0);
        } else if (rawP.includes('partial')) {
          totalCollAmt += (Number(r.paidAmount) || 0);
        }
      });
      summaryEl.innerHTML = `
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">COLLECTIONS</span>
          <strong style="font-size:15.5px;color:var(--navy);">${targetList.length} Collections</strong>
        </div>
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">AMOUNT RECEIVED</span>
          <strong style="font-size:16px;color:#059669;">₹${formatCurrencyIN(totalCollAmt)}</strong>
        </div>
      `;
    }
  } else {
    // MODE === 'ALL' (1. TOTAL RECHARGES): CPaaS Channel Breakdown (SMS, RCS, WhatsApp, Virtual WhatsApp, OBD, IVR)
    const channelMap = {};
    let totalUnits = 0;
    let totalAmount = 0;

    targetList.forEach((item) => {
      if (Array.isArray(item.servicesList) && item.servicesList.length > 0) {
        item.servicesList.forEach((s) => {
          const name = (s.service || 'SMS').trim();
          if (!channelMap[name]) channelMap[name] = { name, units: 0, amount: 0, recharges: 0 };
          const u = Number(s.count) || 0;
          const a = Number(s.amount) || (u * (Number(s.rate) || 0));
          channelMap[name].units += u;
          channelMap[name].amount += a;
          channelMap[name].recharges++;
          totalUnits += u;
          totalAmount += a;
        });
      } else {
        const svcName = item.service || 'SMS';
        if (svcName.includes('+')) {
          const parts = svcName.split('+').map((p) => p.trim());
          const avgUnits = Math.round((Number(item.rechargeCount) || 0) / parts.length);
          const avgAmt = (Number(item.totalAmount) || 0) / parts.length;
          parts.forEach((p) => {
            if (!channelMap[p]) channelMap[p] = { name: p, units: 0, amount: 0, recharges: 0 };
            channelMap[p].units += avgUnits;
            channelMap[p].amount += avgAmt;
            channelMap[p].recharges++;
            totalUnits += avgUnits;
            totalAmount += avgAmt;
          });
        } else {
          if (!channelMap[svcName]) channelMap[svcName] = { name: svcName, units: 0, amount: 0, recharges: 0 };
          const u = Number(item.rechargeCount) || 0;
          const a = Number(item.totalAmount) || 0;
          channelMap[svcName].units += u;
          channelMap[svcName].amount += a;
          channelMap[svcName].recharges++;
          totalUnits += u;
          totalAmount += a;
        }
      }
    });

    const sortedChannels = Object.values(channelMap).sort((a, b) => b.units - a.units);

    if (sortedChannels.length === 0) {
      if (listEl) {
        listEl.innerHTML = `
          <div style="text-align:center;padding:30px;color:var(--ink-muted);background:#f8fafc;border-radius:8px;border:1px dashed var(--rule);">
            No recharge records found for selected filter.
          </div>
        `;
      }
    } else {
      if (listEl) {
        listEl.innerHTML = sortedChannels.map((ch) => {
          const pct = totalUnits > 0 ? ((ch.units / totalUnits) * 100).toFixed(1) : '0';
          const color = getChannelColor(ch.name);
          return `
            <div class="channel-breakdown-card">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:${color}18;border:1px solid ${color}35;">
                    ${getChannelIconSvg(ch.name)}
                  </span>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <strong style="font-size:15px;color:var(--navy);">${ch.name}</strong>
                      <span style="font-size:11px;color:#475569;background:#f1f5f9;padding:2px 8px;border-radius:12px;font-weight:700;">${ch.recharges} Recharge${ch.recharges > 1 ? 's' : ''}</span>
                    </div>
                    <div style="font-size:12px;color:#64748b;margin-top:2px;">
                      Share: <strong>${pct}%</strong> of volume
                    </div>
                  </div>
                </div>

                <div class="tnum" style="text-align:right;">
                  <strong style="font-size:16.5px;color:var(--navy);display:block;">${formatNumberIN(ch.units)} <small style="font-size:11.5px;color:#64748b;font-weight:600;">Credits</small></strong>
                  ${ch.amount > 0 ? `<span style="font-size:12.5px;color:var(--green);font-weight:700;">₹${formatCurrencyIN(ch.amount)}</span>` : '<span style="font-size:11.5px;color:#94a3b8;font-style:italic;">Pending Rate</span>'}
                </div>
              </div>

              <div class="channel-bar-bg">
                <div class="channel-bar-fill" style="background:${color};width:${pct}%;"></div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (summaryEl) {
      summaryEl.innerHTML = `
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">TOTAL RECHARGES</span>
          <strong style="font-size:15.5px;color:var(--navy);">${targetList.length} Entries</strong>
        </div>
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">TOTAL CREDITS</span>
          <strong style="font-size:15.5px;color:var(--navy);">${formatNumberIN(totalUnits)} Units</strong>
        </div>
        <div>
          <span style="font-size:11px;color:#64748b;font-weight:700;display:block;">TOTAL VALUE</span>
          <strong style="font-size:15.5px;color:var(--green);">₹${formatCurrencyIN(totalAmount)}</strong>
        </div>
      `;
    }
  }

  // Set the "More Details ↗" button target link
  const dq = buildDateQuerySuffix();
  const moreDetailsBtn = document.getElementById('channelMoreDetailsBtn');
  if (moreDetailsBtn) {
    moreDetailsBtn.href = `details.html?type=${detailType}${dq}`;
  }

  modal.classList.remove('hidden');
};

function closeChannelBreakdownModal() {
  const modal = document.getElementById('channelBreakdownModal');
  if (modal) modal.classList.add('hidden');
}

const closeChannelBreakdownModalBtn = document.getElementById('closeChannelBreakdownModal');
if (closeChannelBreakdownModalBtn) closeChannelBreakdownModalBtn.addEventListener('click', closeChannelBreakdownModal);

const cancelChannelBreakdownBtn = document.getElementById('cancelChannelBreakdownBtn');
if (cancelChannelBreakdownBtn) cancelChannelBreakdownBtn.addEventListener('click', closeChannelBreakdownModal);

// =========================================================================
// ADMIN TEAM, COMPANIES & 3 ACCOUNTS CREDENTIALS MODAL
// =========================================================================
function renderAdminCompaniesList() {
  const companies = (state.settings && Array.isArray(state.settings.companies))
    ? state.settings.companies
    : ['Immense Air', 'Immense Smart Solution', 'Zion'];
  
  const listEl = document.getElementById('adminCompaniesList');
  const countHint = document.getElementById('adminCompanyCountHint');
  if (countHint) countHint.textContent = `${companies.length} Companies`;
  if (!listEl) return;

  listEl.innerHTML = companies.map((c) => `
    <span class="am-tag-chip" style="background:#ffffff;border:1px solid #cbd5e1;padding:4px 10px;border-radius:20px;display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--navy);">
      <span>🏢 ${c}</span>
      <button type="button" onclick="removeCompany('${c.replace(/'/g, "\\'")}')" title="Remove Company" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0;line-height:1;">✕</button>
    </span>
  `).join('');
}

function renderAdminManagersModal() {
  const managers = state.settings.accountManagers || [];
  const amCountHint = document.getElementById('adminAmCountHint');
  if (amCountHint) amCountHint.textContent = `${managers.length} Managers`;
  if (adminManagersList) {
    adminManagersList.innerHTML = managers
      .map(
        (m) => `
        <span class="am-tag-chip">
          <span>${m}</span>
          <button type="button" onclick="removeAccountManager('${m.replace(/'/g, "\\'")}')" title="Remove">✕</button>
        </span>
      `
      )
      .join('');
  }

  const users = state.settings.users || [];
  if (adminCredentialsFields) {
    adminCredentialsFields.innerHTML = users
      .map(
        (u, idx) => `
        <div class="field-box" style="display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:8px;align-items:center;">
          <div>
            <div class="field-label">${u.department.toUpperCase()}</div>
            <div class="field-val" style="font-size:12.5px;">${u.name}</div>
          </div>
          <div>
            <label class="field-label">USERNAME</label>
            <input type="text" class="form-input form-input--sm" data-user-idx="${idx}" data-field="username" value="${u.username}" required />
          </div>
          <div>
            <label class="field-label">PASSWORD</label>
            <input type="text" class="form-input form-input--sm tnum" data-user-idx="${idx}" data-field="password" value="${u.password}" required />
          </div>
        </div>
      `
      )
      .join('');
  }
}

window.openAdminSettingsModal = function() {
  renderAdminCompaniesList();
  renderAdminManagersModal();
  if (adminSettingsModal) adminSettingsModal.classList.remove('hidden');
};

if (adminSettingsBtn) {
  adminSettingsBtn.addEventListener('click', () => {
    openAdminSettingsModal();
  });
}

if (closeAdminSettingsModalBtn) {
  closeAdminSettingsModalBtn.addEventListener('click', () => {
    adminSettingsModal.classList.add('hidden');
  });
}

// ADD COMPANY HANDLER
const adminAddCompanyBtn = document.getElementById('adminAddCompanyBtn');
const newCompanyInput = document.getElementById('newCompanyInput');
if (adminAddCompanyBtn) {
  adminAddCompanyBtn.addEventListener('click', async () => {
    const name = (newCompanyInput ? newCompanyInput.value : '').trim();
    if (!name) return;
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newCompany: name })
      });
      const data = await res.json();
      if (data.settings) {
        state.settings = data.settings;
        if (newCompanyInput) newCompanyInput.value = '';
        populateCompanies();
        renderAdminCompaniesList();
        renderAccountsReport();
        showToast(`Added Company: ${name}`);
      }
    } catch (err) {
      showToast('Error adding company');
    }
  });
}

// REMOVE COMPANY HANDLER
window.removeCompany = async function(name) {
  const currentCompanies = (state.settings && state.settings.companies) || [];
  if (currentCompanies.length <= 1) {
    showToast('Kam se kam ek company hona zaroori hai.');
    return;
  }
  if (!confirm(`Remove Company "${name}" from portal?`)) return;
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ removeCompany: name })
    });
    const data = await res.json();
    if (data.settings) {
      state.settings = data.settings;
      populateCompanies();
      renderAdminCompaniesList();
      renderAccountsReport();
      showToast(`Removed Company: ${name}`);
    }
  } catch (err) {
    showToast('Error removing company');
  }
};

// ADD ACCOUNT MANAGER
if (adminAddManagerBtn) {
  adminAddManagerBtn.addEventListener('click', async () => {
    const name = newManagerInput.value.trim();
    if (!name) return;
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newAccountManager: name })
      });
      const data = await res.json();
      if (data.settings) {
        state.settings = data.settings;
        newManagerInput.value = '';
        populateAccountManagers();
        renderAdminManagersModal();
        updateDashboardStats();
        renderSalesManagersSection();
        showToast(`Added Account Manager: ${name}`);
      }
    } catch (err) {
      showToast('Error adding manager');
    }
  });
}

window.removeAccountManager = async function (name) {
  if (!confirm(`Remove Account Manager "${name}" from dropdown list?`)) return;
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ removeAccountManager: name })
    });
    const data = await res.json();
    if (data.settings) {
      state.settings = data.settings;
      populateAccountManagers();
      renderAdminManagersModal();
      updateDashboardStats();
      renderSalesManagersSection();
      showToast(`Removed ${name}`);
    }
  } catch (err) {
    showToast('Error removing manager');
  }
};

if (credentialsUpdateForm) {
  credentialsUpdateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const updatedUsers = (state.settings.users || []).map((u, idx) => {
      const uInput = adminCredentialsFields.querySelector(`input[data-user-idx="${idx}"][data-field="username"]`);
      const pInput = adminCredentialsFields.querySelector(`input[data-user-idx="${idx}"][data-field="password"]`);
      return {
        ...u,
        username: uInput ? uInput.value.trim() : u.username,
        password: pInput ? pInput.value.trim() : u.password
      };
    });

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: updatedUsers })
      });
      const data = await res.json();
      if (data.settings) {
        state.settings = data.settings;
        showToast('3 Department Login Credentials updated');
        adminSettingsModal.classList.add('hidden');
      }
    } catch (err) {
      showToast('Error updating credentials');
    }
  });
}

// IMAGE VIEWER & FILTERS
// =========================================================================
window.openImageViewer = function (url, title) {
  modalFullImage.src = url;
  document.getElementById('imageModalTitle').textContent = `Approval Proof · ${title}`;
  downloadModalImgBtn.href = `${url}?download=1`;
  imageModal.classList.remove('hidden');
};

closeImageModalBtn.addEventListener('click', () => {
  imageModal.classList.add('hidden');
});

statusFilterGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('.status-pill');
  if (!btn) return;
  setFilterStatus(btn.dataset.status);
});

const mobileStatusSelect = document.getElementById('mobileStatusSelect');
if (mobileStatusSelect) {
  mobileStatusSelect.addEventListener('change', (e) => {
    setFilterStatus(e.target.value);
  });
}

function setFilterStatus(status) {
  state.filterStatus = status;
  document.querySelectorAll('.status-pill').forEach((b) => {
    b.classList.toggle('active', b.dataset.status === status);
  });
  const mobSelect = document.getElementById('mobileStatusSelect');
  if (mobSelect && mobSelect.value !== status) {
    mobSelect.value = status;
  }
  selectWorkspaceView('billing-queue');
}

const kpiCardPendingEl = document.getElementById('kpiCardPending');
if (kpiCardPendingEl) {
  kpiCardPendingEl.addEventListener('click', () => {
    setDashboardQuickTab('Pending');
    setFilterStatus('Pending');
  });
}

const kpiCardRaisedEl = document.getElementById('kpiCardRaised');
if (kpiCardRaisedEl) {
  kpiCardRaisedEl.addEventListener('click', () => {
    setDashboardQuickTab('Billing Raised');
    setFilterStatus('Billing Raised');
  });
}

const kpiCardPaymentEl = document.getElementById('kpiCardPayment');
if (kpiCardPaymentEl) {
  kpiCardPaymentEl.addEventListener('click', () => {
    setDashboardQuickTab('Billing Raised');
    setFilterStatus('Billing Raised');
  });
}

const kpiCardTotalEl = document.getElementById('kpiCardTotal');
if (kpiCardTotalEl) {
  kpiCardTotalEl.addEventListener('click', () => {
    setDashboardQuickTab('ALL');
    setFilterStatus('ALL');
  });
}

searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  renderRecords();
});

filterService.addEventListener('change', (e) => {
  state.filterService = e.target.value;
  renderRecords();
});

filterManager.addEventListener('change', (e) => {
  state.filterManager = e.target.value;
  renderRecords();
});

refreshBtn.addEventListener('click', () => {
  fetchAllData();
  showToast('Ledger synced');
});

// Live Alert Banner Actions
const alertStripFilterPendingBtn = document.getElementById('alertStripFilterPendingBtn');
if (alertStripFilterPendingBtn) {
  alertStripFilterPendingBtn.addEventListener('click', () => {
    setFilterStatus('Pending');
  });
}

const dashboardAlertReviewBtn = document.getElementById('dashboardAlertReviewBtn');
if (dashboardAlertReviewBtn) {
  dashboardAlertReviewBtn.addEventListener('click', () => {
    setFilterStatus('Pending');
  });
}

// =========================================================================
// QUICK PAYMENT FOLLOW-UP PROTOCOL (ADMIN ⇄ BILLING)
// =========================================================================
window.openQuickAdminFollowUp = function(id) {
  const item = (state.recharges || []).find(r => r.id === id);
  if (!item) return;
  document.getElementById('quickFollowUpRechargeId').value = id;
  document.getElementById('quickFollowUpClientName').textContent = `${item.username}${item.clientName ? ' (' + item.clientName + ')' : ''}`;
  const unbilled = item.billingStatus === 'Billing Raised' 
    ? Math.max(0, (Number(item.totalAmount) || 0) - (Number(item.paidAmount) || 0))
    : (Number(item.totalAmount) || 0);
  document.getElementById('quickFollowUpPendingAmt').textContent = formatCurrencyIN(unbilled);
  document.getElementById('quickAdminInstruction').value = item.followUpAdminRemark || 'Urgent payment follow-up required with client accounts team';
  document.getElementById('quickAdminFollowUpModal').classList.remove('hidden');
};

window.closeQuickAdminFollowUp = function() {
  const m = document.getElementById('quickAdminFollowUpModal');
  if (m) m.classList.add('hidden');
};

const closeQuickAdminBtn = document.getElementById('closeQuickAdminFollowUpModal');
if (closeQuickAdminBtn) closeQuickAdminBtn.addEventListener('click', closeQuickAdminFollowUp);
const cancelQuickAdminBtn = document.getElementById('cancelQuickAdminFollowUpBtn');
if (cancelQuickAdminBtn) cancelQuickAdminBtn.addEventListener('click', closeQuickAdminFollowUp);

const quickAdminForm = document.getElementById('quickAdminFollowUpForm');
if (quickAdminForm) {
  quickAdminForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('quickFollowUpRechargeId').value;
    const remark = document.getElementById('quickAdminInstruction').value.trim();
    if (!id || !remark) return;

    try {
      const res = await fetch(`/api/recharges/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userRole: 'admin',
          actionType: 'request_follow_up',
          followUpAdminRemark: remark,
          requestedBy: state.currentUser?.name || 'Super Admin'
        })
      });
      if (!res.ok) throw new Error('Failed to send follow-up request');
      showToast('Payment follow-up request sent to Billing Desk successfully!', 'success');
      closeQuickAdminFollowUp();
      await fetchAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

window.openQuickBillingFollowUp = function(id) {
  const item = (state.recharges || []).find(r => r.id === id);
  if (!item) return;
  document.getElementById('quickBillingRechargeId').value = id;
  document.getElementById('quickBillingAdminNoticeText').textContent = item.followUpAdminRemark || 'Client se payment ka urgent follow-up lo';
  document.getElementById('quickBillingAdminNoticeTime').textContent = item.followUpRequestedAt ? `Requested on ${formatDateTime(item.followUpRequestedAt)}` : '';
  document.getElementById('quickBillingOutcome').value = 'Payment Promised / Committed';
  document.getElementById('quickBillingRemarks').value = '';
  document.getElementById('quickBillingNextDate').value = '';
  document.getElementById('quickBillingPaymentStatus').value = '';
  document.getElementById('quickBillingPaidAmount').value = '';
  document.getElementById('quickBillingProofFile').value = '';
  document.getElementById('quickBillingProofPreviewWrap').classList.add('hidden');
  state._currentFollowUpProofBase64 = null;
  state._currentFollowUpProofName = '';

  document.getElementById('quickBillingFollowUpModal').classList.remove('hidden');
};

window.closeQuickBillingFollowUp = function() {
  const m = document.getElementById('quickBillingFollowUpModal');
  if (m) m.classList.add('hidden');
};

const closeQuickBillingBtn = document.getElementById('closeQuickBillingFollowUpModal');
if (closeQuickBillingBtn) closeQuickBillingBtn.addEventListener('click', closeQuickBillingFollowUp);
const cancelQuickBillingBtn = document.getElementById('cancelQuickBillingFollowUpBtn');
if (cancelQuickBillingBtn) cancelQuickBillingBtn.addEventListener('click', closeQuickBillingFollowUp);

const quickProofInput = document.getElementById('quickBillingProofFile');
if (quickProofInput) {
  quickProofInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      state._currentFollowUpProofBase64 = evt.target.result;
      state._currentFollowUpProofName = file.name;
      const thumb = document.getElementById('quickBillingProofThumb');
      if (thumb) thumb.src = evt.target.result;
      const nameEl = document.getElementById('quickBillingProofName');
      if (nameEl) nameEl.textContent = file.name;
      document.getElementById('quickBillingProofPreviewWrap').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  });
}

const quickBillingForm = document.getElementById('quickBillingFollowUpForm');
if (quickBillingForm) {
  quickBillingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('quickBillingRechargeId').value;
    const outcome = document.getElementById('quickBillingOutcome').value;
    const remarks = document.getElementById('quickBillingRemarks').value.trim();
    const nextDate = document.getElementById('quickBillingNextDate').value;
    const payStatus = document.getElementById('quickBillingPaymentStatus').value;
    const paidAmt = document.getElementById('quickBillingPaidAmount').value;

    if (!id || !remarks) {
      showToast('Please enter follow-up remarks', 'warn');
      return;
    }

    const payload = {
      userRole: 'accounts',
      actionType: 'update_follow_up',
      followUpBillingOutcome: outcome,
      followUpBillingRemark: remarks,
      followUpNextDate: nextDate,
      followUpProofData: state._currentFollowUpProofBase64 || '',
      followUpProofName: state._currentFollowUpProofName || '',
      updatedBy: state.currentUser?.name || 'Billing Department'
    };

    if (payStatus) {
      payload.paymentStatus = payStatus;
      if (paidAmt !== '') payload.paidAmount = Number(paidAmt) || 0;
    }

    try {
      const res = await fetch(`/api/recharges/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to submit follow-up update');
      showToast('Follow-up with supporting proof submitted to Admin successfully!', 'success');
      closeQuickBillingFollowUp();
      await fetchAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

window.resolveFollowUp = async function(id) {
  try {
    const res = await fetch(`/api/recharges/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userRole: 'admin',
        actionType: 'resolve_follow_up'
      })
    });
    if (!res.ok) throw new Error('Failed to resolve follow-up');
    showToast('Follow-up marked as resolved & closed!', 'success');
    await fetchAllData();
  } catch (err) {
    showToast(err.message, 'error');
  }
};

const btnFilterFollowUpOnly = document.getElementById('btnFilterFollowUpOnly');
if (btnFilterFollowUpOnly) {
  btnFilterFollowUpOnly.addEventListener('click', () => {
    setFilterStatus('FollowUp');
  });
}

// =========================================================================
// PAYMENT CALL REMINDERS FOR ACCOUNTS & BILLING DESK
// =========================================================================
function getDuePaymentCallReminders() {
  const todayStr = getLocalDateYYYYMMDD(new Date());
  return (state.recharges || []).filter((r) => {
    if (!r.followUpNextDate) return false;
    if (r.billingStatus === 'Cancelled') return false;
    const rawP = String(r.paymentStatus || '').toLowerCase();
    const isPaid = rawP.includes('received') || rawP === 'paid';
    if (isPaid) return false;
    if (r.followUpStatus === 'Resolved') return false;
    // Reminder is due if followUpNextDate <= todayStr (due today or overdue)
    return r.followUpNextDate <= todayStr;
  });
}

function updatePaymentCallRemindersUI() {
  const isSupportRole = state.currentUser?.role === 'support';
  const banner = document.getElementById('paymentCallReminderBanner');
  const bellBtn = document.getElementById('headerReminderBellBtn');
  const bellCount = document.getElementById('headerReminderCount');
  const countTag = document.getElementById('reminderDueCountTag');
  const btnCount = document.getElementById('reminderBtnCount');
  const summaryDesc = document.getElementById('reminderDueSummary');

  if (isSupportRole) {
    if (banner) banner.classList.add('hidden');
    if (bellBtn) bellBtn.classList.add('hidden');
    return;
  }

  const dueItems = getDuePaymentCallReminders();
  const count = dueItems.length;

  if (bellBtn && bellCount) {
    if (count > 0) {
      bellBtn.classList.remove('hidden');
      bellCount.textContent = count;
    } else {
      bellBtn.classList.add('hidden');
    }
  }

  if (banner) {
    const isDismissed = sessionStorage.getItem('dismissedPaymentCallReminderDate') === getLocalDateYYYYMMDD(new Date());
    if (count > 0 && !isDismissed) {
      banner.classList.remove('hidden');
      if (countTag) countTag.textContent = `${count} Calls Due Today`;
      if (btnCount) btnCount.textContent = count;
      if (summaryDesc) {
        const clientNames = dueItems.slice(0, 2).map((r) => r.username).join(', ');
        const moreTxt = count > 2 ? ` aur ${count - 2} aur clients` : '';
        summaryDesc.textContent = `Aaj ${clientNames}${moreTxt} ko payment ke liye call karke baat karni hai.`;
      }
    } else {
      banner.classList.add('hidden');
    }
  }
}

window.dismissReminderBannerToday = function() {
  sessionStorage.setItem('dismissedPaymentCallReminderDate', getLocalDateYYYYMMDD(new Date()));
  const banner = document.getElementById('paymentCallReminderBanner');
  if (banner) banner.classList.add('hidden');
  showToast('Reminder banner minimized. Aap upar "Call Reminders" button se kabhi bhi dekh sakte hain.');
};

window.openPaymentRemindersModal = function() {
  const modal = document.getElementById('paymentRemindersModal');
  if (!modal) return;
  renderPaymentRemindersModal();
  modal.classList.remove('hidden');
};

window.closePaymentRemindersModal = function() {
  const modal = document.getElementById('paymentRemindersModal');
  if (modal) modal.classList.add('hidden');
};

function renderPaymentRemindersModal() {
  const container = document.getElementById('paymentRemindersListContainer');
  const footerText = document.getElementById('modalReminderFooterText');
  const dateBadge = document.getElementById('modalReminderDateBadge');
  if (!container) return;

  const todayStr = getLocalDateYYYYMMDD(new Date());
  if (dateBadge) dateBadge.textContent = todayStr;

  const dueItems = getDuePaymentCallReminders();
  if (footerText) footerText.textContent = `Total ${dueItems.length} call reminders scheduled for today or overdue`;

  if (!dueItems.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:36px;color:#64748b;">
        <div style="font-size:32px;margin-bottom:8px;">🎉</div>
        <div style="font-weight:700;font-size:14px;color:var(--navy);">Koi Pending Payment Call Reminder Nahi Hai!</div>
        <div style="font-size:12px;margin-top:4px;">Sabhi scheduled follow-up calls update ho chuki hain.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = dueItems
    .map((item) => {
      const isToday = item.followUpNextDate === todayStr;
      const dateBadgeHtml = isToday
        ? `<span class="reminder-date-pill reminder-date-pill--today">⏰ Call Due Today (${item.followUpNextDate})</span>`
        : `<span class="reminder-date-pill reminder-date-pill--overdue">⚠️ Overdue Call (${item.followUpNextDate})</span>`;

      return `
        <div class="reminder-call-card">
          <div class="reminder-call-card__head">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="user-avatar-badge">${(item.username || 'U').charAt(0).toUpperCase()}</span>
              <div>
                <div style="font-weight:700;color:var(--navy);font-size:14.5px;">${item.username}</div>
                <div style="font-size:11.5px;color:#64748b;">${item.clientName || 'Standard Client'} • Sales/AM: <strong>${item.accountManager || 'Direct'}</strong></div>
              </div>
            </div>
            <div>${dateBadgeHtml}</div>
          </div>

          <div class="reminder-call-card__body">
            <div class="reminder-metric-row">
              <div>
                <span style="font-size:10.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Outstanding Amount</span>
                <div style="font-size:16px;font-weight:800;color:#ea580c;" class="tnum">₹${formatNumberIN(item.totalAmount)}</div>
              </div>
              <div>
                <span style="font-size:10.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Invoice No.</span>
                <div style="font-size:12.5px;font-weight:700;color:var(--navy);">${item.invoiceNumber || 'Pending Raise'}</div>
              </div>
              <div>
                <span style="font-size:10.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Channels Used</span>
                <div>${getServiceChannelPillsHtml(item.service)}</div>
              </div>
            </div>

            <div class="reminder-note-box">
              <div style="font-size:11px;font-weight:700;color:#9a3412;">📝 Billing Desk Follow-Up Instruction / Note:</div>
              <div style="font-size:13px;color:#1e293b;margin-top:2px;font-weight:600;">
                ${item.followUpBillingRemark ? `"${item.followUpBillingRemark}"` : 'Client payment confirmation call required.'}
              </div>
              ${item.followUpBillingOutcome ? `<div style="font-size:11px;color:#64748b;margin-top:3px;">Recorded Outcome: <strong>${item.followUpBillingOutcome}</strong></div>` : ''}
            </div>
          </div>

          <div class="reminder-call-card__actions">
            <button type="button" class="btn btn--accent btn--sm" onclick="callReminderActionUpdate('${item.id}')">
              <span>📞 Call Done / Update Follow-Up</span>
            </button>
            <button type="button" class="btn btn--navy btn--sm" onclick="callReminderActionPaid('${item.id}')">
              <span>💰 Record Payment Received</span>
            </button>
            <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="tbl-btn tbl-btn--view">
              <span>View Details ↗</span>
            </a>
          </div>
        </div>
      `;
    })
    .join('');
}

window.callReminderActionUpdate = function(id) {
  closePaymentRemindersModal();
  if (typeof openQuickBillingFollowUp === 'function') {
    openQuickBillingFollowUp(id);
  } else if (typeof openEditModal === 'function') {
    openEditModal(id);
  }
};

window.callReminderActionPaid = function(id) {
  closePaymentRemindersModal();
  if (typeof openEditModal === 'function') {
    openEditModal(id);
  }
};

// =========================================================================
// DEDICATED FOLLOW-UP MANAGEMENT DESK (BILLING & ADMIN)
// =========================================================================
window.renderFollowUpDesk = function() {
  const container = document.getElementById('followUpListContainer');
  if (!container) return;

  const todayStr = getLocalDateYYYYMMDD(new Date());
  const allRecharges = state.recharges || [];

  // All records with any follow-up activity
  const followUpItems = allRecharges.filter((r) => {
    return (
      r.followUpStatus === 'Requested' ||
      r.followUpStatus === 'Updated' ||
      r.followUpStatus === 'Resolved' ||
      Boolean(r.followUpNextDate) ||
      Boolean(r.followUpAdminRemark) ||
      Boolean(r.followUpBillingRemark)
    );
  });

  // Calculate top KPI stats
  const totalCases = followUpItems.length;
  const dueTodayCases = followUpItems.filter(
    (r) =>
      r.followUpNextDate &&
      r.followUpNextDate <= todayStr &&
      r.paymentStatus !== 'Received' &&
      r.paymentStatus !== 'Payment Received' &&
      r.followUpStatus !== 'Resolved'
  ).length;
  const awaitingReplyCases = followUpItems.filter((r) => r.followUpStatus === 'Requested').length;
  const updatedCases = followUpItems.filter((r) => r.followUpStatus === 'Updated').length;

  const statTotal = document.getElementById('fuStatTotal');
  if (statTotal) statTotal.textContent = totalCases;
  const statDue = document.getElementById('fuStatDueToday');
  if (statDue) statDue.textContent = dueTodayCases;
  const statAwaiting = document.getElementById('fuStatAwaiting');
  if (statAwaiting) statAwaiting.textContent = awaitingReplyCases;
  const statUpdated = document.getElementById('fuStatUpdated');
  if (statUpdated) statUpdated.textContent = updatedCases;

  // Update sidebar badge
  if (optFollowUpBadge) {
    const activeCases = awaitingReplyCases + dueTodayCases;
    optFollowUpBadge.textContent = activeCases;
    if (dueTodayCases > 0) {
      optFollowUpBadge.classList.add('blink-pulse-badge');
      optFollowUpBadge.title = `${dueTodayCases} Calls Due Today!`;
    } else {
      optFollowUpBadge.classList.remove('blink-pulse-badge');
      optFollowUpBadge.title = `${activeCases} Active Follow-Ups`;
    }
  }

  // Filter tab & search
  const currentTab = state.followUpDeskTab || 'ALL';
  const query = (state.followUpSearchQuery || '').toLowerCase().trim();

  let filtered = followUpItems.filter((r) => {
    if (currentTab === 'DUE') {
      return (
        r.followUpNextDate &&
        r.followUpNextDate <= todayStr &&
        r.paymentStatus !== 'Received' &&
        r.paymentStatus !== 'Payment Received' &&
        r.followUpStatus !== 'Resolved'
      );
    }
    if (currentTab === 'REQUESTED') return r.followUpStatus === 'Requested';
    if (currentTab === 'UPDATED') return r.followUpStatus === 'Updated';
    if (currentTab === 'RESOLVED') {
      return (
        r.followUpStatus === 'Resolved' ||
        r.paymentStatus === 'Received' ||
        r.paymentStatus === 'Payment Received'
      );
    }
    return true;
  });

  if (query) {
    filtered = filtered.filter((r) => {
      const hay = `${r.username} ${r.clientName || ''} ${r.accountManager || ''} ${r.id} ${r.followUpAdminRemark || ''} ${r.followUpBillingRemark || ''} ${r.followUpBillingOutcome || ''}`.toLowerCase();
      return hay.includes(query);
    });
  }

  // Sort: calls due today first, then requested, then updated, then others
  filtered.sort((a, b) => {
    const aIsDue = a.followUpNextDate && a.followUpNextDate <= todayStr && a.paymentStatus !== 'Received';
    const bIsDue = b.followUpNextDate && b.followUpNextDate <= todayStr && b.paymentStatus !== 'Received';
    if (aIsDue && !bIsDue) return -1;
    if (!aIsDue && bIsDue) return 1;
    if (a.followUpStatus === 'Requested' && b.followUpStatus !== 'Requested') return -1;
    if (a.followUpStatus !== 'Requested' && b.followUpStatus === 'Requested') return 1;
    return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:48px 20px;background:#ffffff;border:1px dashed var(--rule);border-radius:10px;">
        <div style="font-size:36px;margin-bottom:10px;">📞</div>
        <div style="font-weight:700;font-size:15px;color:var(--navy);">Koi Follow-Up Record Nahi Mila</div>
        <div style="font-size:13px;color:#64748b;margin-top:4px;">
          ${query ? `Search query "${query}" ke mutabik koi match nahi mila.` : 'Is filter tab me filhal koi active follow-up nahi hai.'}
        </div>
      </div>
    `;
    return;
  }

  const isAdmin = state.currentUser?.role === 'admin';
  const isAccounts = state.currentUser?.role === 'accounts';

  container.innerHTML = filtered
    .map((item) => {
      const isDue =
        item.followUpNextDate &&
        item.followUpNextDate <= todayStr &&
        item.paymentStatus !== 'Received' &&
        item.paymentStatus !== 'Payment Received' &&
        item.followUpStatus !== 'Resolved';
      const isToday = item.followUpNextDate === todayStr;

      let borderLeftColor = '#cbd5e1';
      let statusBadgeHtml = '';

      if (item.followUpStatus === 'Requested') {
        borderLeftColor = '#ea580c';
        statusBadgeHtml = `<span class="mono-badge" style="background:#fff7ed;color:#ea580c;border:1px solid #fed7aa;font-weight:700;padding:3px 9px;">🔔 Follow-Up Requested by Admin</span>`;
      } else if (item.followUpStatus === 'Updated') {
        borderLeftColor = '#16a34a';
        statusBadgeHtml = `<span class="mono-badge" style="background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;font-weight:700;padding:3px 9px;">🟢 Follow-Up Done by Billing</span>`;
      } else if (item.followUpStatus === 'Resolved') {
        borderLeftColor = '#0284c7';
        statusBadgeHtml = `<span class="mono-badge" style="background:#f0f9ff;color:#0284c7;border:1px solid #bae6fd;font-weight:700;padding:3px 9px;">✓ Follow-Up Resolved / Closed</span>`;
      } else {
        statusBadgeHtml = `<span class="mono-badge" style="background:#f8fafc;color:#475569;border:1px solid #e2e8f0;padding:3px 9px;">Follow-Up Active</span>`;
      }

      const dueBadgeHtml = isDue
        ? isToday
          ? `<span class="reminder-date-pill reminder-date-pill--today">⏰ Call Due Today (${item.followUpNextDate})</span>`
          : `<span class="reminder-date-pill reminder-date-pill--overdue">⚠️ Overdue Call (${item.followUpNextDate})</span>`
        : item.followUpNextDate
        ? `<span class="reminder-date-pill" style="background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;">📅 Next Call: ${item.followUpNextDate}</span>`
        : '';

      return `
        <div class="reminder-call-card" style="border-left: 4px solid ${borderLeftColor};">
          <div class="reminder-call-card__head">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="user-avatar-badge">${(item.username || 'U').charAt(0).toUpperCase()}</span>
              <div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <strong style="font-size:15px;color:var(--navy);">${item.username}</strong>
                  <span class="tbl-id-text" style="font-size:11.5px;color:#64748b;">${item.id}</span>
                </div>
                <div style="font-size:12px;color:#64748b;margin-top:2px;">
                  ${item.clientName || 'Standard Client'} • Sales/AM: <strong style="color:var(--navy);">${item.accountManager || 'Direct'}</strong> • Source: ${item.source || 'WhatsApp'}
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              ${statusBadgeHtml}
              ${dueBadgeHtml}
            </div>
          </div>

          <div class="reminder-call-card__body">
            <!-- Financial Details Strip -->
            <div class="reminder-metric-row">
              <div>
                <span style="font-size:10.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Total Amount</span>
                <div style="font-size:16px;font-weight:800;color:var(--navy);" class="tnum">₹${formatNumberIN(item.totalAmount)}</div>
              </div>
              <div>
                <span style="font-size:10.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Billing Status</span>
                <div style="font-size:12px;font-weight:700;color:${item.billingStatus === 'Billing Raised' ? '#16a34a' : '#b45309'};">
                  ${item.billingStatus} ${item.invoiceNumber ? `(${item.invoiceNumber})` : ''}
                </div>
              </div>
              <div>
                <span style="font-size:10.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Payment Status</span>
                <div>
                  <span class="payment-pill ${
                    (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? 'payment-pill--paid' :
                    (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? 'payment-pill--partial' : 'payment-pill--unpaid'
                  }">
                    ${
                      (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? '✓ Paid' :
                      (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? `💰 ₹${formatNumberIN(item.paidAmount || 0)}` : '⏳ Unpaid'
                    }
                  </span>
                </div>
              </div>
              <div>
                <span style="font-size:10.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Scheduled Call</span>
                <div style="font-size:12.5px;font-weight:700;color:#c2410c;" class="tnum">
                  ${item.followUpNextDate ? item.followUpNextDate : '—'}
                </div>
              </div>
            </div>

            <!-- Notes & Threads -->
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${item.followUpAdminRemark ? `
                <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;padding:9px 12px;font-size:12.5px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <strong style="color:#c2410c;font-size:11.5px;text-transform:uppercase;">👑 Admin Follow-Up Instruction:</strong>
                    <span style="font-size:11px;color:#9a3412;">${item.followUpRequestedAt ? formatDateTime(item.followUpRequestedAt) : ''}</span>
                  </div>
                  <div style="color:#1e293b;margin-top:2px;font-weight:500;">"${item.followUpAdminRemark}"</div>
                </div>
              ` : ''}

              ${item.followUpBillingRemark || item.followUpProofUrl ? `
                <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:9px 12px;font-size:12.5px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:6px;">
                      <strong style="color:#16a34a;font-size:11.5px;text-transform:uppercase;">🟢 Billing Follow-Up Update:</strong>
                      ${item.followUpBillingOutcome ? `<span class="mono-badge" style="background:#dcfce7;color:#15803d;padding:1px 6px;font-size:10.5px;">${item.followUpBillingOutcome}</span>` : ''}
                    </div>
                    <span style="font-size:11px;color:#166534;">${item.followUpUpdatedAt ? formatDateTime(item.followUpUpdatedAt) : ''}</span>
                  </div>
                  <div style="color:#1e293b;margin-top:3px;font-weight:500;">
                    ${item.followUpBillingRemark ? `"${item.followUpBillingRemark}"` : 'Follow-up call updated with supporting proof.'}
                  </div>
                  ${item.followUpProofUrl ? `
                    <div style="margin-top:8px;display:flex;align-items:center;gap:10px;">
                      <img src="${item.followUpProofUrl}" style="width:46px;height:46px;border-radius:6px;object-fit:cover;border:1px solid #86efac;cursor:pointer;" onclick="openImageViewer('${item.followUpProofUrl}', 'Supporting Proof - ${item.username}')" />
                      <div>
                        <button type="button" class="btn btn--outline btn--sm" style="font-size:11px;padding:3px 9px;" onclick="openImageViewer('${item.followUpProofUrl}', 'Supporting Proof - ${item.username}')">
                          👁 View Supporting Proof (${item.followUpProofName || 'Receipt'})
                        </button>
                      </div>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Action Row -->
          <div class="reminder-call-card__actions">
            <button type="button" class="btn btn--accent btn--sm" onclick="openQuickBillingFollowUp('${item.id}')" title="Call Done / Update Notes with Supporting Proof">
              <span>📞 Call Done / Update Notes</span>
            </button>
            <button type="button" class="btn btn--navy btn--sm" onclick="openEditModal('${item.id}')" title="Record Payment Status">
              <span>💰 Record Payment</span>
            </button>
            ${isAdmin ? `
              ${item.followUpStatus === 'Updated' ? `
                <button type="button" class="btn btn--outline btn--sm" style="color:#16a34a;border-color:#bbf7d0;" onclick="resolveFollowUp('${item.id}')" title="Mark follow-up as reviewed & resolved">
                  <span>✓ Close Follow-Up</span>
                </button>
              ` : ''}
              <button type="button" class="btn btn--ghost btn--sm" onclick="openQuickAdminFollowUp('${item.id}')" title="Send Fresh Follow-Up Note to Billing Desk">
                <span>💬 Admin Note</span>
              </button>
            ` : ''}
            <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="tbl-btn tbl-btn--view" title="Open Full Invoice Ledger">
              <span>Full Details ↗</span>
            </a>
          </div>
        </div>
      `;
    })
    .join('');
};

window.exportFollowUpData = function() {
  const allRecharges = state.recharges || [];
  const followUpItems = allRecharges.filter((r) => {
    return (
      r.followUpStatus === 'Requested' ||
      r.followUpStatus === 'Updated' ||
      r.followUpStatus === 'Resolved' ||
      Boolean(r.followUpNextDate) ||
      Boolean(r.followUpAdminRemark) ||
      Boolean(r.followUpBillingRemark)
    );
  });

  if (followUpItems.length === 0) {
    showToast('Export karne ke liye koi follow-up record nahi hai.');
    return;
  }

  const rows = followUpItems.map((r) => ({
    'ID': r.id,
    'Client Username': r.username,
    'Company Name': r.clientName || '',
    'Sales/AM': r.accountManager || '',
    'Total Amount (₹)': r.totalAmount || 0,
    'Billing Status': r.billingStatus || '',
    'Invoice Number': r.invoiceNumber || '',
    'Payment Status': r.paymentStatus || 'Pending',
    'Follow-Up Status': r.followUpStatus || 'None',
    'Next Scheduled Call Date': r.followUpNextDate || '',
    'Admin Instruction': r.followUpAdminRemark || '',
    'Billing Recorded Outcome': r.followUpBillingOutcome || '',
    'Billing Follow-Up Remark': r.followUpBillingRemark || '',
    'Last Updated At': r.followUpUpdatedAt ? formatDateTime(r.followUpUpdatedAt) : ''
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Follow-Ups');
  XLSX.writeFile(wb, `Payment_Follow_Ups_${getLocalDateYYYYMMDD(new Date())}.xlsx`);
  showToast('Follow-Up export complete!');
};

const followUpSearchInput = document.getElementById('followUpSearchInput');
if (followUpSearchInput) {
  followUpSearchInput.addEventListener('input', (e) => {
    state.followUpSearchQuery = e.target.value;
    renderFollowUpDesk();
  });
}

const followUpFilterPills = document.getElementById('followUpFilterPills');
if (followUpFilterPills) {
  followUpFilterPills.addEventListener('click', (e) => {
    const btn = e.target.closest('.status-pill');
    if (!btn) return;
    followUpFilterPills.querySelectorAll('.status-pill').forEach((b) => b.classList.toggle('active', b === btn));
    state.followUpDeskTab = btn.dataset.futab;
    renderFollowUpDesk();
  });
}

// =========================================================================
// KPI CARD EYE BUTTON DRILL-DOWN DETAILS MODAL
// =========================================================================
state.kpiModalCategory = null;
state.kpiModalFullList = [];
state.kpiModalFilteredList = [];

window.openKpiDetailsModal = function(category) {
  const modal = document.getElementById('kpiDetailsModal');
  if (!modal) return;

  const list = getReportFilteredRecharges();
  const todayStr = getLocalDateYYYYMMDD(new Date());

  state.kpiModalCategory = category;
  let catTitle = 'Detailed Records';
  let catBadge = 'ACCOUNT DRILL-DOWN';
  let catSubtitle = '';
  let badgeBg = '#f1f5f9';
  let badgeColor = '#334155';
  let filtered = [];

  if (category === 'TOTAL_RECHARGE') {
    catTitle = '👁️ Total Recharge Details';
    catBadge = 'ALL RECHARGES';
    catSubtitle = 'All recharge entries within selected date & filter period';
    badgeBg = '#eff6ff';
    badgeColor = '#1d4ed8';
    filtered = [...list];
  } else if (category === 'BILLING_RAISED') {
    catTitle = '👁️ Total Billing Raised Details';
    catBadge = 'BILLED / INVOICED';
    catSubtitle = 'All records with formal invoices generated & dispatched';
    badgeBg = '#f0fdf4';
    badgeColor = '#16a34a';
    filtered = list.filter((r) => r.billingStatus === 'Billing Raised');
  } else if (category === 'PENDING_BILL') {
    catTitle = '👁️ Pending Bill Details';
    catBadge = 'PENDING BILL';
    catSubtitle = 'Recharges awaiting invoice generation and billing verification';
    badgeBg = '#fff7ed';
    badgeColor = '#c2410c';
    filtered = list.filter((r) => r.billingStatus === 'Pending' || r.billingStatus === 'On Hold' || !r.billingStatus);
  } else if (category === 'TOTAL_FOLLOWUP') {
    catTitle = '👁️ Total Follow-Up Details';
    catBadge = 'ALL FOLLOW-UP CASES';
    catSubtitle = 'All records with active payment follow-up history or scheduled calls';
    badgeBg = '#f0f9ff';
    badgeColor = '#0284c7';
    filtered = list.filter((r) => {
      return (
        r.followUpStatus === 'Requested' ||
        r.followUpStatus === 'Updated' ||
        r.followUpStatus === 'Resolved' ||
        Boolean(r.followUpNextDate) ||
        Boolean(r.followUpAdminRemark) ||
        Boolean(r.followUpBillingRemark)
      );
    });
  } else if (category === 'PENDING_FOLLOWUP') {
    catTitle = '👁️ Pending Follow-Up / Due Calls';
    catBadge = 'ACTION REQUIRED';
    catSubtitle = 'Follow-up requests awaiting billing response or calls scheduled for today / overdue';
    badgeBg = '#fef2f2';
    badgeColor = '#dc2626';
    filtered = list.filter((r) => {
      return (
        r.followUpStatus === 'Requested' ||
        (r.followUpNextDate &&
          r.followUpNextDate <= todayStr &&
          r.paymentStatus !== 'Received' &&
          r.paymentStatus !== 'Payment Received' &&
          r.followUpStatus !== 'Resolved')
      );
    });
  }

  // Update modal header elements
  const titleEl = document.getElementById('kpiDetailsTitle');
  if (titleEl) titleEl.textContent = catTitle;
  const badgeEl = document.getElementById('kpiDetailsBadge');
  if (badgeEl) {
    badgeEl.textContent = catBadge;
    badgeEl.style.background = badgeBg;
    badgeEl.style.color = badgeColor;
  }
  const subEl = document.getElementById('kpiDetailsSubtitle');
  if (subEl) subEl.textContent = catSubtitle;

  const searchInput = document.getElementById('kpiModalSearchInput');
  if (searchInput) searchInput.value = '';

  state.kpiModalFullList = filtered;
  state.kpiModalFilteredList = [...filtered];

  renderKpiModalTable();
  modal.classList.remove('hidden');
};

window.filterKpiModalList = function(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    state.kpiModalFilteredList = [...state.kpiModalFullList];
  } else {
    state.kpiModalFilteredList = state.kpiModalFullList.filter((r) => {
      const hay = `${r.username} ${r.clientName || ''} ${r.id} ${r.accountManager || ''} ${r.service || ''} ${r.billingStatus || ''} ${r.invoiceNumber || ''} ${r.paymentStatus || ''} ${r.followUpAdminRemark || ''} ${r.followUpBillingRemark || ''}`.toLowerCase();
      return hay.includes(q);
    });
  }
  renderKpiModalTable();
};

window.renderKpiModalTable = function() {
  const tbody = document.getElementById('kpiDetailsTableBody');
  const countEl = document.getElementById('kpiModalCount');
  const amountEl = document.getElementById('kpiModalAmount');
  if (!tbody) return;

  const list = state.kpiModalFilteredList || [];
  const totalAmt = list.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  if (countEl) countEl.textContent = `${list.length} records`;
  if (amountEl) amountEl.textContent = formatCurrencyIN(totalAmt);

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align:center;padding:40px 16px;color:#64748b;">
          <div style="font-size:28px;margin-bottom:6px;">📂</div>
          <div style="font-weight:700;font-size:14.5px;color:var(--navy);">Koi Record Nahi Mila</div>
          <div style="font-size:12px;margin-top:2px;">Is category ya search filter me filhal koi match nahi mila.</div>
        </td>
      </tr>
    `;
    return;
  }

  const todayStr = getLocalDateYYYYMMDD(new Date());

  tbody.innerHTML = list.map((item) => {
    const isDue = item.followUpNextDate && item.followUpNextDate <= todayStr && item.paymentStatus !== 'Received' && item.paymentStatus !== 'Payment Received';
    const isBilled = item.billingStatus === 'Billing Raised';

    let followUpPill = '<span style="color:#94a3b8;font-size:12px;">—</span>';
    if (item.followUpStatus === 'Requested') {
      followUpPill = `<span class="mono-badge" style="background:#fff7ed;color:#ea580c;border:1px solid #fed7aa;font-size:10.5px;padding:2px 6px;">🔔 Needs Reply</span>`;
    } else if (item.followUpStatus === 'Updated') {
      followUpPill = `<span class="mono-badge" style="background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;font-size:10.5px;padding:2px 6px;">🟢 Updated</span>`;
    } else if (item.followUpStatus === 'Resolved') {
      followUpPill = `<span class="mono-badge" style="background:#f0f9ff;color:#0284c7;border:1px solid #bae6fd;font-size:10.5px;padding:2px 6px;">✓ Resolved</span>`;
    }

    const datePill = item.followUpNextDate ? `
      <div style="margin-top:3px;">
        ${isDue ? `<span class="reminder-date-pill reminder-date-pill--today" style="font-size:10px;padding:1px 6px;">⏰ Due (${item.followUpNextDate})</span>` : `<span style="font-size:11px;color:#64748b;">📅 ${item.followUpNextDate}</span>`}
      </div>
    ` : '';

    return `
      <tr>
        <td>
          <div style="font-weight:700;color:var(--navy);font-family:var(--font-mono);font-size:12.5px;">${item.id}</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px;">${item.createdAt ? getLocalDateYYYYMMDD(new Date(item.createdAt)) : ''}</div>
        </td>
        <td>
          <div style="font-weight:700;color:var(--navy);font-size:13px;">${item.username}</div>
          <div style="font-size:11.5px;color:#64748b;margin-top:1px;">${item.clientName || 'Standard Client'}</div>
        </td>
        <td>
          <span class="service-tag service-tag--${(item.service || 'whatsapp').toLowerCase().replace(/\s+/g, '')}">${item.service || 'SMS'}</span>
          <div style="font-size:11.5px;color:#64748b;margin-top:2px;" class="tnum">${formatNumberIN(item.rechargeCount || 0)} units</div>
        </td>
        <td>
          <strong style="font-size:14px;color:var(--navy);" class="tnum">${formatCurrencyIN(item.totalAmount || 0)}</strong>
        </td>
        <td>
          <span style="font-size:12.5px;color:var(--navy);font-weight:600;">${item.accountManager || 'Direct'}</span>
        </td>
        <td>
          <span class="status-badge ${isBilled ? 'status-badge--raised' : 'status-badge--pending'}">
            ${item.billingStatus || 'Pending'}
          </span>
          ${item.invoiceNumber ? `<div style="font-size:10.5px;font-family:var(--font-mono);color:#64748b;margin-top:2px;">${item.invoiceNumber}</div>` : ''}
        </td>
        <td>
          <span class="payment-pill ${
            (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? 'payment-pill--paid' :
            (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? 'payment-pill--partial' : 'payment-pill--unpaid'
          }">
            ${
              (item.paymentStatus === 'Received' || item.paymentStatus === 'Payment Received') ? '✓ Paid' :
              (item.paymentStatus === 'Partial' || item.paymentStatus === 'Partial Payment') ? `💰 ₹${formatNumberIN(item.paidAmount || 0)}` : '⏳ Unpaid'
            }
          </span>
        </td>
        <td>
          ${followUpPill}
          ${datePill}
        </td>
        <td style="text-align:right;">
          <div style="display:flex;align-items:center;justify-content:flex-end;gap:5px;">
            ${!isBilled ? `
              <button type="button" class="btn btn--accent btn--sm" style="font-size:11px;padding:3px 7px;" onclick="closeKpiDetailsModal(); openEditModal('${item.id}');" title="Raise Bill">
                <span>Bill ✍</span>
              </button>
            ` : ''}
            <button type="button" class="btn btn--ghost btn--sm" style="font-size:11px;padding:3px 7px;" onclick="closeKpiDetailsModal(); openQuickBillingFollowUp('${item.id}');" title="Update Follow-Up Notes">
              <span>📞</span>
            </button>
            <a href="details.html?id=${encodeURIComponent(item.id)}" target="_blank" class="tbl-btn tbl-btn--view" title="Open Full Invoice Ledger" style="font-size:11px;padding:3px 8px;">
              <span>Full ↗</span>
            </a>
          </div>
        </td>
      </tr>
    `;
  }).join('');
};

window.closeKpiDetailsModal = function() {
  const modal = document.getElementById('kpiDetailsModal');
  if (modal) modal.classList.add('hidden');
};

window.exportKpiModalData = function() {
  const list = state.kpiModalFilteredList || [];
  if (list.length === 0) {
    showToast('Export karne ke liye koi records nahi hain.');
    return;
  }

  const categoryName = state.kpiModalCategory || 'Records';
  const rows = list.map((r) => ({
    'ID': r.id,
    'Date': r.createdAt ? getLocalDateYYYYMMDD(new Date(r.createdAt)) : '',
    'Client Username': r.username,
    'Company Name': r.clientName || '',
    'Service Channel': r.service || '',
    'Units': r.rechargeCount || 0,
    'Rate': r.ratePerUnit || 0,
    'Total Amount (₹)': r.totalAmount || 0,
    'Account Manager': r.accountManager || '',
    'Billing Status': r.billingStatus || 'Pending',
    'Invoice Number': r.invoiceNumber || '',
    'Payment Status': r.paymentStatus || 'Pending',
    'Follow-Up Status': r.followUpStatus || 'None',
    'Next Call Date': r.followUpNextDate || '',
    'Follow-Up Notes': r.followUpBillingRemark || r.followUpAdminRemark || ''
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Category Details');
  XLSX.writeFile(wb, `Account_${categoryName}_${getLocalDateYYYYMMDD(new Date())}.xlsx`);
  showToast(`${categoryName} export complete!`);
};

// REAL-TIME AUTO-POLL: Checks server every 4 seconds so Billing gets live blinking alert as soon as Support logs a recharge!
setInterval(async () => {
  if (!state.currentUser) return;
  // Don't auto-refresh while editing an invoice modal or viewing proof photo or reminders
  const editModal = document.getElementById('editModal');
  if (editModal && !editModal.classList.contains('hidden')) return;
  const imageViewer = document.getElementById('imageViewerModal');
  if (imageViewer && !imageViewer.classList.contains('hidden')) return;
  const qAdmin = document.getElementById('quickAdminFollowUpModal');
  if (qAdmin && !qAdmin.classList.contains('hidden')) return;
  const qBilling = document.getElementById('quickBillingFollowUpModal');
  if (qBilling && !qBilling.classList.contains('hidden')) return;
  const pReminders = document.getElementById('paymentRemindersModal');
  if (pReminders && !pReminders.classList.contains('hidden')) return;
  const kModal = document.getElementById('kpiDetailsModal');
  if (kModal && !kModal.classList.contains('hidden')) return;
  await fetchAllData();
}, 4000);

// Initialize Portal
enterAuthenticatedPortal();


// =============================================================================
// TELECOM & DLT ERROR CODE INTELLIGENCE HUB ENGINE (MERGED SUPPORT TOOL)
// =============================================================================
let errorHubInitialized = false;
let allErrorsData = [];
let filteredErrorsData = [];
let errorActiveOperator = 'All';
let errorActiveTarget = 'all'; // 'all', 'code', 'desc'
let errorCurrentQuery = '';
let errorRenderLimit = 48;
const ERROR_BATCH_SIZE = 48;

window.initErrorCodeHub = async function() {
  if (errorHubInitialized && allErrorsData.length > 0) {
    executeErrorSearch();
    return;
  }

  // Load dataset (try window.IMMENSE_ERRORS_DATA from errors-data.js, fallback to /api/errors)
  if (window.IMMENSE_ERRORS_DATA && Array.isArray(window.IMMENSE_ERRORS_DATA)) {
    allErrorsData = window.IMMENSE_ERRORS_DATA;
  } else {
    try {
      const res = await fetch('/api/errors');
      if (res.ok) {
        allErrorsData = await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch /api/errors, will retry on demand', e);
    }
  }

  // Update stats
  const statTotal = document.getElementById('errorStatTotal');
  if (statTotal) statTotal.textContent = allErrorsData.length.toLocaleString();
  const statOps = document.getElementById('errorStatOperators');
  if (statOps && allErrorsData.length > 0) {
    const ops = new Set(allErrorsData.map(e => e.operator).filter(Boolean));
    statOps.textContent = ops.size;
  }
  const badgeEl = document.getElementById('optErrorCodeBadge');
  if (badgeEl && allErrorsData.length > 0) {
    badgeEl.textContent = allErrorsData.length;
  }

  setupErrorHubEventListeners();
  errorHubInitialized = true;
  executeErrorSearch();
};

function setupErrorHubEventListeners() {
  const searchInput = document.getElementById('errorSearchInput');
  const execBtn = document.getElementById('errorSearchExecBtn');
  const clearBtn = document.getElementById('errorClearSearchBtn');
  const opTabs = document.getElementById('errorOperatorTabs');
  const targetSelect = document.getElementById('errorTargetSelect');
  const loadMoreBtn = document.getElementById('errorLoadMoreBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      errorCurrentQuery = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = errorCurrentQuery ? 'inline-flex' : 'none';
      executeErrorSearch();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        errorCurrentQuery = '';
        if (clearBtn) clearBtn.style.display = 'none';
        executeErrorSearch();
        searchInput.blur();
      }
    });
  }

  if (execBtn) {
    execBtn.addEventListener('click', () => {
      if (searchInput) errorCurrentQuery = searchInput.value.trim();
      executeErrorSearch();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      errorCurrentQuery = '';
      clearBtn.style.display = 'none';
      executeErrorSearch();
      if (searchInput) searchInput.focus();
    });
  }

  // Operator Category Tabs
  if (opTabs) {
    opTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.error-op-tab');
      if (!btn) return;
      opTabs.querySelectorAll('.error-op-tab').forEach(b => b.classList.toggle('active', b === btn));
      errorActiveOperator = btn.dataset.op || 'All';
      executeErrorSearch();
    });
  }

  // Target Filter
  if (targetSelect) {
    targetSelect.addEventListener('change', (e) => {
      errorActiveTarget = e.target.value || 'all';
      executeErrorSearch();
    });
  }

  // Load More Button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      errorRenderLimit += ERROR_BATCH_SIZE;
      renderErrorResults();
    });
  }

  // Global Keyboard shortcut '/' focuses search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      const input = document.getElementById('errorSearchInput');
      if (input && !errorCodePanel?.classList.contains('hidden')) {
        e.preventDefault();
        input.focus();
      }
    }
  });
}

function executeErrorSearch() {
  const t0 = performance.now();
  let results = allErrorsData || [];

  // 1. Filter by Operator
  if (errorActiveOperator !== 'All') {
    if (errorActiveOperator === 'SMPP') {
      results = results.filter(item => (item.category || '').toUpperCase().includes('SMPP') || (item.operator || '').toUpperCase().includes('SMPP'));
    } else {
      results = results.filter(item => (item.operator || '').toLowerCase() === errorActiveOperator.toLowerCase());
    }
  }

  // 2. Filter by Search Query
  const q = (errorCurrentQuery || '').toLowerCase().trim();
  if (q) {
    const tokens = q.split(/\s+/).filter(Boolean);

    results = results.filter(item => {
      const code = (item.error_code || item.ErrorCode || item.code || '').toLowerCase();
      const desc = (item.description || item.Description || '').toLowerCase();
      const name = (item.error_name || item.name || '').toLowerCase();
      const action = (item.portal_action || '').toLowerCase();

      if (errorActiveTarget === 'code') {
        return code.includes(q);
      } else if (errorActiveTarget === 'desc') {
        return tokens.every(tok => desc.includes(tok) || action.includes(tok));
      } else {
        if (code === q || code.includes(q)) return true;
        return tokens.every(tok => desc.includes(tok) || code.includes(tok) || name.includes(tok) || action.includes(tok));
      }
    });

    // Smart Ranking: Exact code match first, then startsWith, then includes
    results.sort((a, b) => {
      const aCode = (a.error_code || '').toLowerCase();
      const bCode = (b.error_code || '').toLowerCase();
      if (aCode === q && bCode !== q) return -1;
      if (bCode === q && aCode !== q) return 1;

      const aStarts = aCode.startsWith(q);
      const bStarts = bCode.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      const aHas = aCode.includes(q);
      const bHas = bCode.includes(q);
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;

      return aCode.localeCompare(bCode);
    });
  }

  const elapsed = Math.max(0.1, performance.now() - t0).toFixed(1);
  const durEl = document.getElementById('errorSearchDuration');
  if (durEl) durEl.textContent = `(${elapsed}ms)`;

  filteredErrorsData = results;
  errorRenderLimit = ERROR_BATCH_SIZE;
  renderErrorResults();
}

function renderErrorResults() {
  const grid = document.getElementById('errorResultsGrid');
  const countEl = document.getElementById('errorResultsCount');
  const emptyState = document.getElementById('errorEmptyState');
  const loadMoreBox = document.getElementById('errorLoadMoreContainer');
  const loadMoreBtn = document.getElementById('errorLoadMoreBtn');
  if (!grid) return;

  const total = filteredErrorsData.length;
  if (countEl) countEl.textContent = total.toLocaleString();

  if (total === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    if (loadMoreBox) loadMoreBox.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  const visibleItems = filteredErrorsData.slice(0, errorRenderLimit);

  grid.innerHTML = visibleItems.map(item => {
    const code = item.error_code || item.ErrorCode || item.code || '';
    const operator = item.operator || 'General';
    const errorName = item.error_name || item.name || '';
    const desc = item.description || item.Description || '';
    const action = item.portal_action || 'Verify message payload and parameters';
    const retry = item.retry || 'N/A';
    const category = item.category || 'General';
    const stage = item.stage || '';

    // Operator logo image or clean pill
    let opLogoHtml = `<span class="operator-badge-text">${escapeHtml(operator)}</span>`;
    const opLow = operator.toLowerCase();
    if (opLow.includes('jio')) {
      opLogoHtml = '<img src="assets/jio-logo.png" alt="Jio" class="operator-logo" title="Jio Telecom">';
    } else if (opLow.includes('airtel')) {
      opLogoHtml = '<img src="assets/airtel-logo.png" alt="Airtel" class="operator-logo" title="Airtel DLT">';
    } else if (opLow.includes('vi') || opLow.includes('vodafone')) {
      opLogoHtml = '<img src="assets/vi-logo.jpg" alt="Vi" class="operator-logo" title="Vodafone Idea">';
    } else if (opLow.includes('smartping')) {
      opLogoHtml = '<img src="assets/smartping-logo.png" alt="SmartPing" class="operator-logo" title="SmartPing DLT">';
    }

    const safeCode = escapeHtml(code);
    const highlightedCode = errorCurrentQuery ? highlightErrorMatches(safeCode, errorCurrentQuery) : safeCode;
    const highlightedDesc = errorCurrentQuery ? highlightErrorMatches(escapeHtml(desc), errorCurrentQuery) : escapeHtml(desc);
    const highlightedName = errorCurrentQuery ? highlightErrorMatches(escapeHtml(errorName), errorCurrentQuery) : escapeHtml(errorName);

    // Retry badge styling
    let retryBadge = `<span style="color:#64748b;font-weight:700;">${escapeHtml(retry)}</span>`;
    if (retry === 'YES') {
      retryBadge = '<span style="color:#16a34a;font-weight:700;">✓ YES (Safe to Retry)</span>';
    } else if (retry === 'NO') {
      retryBadge = '<span style="color:#dc2626;font-weight:700;">✕ NO (Do Not Retry)</span>';
    } else if (retry.includes('DEPENDENT') || retry.includes('PROVIDER')) {
      retryBadge = '<span style="color:#d97706;font-weight:700;">⚠ Provider-Dependent</span>';
    }

    return `
      <article class="error-card">
        <div>
          <div class="error-card-header">
            <div class="error-badge-group">
              ${opLogoHtml}
              <span class="error-code-badge">${highlightedCode}</span>
            </div>
            <span class="mono-badge" style="font-size:10px;padding:2px 8px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;">${escapeHtml(category)}</span>
          </div>

          ${errorName ? `<h4 class="error-card-title">${highlightedName}</h4>` : ''}
          <div class="error-card-desc">${highlightedDesc}</div>
        </div>

        <div>
          <div class="portal-action-box">
            <strong>Action:</strong>
            <span>${escapeHtml(action)}</span>
          </div>

          <div class="error-meta-box">
            <div class="error-meta-row">
              <span class="error-meta-key">Retry Policy:</span>
              <span class="error-meta-val">${retryBadge}</span>
            </div>
            ${stage ? `
              <div class="error-meta-row">
                <span class="error-meta-key">Pipeline Stage:</span>
                <span class="error-meta-val" style="color:#64748B;font-size:11.5px;">${escapeHtml(stage)}</span>
              </div>
            ` : ''}
          </div>

          <div class="error-card-actions">
            <button type="button" class="btn btn--outline btn--sm" style="font-size:11.5px;padding:5px 12px;border-radius:8px;" onclick="copyErrorCode('${escapeHtml(code)}')">
              <span>Copy Code</span>
            </button>
            <button type="button" class="btn btn--ghost btn--sm" style="font-size:11.5px;padding:5px 12px;border-radius:8px;" onclick="copyErrorFullDetails('${escapeHtml(operator)}', '${escapeHtml(code)}', '${escapeHtml(errorName)}', '${escapeHtml(desc)}', '${escapeHtml(action)}')">
              <span>Copy Diagnosis</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  if (loadMoreBox) {
    if (errorRenderLimit < total) {
      loadMoreBox.style.display = 'flex';
      if (loadMoreBtn) {
        loadMoreBtn.querySelector('span').textContent = `Show More Error Codes (${(total - errorRenderLimit).toLocaleString()} remaining)`;
      }
    } else {
      loadMoreBox.style.display = 'none';
    }
  }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightErrorMatches(text, query) {
  if (!text || !query) return text;
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return text;
  const pattern = tokens.map(t => t.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp('(' + pattern + ')', 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

window.quickSearchError = function(code) {
  const searchInput = document.getElementById('errorSearchInput');
  const clearBtn = document.getElementById('errorClearSearchBtn');
  if (searchInput) {
    searchInput.value = code;
    errorCurrentQuery = code;
    if (clearBtn) clearBtn.style.display = 'inline-flex';
    executeErrorSearch();
    searchInput.focus();
  }
};

window.copyErrorCode = function(code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Copied Error Code: ${code}`);
    });
  } else {
    showToast(`Code: ${code}`);
  }
};

window.copyErrorFullDetails = function(operator, code, name, desc, action) {
  const text = `Operator: ${operator}\nError Code: ${code}${name ? '\nName: ' + name : ''}\nDescription: ${desc}\nAction Required: ${action}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied full diagnosis for Error ${code}!`);
    });
  } else {
    showToast(`Copied details for Error ${code}`);
  }
};

