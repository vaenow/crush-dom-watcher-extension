// content.js

// post /alert endpoint
const ALERT_URL = 'https://crush.hk.xexlab.com/alert'

const isChrome = !!window.chrome
const isFirefox = typeof InstallTrigger !== 'undefined'
const browser = isChrome ? 'chrome' : isFirefox ? 'firefox' : 'other'

// 创建一个MutationObserver实例来监听DOM的变化
const observer = new MutationObserver((mutations) => {
  const changeDetailsList = []

  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      const date = new Date()
      const target = mutation.target.outerHTML?.match(/<.*?>/)?.pop() || '' // match the first l-tag
      const changeDetails = {
        browser,
        url: window.location.href,
        mutationType: mutation.type,
        target: target.substring(0, 500), // ensure l-tag target not too large
        ts: date.getTime(),
        timestamp: date.toISOString(), // readable ts
      };
      changeDetailsList.push(changeDetails) // push changeDetails
    }
  });

  // send data to server
  if (changeDetailsList.length) {
    Crush.debounceSend(ALERT_URL, changeDetailsList)
  }

});

// 配置MutationObserver来监听DOM的子节点和属性的变化
observer.observe(document.body, {
  childList: true,
  attributes: true,
  subtree: true,
});

