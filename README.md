# 日序 Dayform｜個人行程與任務管理原型

原生 HTML、CSS、JavaScript 的手機優先可互動原型，無須安裝依賴。

## 開始使用
以瀏覽器開啟 `index.html`；資料存在該瀏覽器的 localStorage。首次開啟會載入可操作的範例行程及任務。

## 功能
- 今日行程時間軸、逐日瀏覽及週行事曆。
- 新增行程（日期、時間、長度）或待辦任務（名稱與截止日期必填；提前提醒天數選填）。
- 完成/重開、依期限篩選與排序、刪除任務。
- 模擬每天 9:20 彙整當日所有行程，及依每項任務提前天數標示提醒狀態。

## 原型範圍
提醒是畫面狀態模擬，不會在頁面關閉或手機鎖定時傳送作業系統通知。正式版需實作網頁推播/原生通知與通知權限，也需依需求加入資料同步或備份。

## UI polish
The current version uses the warm green, soft-card visual language from the first concept, with an expanded month calendar and restored left navigation.
