// function formatInput(input) {
//   // Xóa tất cả các ký tự không phải là số
//   const cleanedValue = input.replace(/[^0-9]/g, "");

//   // Chuyển đổi giá trị thành số
//   const soTien = parseInt(cleanedValue, 10);

//   const formattedValue = new Intl.NumberFormat("vi-VN").format(soTien);
//   // Hiển thị giá trị đã định dạng
//   return formattedValue;
// }

// Tính số ngày đi làm
function workDaysCount() {
  var startTime = document.getElementById("start-day").value;
  var endTime = document.getElementById("end-day").value;
  const ngayBatDau = new Date(startTime);
  const ngayKetThuc = new Date(endTime);
  var milied = ngayKetThuc - ngayBatDau;
  var workDays = Math.round(milied / (1000 * 60 * 60 * 24));
  return workDays;
}

// Format lại số
var input = document.querySelectorAll(".format");

input.forEach((box) => {
  box.addEventListener("input", function () {
    // Lấy giá trị nhập vào
    let inputValue = this.value;

    // Xóa tất cả các ký tự không phải số
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Chuyển đổi giá trị thành số
    const soTien = parseInt(inputValue, 10);

    // Kiểm tra xem giá trị có phải là số hay không
    if (!isNaN(soTien)) {
      // Định dạng giá trị số theo định dạng nghìn
      const formattedValue = new Intl.NumberFormat("vi-VN").format(soTien);

      // Hiển thị giá trị đã định dạng
      this.value = formattedValue;
    } else {
      // Nếu không phải là số, đặt giá trị về rỗng
      this.value = "";
    }
  });
});
input.forEach((box) => {
  box.onblur = (e) => {
    var incomeValue = e.target.value;
    // Xóa tất cả các ký tự không phải là số
    const cleanedValue = incomeValue.replace(/[^0-9]/g, "");

    // Chuyển đổi giá trị thành số
    const soTien = parseInt(cleanedValue, 10);

    // Hiển thị giá trị đã định dạng
    box.value = soTien;
  };
});

// =============== RENDER ================
var submitBtn = document.getElementById("submit");

// Render ra màn hình
submitBtn.onclick = () => {
  // Xử lí số ngày đi muộn
  var late = document.getElementById("late").value;
  var lateDays = parseInt(late);
  var lateFee = 50000;
  var lateResult = lateDays * lateFee;

  // In ra số thu nhập ước tính
  var estIncome = document.querySelector(".est-income");
  var income = document.getElementById("income");
  var oneDayIncome = Math.round(income.value / 30);
  var estIncomeResult = Math.round(oneDayIncome * workDaysCount() - lateResult);
  var estIncomeResultFormat = new Intl.NumberFormat("vi-VN").format(
    estIncomeResult
  );
  estIncome.innerText = `${estIncomeResultFormat} vnđ`;

  // In ra số tiền nợ trả mỗi tháng
  var payLoan = document.querySelector(".monthly-loan-pay");
  var loanValue = document.getElementById("loan").value;
  var month = Math.round(workDaysCount() / 30);
  var payLoanResult = Math.round(loanValue / month);

  payLoan.innerText = `${new Intl.NumberFormat("vi-VN").format(
    payLoanResult
  )} vnđ`;

  //In ra số tiền tích kiệm được mỗi tháng
  var saved = document.querySelector(".monthly-saved");
  var savedResult = Math.round(
    (estIncomeResult / month - payLoanResult) * (70 / 100)
  );

  var savedResultFormat = new Intl.NumberFormat("vi-VN").format(savedResult);
  saved.innerText = `${savedResultFormat} vnđ`;

  // In ra tổng số tiền tích kiệm được
  var allSaved = document.querySelector(".saved");
  var allSavedResult = savedResult * month;
  var allSavedResultFormat = new Intl.NumberFormat("vi-VN").format(
    allSavedResult
  );
  allSaved.innerText = `${allSavedResultFormat} vnđ`;

  //In ra số dư còn lại
  // Số dư còn lại = Thu nhập - Số tiền tích kiệm mỗi tháng
  var revenue = document.querySelector(".monthly-revenue");
  var revenueResult = Math.round(estIncomeResult / month - savedResult);
  var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
    revenueResult
  );
  revenue.innerText = `${revenueResultFormat} vnđ`;
};
