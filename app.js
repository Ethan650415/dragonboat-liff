(() => {
  "use strict";

  const DEFAULT_CONFIG = {
    liffId: "",
    companyName: "您的公司名稱",
    title: "端午節服務公告",
    period: "端午連假期間",
    message: "客服回覆時間可能較平日延長，您仍可正常留言，我們將於恢復服務後依序回覆。",
    resumeText: "感謝您的理解與支持，祝您端午安康。",
    confirmButtonText: "我知道了",
    contactButtonText: "聯絡客服",
    contactUrl: "",
    showOncePerDevice: false,
    noticeVersion: "dragonboat-2026"
  };

  const config = {
    ...DEFAULT_CONFIG,
    ...(window.LIFF_NOTICE_CONFIG || {})
  };

  const elements = {};

  function cacheElements() {
    elements.modal = document.getElementById("noticeModal");
    elements.closedState = document.getElementById("closedState");
    elements.companyName = document.getElementById("companyName");
    elements.title = document.getElementById("noticeTitle");
    elements.period = document.getElementById("noticePeriod");
    elements.message = document.getElementById("noticeMessage");
    elements.resume = document.getElementById("noticeResume");
    elements.statusBox = document.getElementById("statusBox");
    elements.confirmButton = document.getElementById("confirmButton");
    elements.contactButton = document.getElementById("contactButton");
  }

  function applyContent() {
    document.title = config.title;
    elements.companyName.textContent = config.companyName;
    elements.title.textContent = config.title;
    elements.period.textContent = config.period;
    elements.message.textContent = config.message;
    elements.resume.textContent = config.resumeText;
    elements.confirmButton.textContent = config.confirmButtonText;
    elements.contactButton.textContent = config.contactButtonText;

    const hasContactUrl = /^https:\/\//i.test(config.contactUrl);
    elements.contactButton.hidden = !hasContactUrl;
  }

  function storageKey() {
    return `liff-notice-dismissed:${config.noticeVersion}`;
  }

  function wasDismissed() {
    if (!config.showOncePerDevice) return false;

    try {
      return localStorage.getItem(storageKey()) === "yes";
    } catch (error) {
      return false;
    }
  }

  function rememberDismissal() {
    if (!config.showOncePerDevice) return;

    try {
      localStorage.setItem(storageKey(), "yes");
    } catch (error) {
      // 部分瀏覽器可能限制 localStorage，不影響公告關閉。
    }
  }

  function showClosedState() {
    elements.modal.hidden = true;
    elements.closedState.hidden = false;
  }

  function showStatus(message) {
    elements.statusBox.textContent = message;
    elements.statusBox.hidden = false;
  }

  async function initializeLiff() {
    const hasRealLiffId =
      config.liffId &&
      !config.liffId.includes("YOUR_") &&
      /^[0-9]+-[A-Za-z0-9]+$/.test(config.liffId);

    if (!hasRealLiffId) {
      showStatus("目前為預覽模式。部署前請在 config.js 填入正式 LIFF ID。");
      return;
    }

    if (!window.liff) {
      showStatus("LIFF SDK 載入失敗，請檢查網路連線後重新開啟。");
      return;
    }

    try {
      await window.liff.init({ liffId: config.liffId });
    } catch (error) {
      console.error("LIFF initialization failed:", error);
      showStatus("LIFF 初始化失敗，請確認 LIFF ID 與 Endpoint URL 設定是否正確。");
    }
  }

  function closeNotice() {
    rememberDismissal();

    if (window.liff && window.liff.isInClient()) {
      window.liff.closeWindow();
      return;
    }

    showClosedState();
  }

  function openContact() {
    if (!/^https:\/\//i.test(config.contactUrl)) return;

    if (window.liff && window.liff.isInClient()) {
      window.liff.openWindow({
        url: config.contactUrl,
        external: false
      });
      return;
    }

    window.location.assign(config.contactUrl);
  }

  async function start() {
    cacheElements();
    applyContent();

    if (wasDismissed()) {
      showClosedState();
      return;
    }

    elements.confirmButton.addEventListener("click", closeNotice);
    elements.contactButton.addEventListener("click", openContact);

    await initializeLiff();
  }

  window.addEventListener("DOMContentLoaded", start);
})();
