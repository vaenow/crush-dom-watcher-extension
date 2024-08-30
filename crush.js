// CRUSH.js

class Crush {

    // debounce send
    static debounceSend = debounce(this.send, 500);

    // 发送POST请求到本地服务器
    static send(url, data) {
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }).then(response => {
            console.log('Notification sent', response);
        }).catch(error => {
            console.error('Error sending notification:', error);
            // 添加 sentry, 实时统计错误日志
            // Sentry.captureException(error);
        });
    }

}

// 去抖动函数
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}


// Sentry.onLoad(function() {
//     Sentry.init({
//         // Tracing
//         tracesSampleRate: 1.0, // Capture 100% of the transactions
//         // Session Replay
//         replaysSessionSampleRate: 0.1,
//         replaysOnErrorSampleRate: 1.0,
//     });
// });
