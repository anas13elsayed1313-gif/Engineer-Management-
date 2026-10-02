// قراءة البيانات المحفوظة مسبقاً أو إنشاء مصفوفة جديدة فارغة
let attendanceLog = JSON.parse(localStorage.getItem('savedRecords')) || [];

// دالة الوقت بتنسيق 12 ساعة مظبوط
function getTime() {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds + ' ' + ampm;
}

// دالة تسجيل الحركة
function registerMovement(actionType) {
    let name = document.getElementById('engineerName').value;
    let dept = document.getElementById('department').value;

    if (name.trim() === "" || dept.trim() === "") {
        alert("يرجى كتابة الاسم والقسم أولاً!");
        return;
    }

    let record = {
        name: name,
        dept: dept,
        action: actionType,
        time: getTime()
    };

    // حفظ الحركة في المصفوفة وفي ذاكرة المتصفح
    attendanceLog.push(record);
    localStorage.setItem('savedRecords', JSON.stringify(attendanceLog));

    alert("تم تسجيل حركة " + actionType + " للمهندس: " + name);

    // مسح الحقول
    document.getElementById('engineerName').value = "";
    document.getElementById('department').value = "";

    // تحديث الجدول فوراً لو كان معروضاً
    renderTable();
}

// دالة فتح الجدول بالباسورد 252525
function unlockTable() {
    let pass = document.getElementById('adminPass').value;

    if (pass === "252525") {
        document.getElementById('tableSection').classList.remove('hidden');
        renderTable();
        alert("تم التحقق من كلمة المرور! الجدول معروض بالأسفل الآن.");
    } else {
        alert("كلمة المرور خطأ!");
    }
}

// دالة رسم وإظهار الجدول
function renderTable() {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ""; // تفريغ الجدول أولاً لمنع التكرار

    attendanceLog.forEach(function(item) {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.dept}</td>
                <td>${item.action}</td>
                <td>${item.time}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}