import React, { useState } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Calendar,
  Bell,
  AlertCircle,
  ExternalLink,
  LayoutDashboard,
  ClipboardList,
  Clock,
  TrendingUp,
  FileText,
  Menu,
  X,
  User,
  Paperclip,
} from 'https://esm.sh/lucide-react@0.462.0';

// Sample data - in real app, this comes from database
const SYSTEMS = [
  { id: 1, name: 'LastPass', category: 'High-Impact', lastAudit: '2024-01-15', nextAudit: '2024-04-15', status: 'complete', templateKey: 'lastpass' },
  { id: 2, name: 'Booker', category: 'High-Impact', lastAudit: '2024-01-20', nextAudit: '2024-04-20', status: 'complete', templateKey: 'booker' },
  { id: 3, name: 'Stripe', category: 'High-Impact', lastAudit: '2024-02-01', nextAudit: '2024-05-01', status: 'complete', templateKey: 'stripe' },
  { id: 4, name: 'Miro', category: 'High-Impact', lastAudit: '2024-01-28', nextAudit: '2024-04-28', status: 'complete', templateKey: 'miro' },
  { id: 5, name: 'ClickUp', category: 'Core Operational', lastAudit: '2024-01-10', nextAudit: '2024-04-10', status: 'overdue', templateKey: 'clickup' },
  { id: 6, name: 'GoHighLevel', category: 'Core Operational', lastAudit: '2024-01-25', nextAudit: '2024-04-25', status: 'in-progress', templateKey: 'gohighlevel' },
  { id: 7, name: 'Jotform', category: 'Core Operational', lastAudit: '2023-12-15', nextAudit: '2024-03-15', status: 'overdue', templateKey: 'jotform' },
  { id: 8, name: 'Google Workspace', category: 'Core Operational', lastAudit: '2024-02-05', nextAudit: '2024-05-05', status: 'pending', templateKey: 'googleworkspace' },
  { id: 9, name: 'Dialpad', category: 'Core Operational', lastAudit: '2024-02-03', nextAudit: '2024-05-03', status: 'pending', templateKey: 'dialpad' },
  { id: 10, name: 'WooCommerce + ATUM', category: 'Core Operational', lastAudit: '2024-01-18', nextAudit: '2024-04-18', status: 'complete', templateKey: 'woocommerce' },
  { id: 11, name: 'Slack', category: 'Internal Support', lastAudit: '2024-01-30', nextAudit: '2024-04-30', status: 'complete', templateKey: 'slack' },
  { id: 12, name: 'Process Street', category: 'Internal Support', lastAudit: '2024-02-08', nextAudit: '2024-05-08', status: 'pending', templateKey: 'processstreet' },
];

const AUDIT_TEMPLATES = {
  lastpass: {
    name: 'LastPass',
    purpose: 'Ensure all shared credentials, vault access, and security settings remain accurate, restricted to active staff, and compliant with security standards.',
    accountableTeam: 'IT/Security Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Login to Lastpass Admin Console',
          'Confirm vault loads correctly and shared folders are accessible',
          'Spot-check 3-5 credentials → confirm login works or is marked as "valid"',
          'Review security alerts → confirm no unresolved warnings',
          '📎 Attach screenshot of vault overview or security dashboard',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Admin → Users → export active user list',
          'Confirm only active staff have access',
          'Remove or suspend inactive, duplicate, or former users',
          'Verify admin roles are limited to approved owners only',
          '📎 Attach user list screenshot or export',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Confirm password health score is within acceptable range',
          'Verify shared credentials are not duplicated across vaults',
          'Check no personal passwords are stored in shared folders',
          '📎 Attach password health or shared folder screenshot',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Review connected apps or browser integrations',
          'Confirm no failed syncs or access errors',
          'Rotate shared credential passwords if flagged or outdated',
          '📎 Attach integration or activity log screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  booker: {
    name: 'Booker',
    purpose: 'Ensure client bookings and payment integrations are functioning correctly and reflect current operations.',
    accountableTeam: 'Operations Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Create a test appointment → confirm confirmation email is received',
          'Verify appointment appears correctly on staff calendar',
          'Check payment or booking status updates correctly',
          '📎 Attach test booking screenshot',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Review staff/user access → confirm only active staff listed',
          'Verify service offerings and availability schedules are current',
          'Remove inactive services or staff profiles',
          '📎 Attach staff or services page screenshot',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Review 5 recent bookings → confirm client info and timestamps are accurate',
          'Confirm pricing matches approved rates',
          'Verify cancellation and no-show rules are correct',
          '📎 Attach sample booking screenshot',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Check integrations (Stripe, calendars, email)',
          'Confirm booking → payment → confirmation flow works end-to-end',
          'Review integration logs for errors',
          '📎 Attach integration panel screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  stripe: {
    name: 'Stripe',
    purpose: 'Ensure billing, payments, subscriptions, and alerts are functioning correctly with no revenue-impacting failures.',
    accountableTeam: 'Finance Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Review Dashboard → confirm payments are processing normally',
          'Spot-check 5 recent transactions → verify status and amounts',
          'Confirm payout schedule is active and current',
          '📎 Attach dashboard screenshot',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Settings → Team → review active users',
          'Confirm admin access is limited to finance/ops leads',
          'Remove inactive or unapproved users',
          '📎 Attach team access screenshot',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Review failed payments and disputes → confirm follow-ups exist',
          'Verify subscription plans and pricing match approved rates',
          'Confirm tax or compliance settings are unchanged',
          '📎 Attach subscriptions or disputes screenshot',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Check integrations (Booker, Zapier, n8n, accounting tools)',
          'Review webhook logs → confirm no failures',
          'Verify API keys are active and not expired',
          '📎 Attach webhook or integration log screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  clickup: {
    name: 'ClickUp',
    purpose: 'Maintain an organized, accurate, and up-to-date workspace that reflects active company operations and responsibilities.',
    accountableTeam: 'Operations Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Log in → review all active Workspaces, Folders, and Lists',
          'Identify outdated, completed, or paused projects → archive them',
          'Spot-check task assignments and due dates for accuracy',
          'Verify dashboards and automations load properly',
          '📎 Attach one screenshot of a working automation or dashboard',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Workspace → People → confirm only current team members',
          'Remove inactive or test user accounts',
          'Confirm folder structure matches current departments (Ops, Tech, Marketing, Clinical, etc.)',
          '📎 Attach user list export',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Check naming consistency (Project_Task_Date)',
          'Confirm all closed tasks have assignee and due date',
          '📎 Attach sample task screenshot',
        ],
      },
      {
        title: 'Documentation & Training Review',
        tasks: [
          'Open SOP links in templates → confirm they reflect current process',
          'Update outdated ClickUp SOP references',
          '📎 Attach updated SOP link',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Test automations with Slack / Process Street',
          'Rotate API keys if older than 6 months',
          '📎 Attach screenshot of Zapier or automation log',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  gohighlevel: {
    name: 'GoHighLevel',
    purpose: 'Ensure pipelines, automations, and data integrity operate as designed.',
    accountableTeam: 'Operations Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'CRM Cleanup: Export contacts → identify duplicates or test records → merge or archive them',
          'Pipeline Cleanup: Open Opportunities → remove test entries → review Support Pipeline → resolve or close tickets',
          '📎 Attach pipeline screenshot',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Settings → Team Management → export active users',
          'Confirm only current staff remain; roles = Admin / Team Members',
          'Remove inactive or duplicate accounts',
          '📎 Attach user list',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Open 10 recent contacts → check complete details (name, email, tag)',
          'Verify "Do Not Contact" tags for opt-outs',
          '📎 Attach sample contact',
        ],
      },
      {
        title: 'Documentation & Training Review',
        tasks: [
          'Open GHL SOP → confirm pipelines, automations, and message templates match',
          'Paste updated SOP link below if edits were made',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Check Zapier + Webhook logs → no errors',
          'Confirm API key last rotated ≤ 6 months',
          '📎 Attach log screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  jotform: {
    name: 'Jotform',
    purpose: 'Ensure all forms collect accurate data, integrations function properly, and stored versions are current.',
    accountableTeam: 'Operations Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Open Forms Master Sheet → list all active forms',
          'Test each form → confirm submission recorded and notification email received',
          '📎 Attach submission screenshot',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'My Teams → Users → verify access = active staff only',
          'Ensure all shared forms = Private',
          '📎 Attach access screenshot',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Review 5–10 recent submissions → confirm required fields filled',
          'Check no personal data in public links',
          '📎 Attach sample entry',
        ],
      },
      {
        title: 'Documentation & Training Review',
        tasks: [
          'If any form updated, also update PDF format & version number',
          'Replace old copy in Drive Forms Folder using correct naming convention',
          '📎 Attach updated form or folder screenshot',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Check integrations (Google Sheets, GHL, Slack) = Connected',
          'Test one live sync to confirm data flow',
          '📎 Attach integration panel screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  googleworkspace: {
    name: 'Google Workspace',
    purpose: 'Ensure Drive files, user accounts, and sharing permissions are secure, accurate, and aligned with company access policy.',
    accountableTeam: 'IT Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Send a test email and confirm delivery',
          'Open shared Drive folders → confirm files accessible',
          'Check that key Google Sheets and Docs load without errors',
          '📎 Attach email + Drive screenshots',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Admin Console → Users → export active list',
          'Confirm offboarded users deleted; admins limited to Ops Lead / IT',
          'Security → confirm 2-Step Verification enforced',
          '📎 Attach user export + MFA screenshot',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Review 5 shared files → "Anyone with link" = Disabled',
          'Confirm data naming follows convention (Dept_Project_Date)',
          '📎 Attach link-sharing screenshot',
        ],
      },
      {
        title: 'Documentation & Training Review',
        tasks: [
          'Check Drive SOP and folder structure doc → ensure it matches current setup',
          'Update SOP if access or folder ownership changed',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Review connected apps (Slack, ClickUp, Zapier) → confirm all marked Active',
          'Revoke unused or unapproved apps',
          '📎 Attach connected-apps screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  dialpad: {
    name: 'Dialpad',
    purpose: "Ensure the company's call system is working correctly, call data is accurate, and access permissions are limited to active staff.",
    accountableTeam: 'Operations Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Make a test call and confirm it connects and records properly',
          'Listen to the recording → ensure audio quality and transcript are clear',
          'Check call routing between departments or users functions as intended',
          '📎 Attach call log screenshot',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Admin → Office → Users → review active accounts',
          'Remove or suspend offboarded staff',
          'Confirm department and extension assignments are correct',
          '📎 Attach Users page screenshot',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Open 10 recent call records → verify timestamps and duration accuracy',
          'Confirm call data retention ≤ 90 days or per company policy',
          '📎 Attach call history screenshot',
        ],
      },
      {
        title: 'Documentation & Training Review',
        tasks: [
          'Review "Communication & Call Handling" SOP → confirm routing and voicemail steps align',
          'Update or flag SOP if departments changed',
          '📎 Attach SOP link',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Check integrations (Google Workspace / Slack) → Active and syncing',
          'Verify billing or analytics dashboards load correctly',
          '📎 Attach connected-apps screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  woocommerce: {
    name: 'WooCommerce + ATUM',
    purpose: 'Ensure product details, pricing, and stock levels in WooCommerce and ATUM are accurate and consistent with vendor and POS records.',
    accountableTeam: 'E-commerce Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Place a test order using coupon TEST → confirm order flow = Pending → Processing → Completed',
          'Verify order email notification received',
          '📎 Attach order screenshot',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'WordPress → Users → confirm roles (Admin / Shop Manager / Editor)',
          'Ensure SSL active and all plugins updated within 30 days',
          '📎 Attach Users + SSL screenshots',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'ATUM → Stock Central → filter by vendor → cross-check prices/images with vendor portals',
          'Update WooCommerce listings as needed',
          'Compare 5 random product prices and stock counts vs the Master POS Sheet',
          '📎 Attach sample product comparison screenshot',
        ],
      },
      {
        title: 'Documentation & Training Review',
        tasks: [
          'Ensure Sales & Refund SOPs reflect current WooCommerce setup',
          'Update any new product upload process',
          '📎 Attach updated SOP or link to latest workflow',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Check payment gateway + inventory sync (ATUM)',
          '📎 Attach integration panel screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  slack: {
    name: 'Slack',
    purpose: 'Ensure Slack remains secure, organized, and fully functional for internal communication and workflow automation.',
    accountableTeam: 'Operations Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Trigger one workflow (e.g., new-hire or announcement automation) → confirm success',
          'Check Slack search and pinned messages work as expected',
          '📎 Attach screenshot of workflow run or message confirmation',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Admin → Manage Members → review all active users',
          'Remove or suspend inactive, duplicate, or offboarded accounts',
          'Confirm workspace admins = authorized leads only',
          '📎 Attach Users screenshot',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Open Settings → Retention & Compliance → confirm message retention = 90 days (or policy standard)',
          'Ensure no public channels contain sensitive or client information',
          '📎 Attach retention settings screenshot',
        ],
      },
      {
        title: 'Documentation & Training Review',
        tasks: [
          'Review Slack Usage Policy SOP → confirm current settings (naming standards, workspace rules)',
          'Update SOP link or attach revised version if changes were made',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Go to Apps → Manage Apps → review active integrations',
          'Confirm key automations (Slack–ClickUp, Slack–Process Street) are connected and error-free',
          '📎 Attach integration panel screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  processstreet: {
    name: 'Process Street',
    purpose: 'Ensure all workflows in Process Street are current, accurate, and functioning correctly with proper user access and working automations.',
    accountableTeam: 'Operations Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Run a test checklist (e.g., any active workflow)',
          'Complete a few tasks to confirm automations and permissions work correctly',
          'Review task instructions for clarity and accuracy',
          '📎 Attach screenshot of test run summary',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Go to Settings → Members → verify all users are active staff',
          'Check roles (Admin / Editor / Viewer) are correct; remove unused or guest editors',
          '📎 Attach screenshot of members list',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Review 5 recent checklists → ensure naming follows format (Project + Date)',
          'Confirm workflows collect only necessary data (no personal or irrelevant fields)',
          '📎 Attach screenshot of a recent checklist',
        ],
      },
      {
        title: 'Documentation & Training Review',
        tasks: [
          'Open the "Workflow Documentation" SOP → confirm all active workflows are documented and match current structure',
          'Update SOP link or note if revisions needed',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Check Automations → Logs → confirm no errors',
          'Verify Slack and ClickUp integrations are connected and successful',
          'Delete or disable any unused automations',
          '📎 Attach screenshot of automation log or integrations page',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
  miro: {
    name: 'Miro',
    purpose: 'Ensure project boards remain accessible, secure, and limited to active team members.',
    accountableTeam: 'Operations Team',
    sections: [
      {
        title: 'Functional Validation',
        tasks: [
          'Open 2–3 active boards → confirm they load without errors',
          'Confirm recent edits sync correctly',
          'Verify comments and collaboration tools work',
          '📎 Attach board screenshot',
        ],
      },
      {
        title: 'Structural Validation',
        tasks: [
          'Team Settings → Members → export active list',
          'Remove inactive or external users not approved',
          'Confirm board access = team-only unless explicitly shared',
          '📎 Attach members list screenshot',
        ],
      },
      {
        title: 'Compliance & Data Accuracy',
        tasks: [
          'Archive outdated or completed boards',
          'Confirm sensitive boards are not publicly shared',
          'Verify naming conventions are followed',
          '📎 Attach archive or permissions screenshot',
        ],
      },
      {
        title: 'Automation & Integration Health',
        tasks: [
          'Review integrations (Slack, Google Drive)',
          'Confirm no broken embeds or permission errors',
          'Remove unused integrations',
          '📎 Attach integrations screenshot',
        ],
      },
    ],
    fields: [
      { name: 'Team Accountable', type: 'text', required: true },
      { name: 'Evidence Link', type: 'text', required: true },
      { name: 'Issues Found?', type: 'select', options: ['Yes', 'No'], required: true },
      { name: 'Severity', type: 'select', options: ['Critical', 'Moderate', 'Low', 'None'], required: true },
      { name: 'Findings Summary', type: 'textarea', required: false },
    ],
  },
};

function CompleteDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState(null);

  const masterSheetUrl = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit';

  const getStatusColor = (status) => {
    const colors = {
      complete: 'bg-green-100 text-green-800 border-green-300',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      overdue: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusIcon = (status) => {
    if (status === 'complete') return <CheckCircle2 className="w-4 h-4" />;
    if (status === 'overdue') return <AlertCircle className="w-4 h-4" />;
    if (status === 'in-progress') return <Clock className="w-4 h-4" />;
    return <Circle className="w-4 h-4" />;
  };

  const calculateStats = () => {
    const total = SYSTEMS.length;
    const complete = SYSTEMS.filter((s) => s.status === 'complete').length;
    const overdue = SYSTEMS.filter((s) => s.status === 'overdue').length;
    const inProgress = SYSTEMS.filter((s) => s.status === 'in-progress').length;

    return {
      total,
      complete,
      overdue,
      inProgress,
      pending: total - complete - overdue - inProgress,
      completionRate: Math.round((complete / total) * 100),
    };
  };

  const stats = calculateStats();
  const overdueAudits = SYSTEMS.filter((s) => s.status === 'overdue');
  const upcomingAudits = SYSTEMS.filter((s) => {
    const daysUntil = Math.ceil((new Date(s.nextAudit) - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7 && daysUntil > 0 && s.status !== 'complete';
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">System Audit</h1>
          <p className="text-xs text-gray-500 mt-1">Doctors Studio</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Overview"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            badge={stats.overdue > 0 ? stats.overdue : null}
          />
          <NavItem
            icon={<ClipboardList className="w-5 h-5" />}
            label="All Systems"
            active={activeTab === 'systems'}
            onClick={() => setActiveTab('systems')}
          />
          <NavItem
            icon={<Bell className="w-5 h-5" />}
            label="Reminders"
            active={activeTab === 'reminders'}
            onClick={() => setActiveTab('reminders')}
            badge={overdueAudits.length + upcomingAudits.length}
          />
          <NavItem
            icon={<Calendar className="w-5 h-5" />}
            label="Schedule"
            active={activeTab === 'schedule'}
            onClick={() => setActiveTab('schedule')}
          />
          <NavItem
            icon={<TrendingUp className="w-5 h-5" />}
            label="Analytics"
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
          />
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Active Audit"
            active={activeTab === 'checklist'}
            onClick={() => setActiveTab('checklist')}
          />
        </nav>

        <div className="p-4 border-t">
          <a
            href={masterSheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Master Sheet</span>
          </a>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="Q1">Q1 2026</option>
                <option value="Q2">Q2 2026</option>
                <option value="Q3">Q3 2026</option>
                <option value="Q4">Q4 2026</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">{stats.completionRate}% Complete</div>
              <div className="text-xs text-gray-500">
                {stats.complete} of {stats.total} systems
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <OverviewTab
              stats={stats}
              systems={SYSTEMS}
              onStartAudit={(system) => {
                setSelectedSystem(system);
                setActiveTab('checklist');
              }}
            />
          )}
          {activeTab === 'systems' && (
            <SystemsTab systems={SYSTEMS} onSelectSystem={setSelectedSystem} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'reminders' && (
            <RemindersTab
              overdueAudits={overdueAudits}
              upcomingAudits={upcomingAudits}
              onStartAudit={(system) => {
                setSelectedSystem(system);
                setActiveTab('checklist');
              }}
            />
          )}
          {activeTab === 'schedule' && <ScheduleTab systems={SYSTEMS} />}
          {activeTab === 'analytics' && <AnalyticsTab stats={stats} systems={SYSTEMS} />}
          {activeTab === 'checklist' && <ChecklistTab selectedSystem={selectedSystem} />}
        </div>
      </main>
    </div>
  );

  function getStatusBadge(status) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        {status.replace('-', ' ')}
      </span>
    );
  }

  function SystemCard({ system, onStartAudit }) {
    return (
      <div className="bg-white rounded-lg border p-4 hover:shadow-md transition">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{system.name}</h3>
            <p className="text-xs text-gray-500">{system.category}</p>
          </div>
          {getStatusBadge(system.status)}
        </div>
        <div className="text-xs text-gray-500 mb-3">Next audit: {system.nextAudit}</div>
        <button
          onClick={() => onStartAudit(system)}
          className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          Start Audit
        </button>
      </div>
    );
  }

  function SystemRow({ system, onStartAudit }) {
    return (
      <tr className="text-sm">
        <td className="px-6 py-4 font-medium text-gray-900">{system.name}</td>
        <td className="px-6 py-4 text-gray-600">{system.category}</td>
        <td className="px-6 py-4 text-gray-600">{system.lastAudit}</td>
        <td className="px-6 py-4 text-gray-600">{system.nextAudit}</td>
        <td className="px-6 py-4">{getStatusBadge(system.status)}</td>
        <td className="px-6 py-4">
          <button
            onClick={() => onStartAudit(system)}
            className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
          >
            Start Audit
          </button>
        </td>
      </tr>
    );
  }

  function ReminderCard({ system, type, onStartAudit }) {
    const color = type === 'overdue' ? 'red' : 'yellow';
    return (
      <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4 flex items-center justify-between`}>
        <div>
          <div className={`text-${color}-900 font-semibold`}>{system.name}</div>
          <div className={`text-${color}-700 text-sm`}>Due {system.nextAudit}</div>
        </div>
        <button
          onClick={() => onStartAudit(system)}
          className={`px-3 py-2 bg-${color}-600 text-white text-xs rounded-lg hover:bg-${color}-700`}
        >
          Start Audit
        </button>
      </div>
    );
  }

  function StatCard({ title, value, color, icon }) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>{icon}</div>
        </div>
      </div>
    );
  }

  function NavItem({ icon, label, active, onClick, badge }) {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition ${
          active ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm">{label}</span>
        </div>
        {badge && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{badge}</span>}
      </button>
    );
  }

  function OverviewTab({ stats, systems, onStartAudit }) {
    return (
      <div className="space-y-6">
        {stats.overdue > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">Action Required</h3>
              <p className="text-sm text-red-700">
                {stats.overdue} system{stats.overdue > 1 ? 's are' : ' is'} overdue for audit
              </p>
            </div>
            <button
              onClick={() => {
                const overdueSystem = systems.find((s) => s.status === 'overdue');
                if (overdueSystem) onStartAudit(overdueSystem);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
            >
              View Now
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Systems" value={stats.total} color="blue" icon={<LayoutDashboard />} />
          <StatCard title="Completed" value={stats.complete} color="green" icon={<CheckCircle2 />} />
          <StatCard title="In Progress" value={stats.inProgress} color="yellow" icon={<Clock />} />
          <StatCard title="Overdue" value={stats.overdue} color="red" icon={<AlertCircle />} />
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Systems by Category</h2>
          <div className="space-y-4">
            {['High-Impact', 'Core Operational', 'Internal Support'].map((category) => {
              const categorySystems = systems.filter((s) => s.category === category);
              const completed = categorySystems.filter((s) => s.status === 'complete').length;
              const percentage = Math.round((completed / categorySystems.length) * 100);

              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm text-gray-500">
                      {completed}/{categorySystems.length}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((system) => (
            <SystemCard key={system.id} system={system} onStartAudit={onStartAudit} />
          ))}
        </div>
      </div>
    );
  }

  function SystemsTab({ systems, onSelectSystem, setActiveTab }) {
    const [filter, setFilter] = useState('all');

    const filteredSystems = filter === 'all' ? systems : systems.filter((s) => s.status === filter);

    const handleStartAudit = (system) => {
      onSelectSystem(system);
      setActiveTab('checklist');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            {['all', 'complete', 'in-progress', 'pending', 'overdue'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  filter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">System</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Audit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Audit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSystems.map((system) => (
                <SystemRow key={system.id} system={system} onStartAudit={handleStartAudit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function RemindersTab({ overdueAudits, upcomingAudits, onStartAudit }) {
    return (
      <div className="space-y-6">
        {overdueAudits.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Overdue Audits ({overdueAudits.length})
            </h2>
            <div className="space-y-3">
              {overdueAudits.map((system) => (
                <ReminderCard key={system.id} system={system} type="overdue" onStartAudit={onStartAudit} />
              ))}
            </div>
          </div>
        )}

        {upcomingAudits.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Due This Week ({upcomingAudits.length})
            </h2>
            <div className="space-y-3">
              {upcomingAudits.map((system) => (
                <ReminderCard key={system.id} system={system} type="upcoming" onStartAudit={onStartAudit} />
              ))}
            </div>
          </div>
        )}

        {overdueAudits.length === 0 && upcomingAudits.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No overdue or upcoming audits at this time.</p>
          </div>
        )}
      </div>
    );
  }

  function ScheduleTab({ systems }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">2026 Audit Schedule</h2>
        <div className="space-y-4">
          {systems.map((system) => {
            const nextDate = new Date(system.nextAudit);
            const monthIndex = nextDate.getMonth();

            return (
              <div key={system.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-32">
                  <span className="font-medium text-gray-900">{system.name}</span>
                </div>
                <div className="flex-1 flex gap-2">
                  {months.map((month, idx) => (
                    <div
                      key={month}
                      className={`flex-1 h-8 rounded ${idx === monthIndex ? 'bg-blue-600' : 'bg-gray-200'}`}
                      title={idx === monthIndex ? system.nextAudit : ''}
                    />
                  ))}
                </div>
                <div className="w-24 text-sm text-gray-600">
                  {months[monthIndex]} {nextDate.getDate()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function AnalyticsTab() {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Completion Trends</h2>
          <div className="h-64 flex items-end justify-around gap-4">
            {['Jan', 'Feb', 'Mar', 'Apr'].map((month) => {
              const height = Math.random() * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-600 rounded-t" style={{ height: `${height}%` }} />
                  <span className="text-sm text-gray-600 mt-2">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Average Audit Time</h3>
            <div className="text-3xl font-bold text-blue-600">2.5 days</div>
            <p className="text-sm text-gray-600 mt-2">Per system audit</p>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">On-Time Completion Rate</h3>
            <div className="text-3xl font-bold text-green-600">89%</div>
            <p className="text-sm text-gray-600 mt-2">This quarter</p>
          </div>
        </div>
      </div>
    );
  }

  function ChecklistTab({ selectedSystem }) {
    const [progress, setProgress] = useState({});
    const [formData, setFormData] = useState({});
    const [expandedSections, setExpandedSections] = useState({});

    if (!selectedSystem) {
      return (
        <div className="text-center py-12">
          <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Audit</h3>
          <p className="text-gray-600">Select a system from the Systems tab to begin an audit.</p>
        </div>
      );
    }

    const template = AUDIT_TEMPLATES[selectedSystem.templateKey];

    if (!template) {
      return (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Template Not Found</h3>
          <p className="text-gray-600">No audit template available for {selectedSystem.name}</p>
        </div>
      );
    }

    const toggleSubtask = (sectionIdx, taskIdx) => {
      const key = `${sectionIdx}-${taskIdx}`;
      setProgress((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    const toggleSection = (idx) => {
      setExpandedSections((prev) => ({
        ...prev,
        [idx]: !prev[idx],
      }));
    };

    const updateFormField = (fieldName, value) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    };

    const getTotalTasks = () => template.sections.reduce((total, section) => total + section.tasks.length, 0);

    const getCompletedTasks = () => Object.values(progress).filter(Boolean).length;

    const percentage = Math.round((getCompletedTasks() / getTotalTasks()) * 100) || 0;

    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{template.name} Audit</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <p className="text-sm text-blue-900">
                  <strong>Purpose:</strong> {template.purpose}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Accountable Team:</span>
                  <span className="font-medium text-gray-900">{template.accountableTeam}</span>
                </div>
              </div>
            </div>
            <div className="text-right ml-6">
              <div className="text-4xl font-bold text-blue-600">{percentage}%</div>
              <div className="text-sm text-gray-500 mt-1">
                {getCompletedTasks()}/{getTotalTasks()} tasks
              </div>
            </div>
          </div>

          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        {template.sections.map((section, sectionIdx) => {
          const sectionCompleted = section.tasks.filter((_, taskIdx) => progress[`${sectionIdx}-${taskIdx}`]).length;
          const sectionPercentage = Math.round((sectionCompleted / section.tasks.length) * 100);
          const isExpanded = expandedSections[sectionIdx] !== false;

          return (
            <div key={sectionIdx} className="bg-white rounded-lg border overflow-hidden">
              <button
                onClick={() => toggleSection(sectionIdx)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {sectionCompleted}/{section.tasks.length}
                  </span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${sectionPercentage}%` }}
                    />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 space-y-2">
                  {section.tasks.map((task, taskIdx) => {
                    const key = `${sectionIdx}-${taskIdx}`;
                    const isChecked = progress[key];
                    const isAttachment = task.includes('📎 Attach');

                    if (isAttachment) {
                      return (
                        <div key={taskIdx} className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                          <div className="flex items-start gap-3 mb-3">
                            <Paperclip className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="flex-1 text-gray-700 font-medium">{task}</span>
                          </div>
                          <div className="ml-8">
                            <input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  toggleSubtask(sectionIdx, taskIdx);
                                }
                              }}
                              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                              accept="image/*,.pdf"
                            />
                            {isChecked && (
                              <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>File uploaded</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <label
                        key={taskIdx}
                        className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition border-2 ${
                          isChecked ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked || false}
                          onChange={() => toggleSubtask(sectionIdx, taskIdx)}
                          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                        />
                        <span className={`flex-1 ${isChecked ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {task}
                        </span>
                        {isChecked && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Audit Documentation</h3>
          <div className="space-y-4">
            {template.fields.map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.name}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    value={formData[field.name] || ''}
                    onChange={(e) => updateFormField(field.name, e.target.value)}
                    placeholder={`Enter ${field.name.toLowerCase()}...`}
                    required={field.required}
                  />
                ) : field.type === 'select' ? (
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData[field.name] || ''}
                    onChange={(e) => updateFormField(field.name, e.target.value)}
                    required={field.required}
                  >
                    <option value="">Select {field.name}</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData[field.name] || ''}
                    onChange={(e) => updateFormField(field.name, e.target.value)}
                    placeholder={`Enter ${field.name.toLowerCase()}...`}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

createRoot(document.getElementById('root')).render(<CompleteDashboard />);
