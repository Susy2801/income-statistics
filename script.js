// ======== Tính số ngày đi làm ========
function workDaysCount() {
  var startTime = document.getElementById("start-day").value;
  var endTime = document.getElementById("end-day").value;
  const ngayBatDau = new Date(startTime);
  const ngayKetThuc = new Date(endTime);
  var milied = ngayKetThuc - ngayBatDau;
  var workDays = Math.round(milied / (1000 * 60 * 60 * 24));
  return workDays;
}

// ========= Format lại số ============
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

  // ======! XỬ LÍ TIỀN TIẾT KIỆM !===========
  var select = document.getElementById("options");
  var options = parseInt(select.value);
  var targetBox = document.querySelector(".target-saved");
  switch (options) {
    case 99:
      var target = document.getElementById("target");
      var saved = document.querySelector(".monthly-saved");
      var allSaved = document.querySelector(".saved");
      var targetSaved = target.value;
      // In ra số tiền cần tiết kiệm mỗi tháng
      var targetBox = document.querySelector(".target-saved");
      var targetResult = Math.round(targetSaved / month);
      var targetResultFormat = new Intl.NumberFormat("vi-VN").format(
        targetResult
      );
      targetBox.innerText = `${targetResultFormat} vnđ`;

      //In ra số dư còn lại
      // Số dư còn lại = Thu nhập - Số tiền tích kiệm mỗi tháng
      var revenue = document.querySelector(".monthly-revenue");
      var revenueResult = Math.round(income.value - targetResult);
      var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
        revenueResult
      );
      revenue.innerText = `${revenueResultFormat} vnđ`;
      targetBox.parentElement.classList.remove("hidden");
      saved.parentElement.classList.add("hidden");
      allSaved.parentElement.classList.add("hidden");
      break;

    case 1:
      var target = 10 / 100;
      //In ra số tiền tích kiệm được mỗi tháng
      var saved = document.querySelector(".monthly-saved");
      var savedResult = Math.round((income.value - payLoanResult) * target);

      var savedResultFormat = new Intl.NumberFormat("vi-VN").format(
        savedResult
      );
      saved.innerText = `${savedResultFormat} vnđ`;

      // In ra tổng số tiền tích kiệm được
      var allSaved = document.querySelector(".saved");
      var allSavedResult = savedResult * month;
      var allSavedResultFormat = new Intl.NumberFormat("vi-VN").format(
        allSavedResult
      );
      allSaved.innerText = `${allSavedResultFormat} vnđ`;
      //In ra số dư còn lại
      var revenue = document.querySelector(".monthly-revenue");
      var revenueResult = Math.round(income.value - savedResult);
      var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
        revenueResult
      );
      revenue.innerText = `${revenueResultFormat} vnđ`;
      saved.parentElement.classList.remove("hidden");
      allSaved.parentElement.classList.remove("hidden");
      targetBox.parentElement.classList.add("hidden");
      break;
    case 2:
      var target = 20 / 100;
      //In ra số tiền tích kiệm được mỗi tháng
      var saved = document.querySelector(".monthly-saved");
      var savedResult = Math.round((income.value - payLoanResult) * target);

      var savedResultFormat = new Intl.NumberFormat("vi-VN").format(
        savedResult
      );
      saved.innerText = `${savedResultFormat} vnđ`;

      // In ra tổng số tiền tích kiệm được
      var allSaved = document.querySelector(".saved");
      var allSavedResult = savedResult * month;
      var allSavedResultFormat = new Intl.NumberFormat("vi-VN").format(
        allSavedResult
      );
      allSaved.innerText = `${allSavedResultFormat} vnđ`;
      //In ra số dư còn lại
      var revenue = document.querySelector(".monthly-revenue");
      var revenueResult = Math.round(income.value - savedResult);
      var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
        revenueResult
      );
      revenue.innerText = `${revenueResultFormat} vnđ`;
      saved.parentElement.classList.remove("hidden");
      allSaved.parentElement.classList.remove("hidden");
      targetBox.parentElement.classList.add("hidden");
      break;
    case 3:
      var target = 30 / 100;
      //In ra số tiền tích kiệm được mỗi tháng
      var saved = document.querySelector(".monthly-saved");
      var savedResult = Math.round((income.value - payLoanResult) * target);

      var savedResultFormat = new Intl.NumberFormat("vi-VN").format(
        savedResult
      );
      saved.innerText = `${savedResultFormat} vnđ`;

      // In ra tổng số tiền tích kiệm được
      var allSaved = document.querySelector(".saved");
      var allSavedResult = savedResult * month;
      var allSavedResultFormat = new Intl.NumberFormat("vi-VN").format(
        allSavedResult
      );
      allSaved.innerText = `${allSavedResultFormat} vnđ`;
      //In ra số dư còn lại
      var revenue = document.querySelector(".monthly-revenue");
      var revenueResult = Math.round(income.value - savedResult);
      var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
        revenueResult
      );
      revenue.innerText = `${revenueResultFormat} vnđ`;
      saved.parentElement.classList.remove("hidden");
      allSaved.parentElement.classList.remove("hidden");
      targetBox.parentElement.classList.add("hidden");
      break;
    case 4:
      var target = 40 / 100;
      //In ra số tiền tích kiệm được mỗi tháng
      var saved = document.querySelector(".monthly-saved");
      var savedResult = Math.round((income.value - payLoanResult) * target);

      var savedResultFormat = new Intl.NumberFormat("vi-VN").format(
        savedResult
      );
      saved.innerText = `${savedResultFormat} vnđ`;

      // In ra tổng số tiền tích kiệm được
      var allSaved = document.querySelector(".saved");
      var allSavedResult = savedResult * month;
      var allSavedResultFormat = new Intl.NumberFormat("vi-VN").format(
        allSavedResult
      );
      allSaved.innerText = `${allSavedResultFormat} vnđ`;
      //In ra số dư còn lại
      var revenue = document.querySelector(".monthly-revenue");
      var revenueResult = Math.round(income.value - savedResult);
      var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
        revenueResult
      );
      revenue.innerText = `${revenueResultFormat} vnđ`;
      saved.parentElement.classList.remove("hidden");
      allSaved.parentElement.classList.remove("hidden");
      targetBox.parentElement.classList.add("hidden");
      break;
    case 5:
      var target = 50 / 100;
      //In ra số tiền tích kiệm được mỗi tháng
      var saved = document.querySelector(".monthly-saved");
      var savedResult = Math.round((income.value - payLoanResult) * target);

      var savedResultFormat = new Intl.NumberFormat("vi-VN").format(
        savedResult
      );
      saved.innerText = `${savedResultFormat} vnđ`;

      // In ra tổng số tiền tích kiệm được
      var allSaved = document.querySelector(".saved");
      var allSavedResult = savedResult * month;
      var allSavedResultFormat = new Intl.NumberFormat("vi-VN").format(
        allSavedResult
      );
      allSaved.innerText = `${allSavedResultFormat} vnđ`;
      //In ra số dư còn lại
      var revenue = document.querySelector(".monthly-revenue");
      var revenueResult = Math.round(income.value - savedResult);
      var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
        revenueResult
      );
      revenue.innerText = `${revenueResultFormat} vnđ`;
      saved.parentElement.classList.remove("hidden");
      allSaved.parentElement.classList.remove("hidden");
      targetBox.parentElement.classList.add("hidden");
      break;
    case 6:
      var target = 60 / 100;
      //In ra số tiền tích kiệm được mỗi tháng
      var saved = document.querySelector(".monthly-saved");
      var savedResult = Math.round((income.value - payLoanResult) * target);

      var savedResultFormat = new Intl.NumberFormat("vi-VN").format(
        savedResult
      );
      saved.innerText = `${savedResultFormat} vnđ`;

      // In ra tổng số tiền tích kiệm được
      var allSaved = document.querySelector(".saved");
      var allSavedResult = savedResult * month;
      var allSavedResultFormat = new Intl.NumberFormat("vi-VN").format(
        allSavedResult
      );
      allSaved.innerText = `${allSavedResultFormat} vnđ`;
      //In ra số dư còn lại
      var revenue = document.querySelector(".monthly-revenue");
      var revenueResult = Math.round(income.value - savedResult);
      var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
        revenueResult
      );
      revenue.innerText = `${revenueResultFormat} vnđ`;
      saved.parentElement.classList.remove("hidden");
      allSaved.parentElement.classList.remove("hidden");
      targetBox.parentElement.classList.add("hidden");
      break;
    case 7:
      var target = 70 / 100;
      //In ra số tiền tích kiệm được mỗi tháng
      var saved = document.querySelector(".monthly-saved");
      var savedResult = Math.round((income.value - payLoanResult) * target);

      var savedResultFormat = new Intl.NumberFormat("vi-VN").format(
        savedResult
      );
      saved.innerText = `${savedResultFormat} vnđ`;

      // In ra tổng số tiền tích kiệm được
      var allSaved = document.querySelector(".saved");
      var allSavedResult = savedResult * month;
      var allSavedResultFormat = new Intl.NumberFormat("vi-VN").format(
        allSavedResult
      );
      allSaved.innerText = `${allSavedResultFormat} vnđ`;
      //In ra số dư còn lại
      var revenue = document.querySelector(".monthly-revenue");
      var revenueResult = Math.round(income.value - savedResult);
      var revenueResultFormat = new Intl.NumberFormat("vi-VN").format(
        revenueResult
      );
      revenue.innerText = `${revenueResultFormat} vnđ`;
      saved.parentElement.classList.remove("hidden");
      allSaved.parentElement.classList.remove("hidden");
      targetBox.parentElement.classList.add("hidden");
      break;
    default:
      console.log("Chịu");
      break;
  }
};

// XỬ LÍ CÁC OPTIONS
var select = document.getElementById("options");
select.value = "1";
select.onchange = () => {
  var target = document.getElementById("target");
  var option = parseInt(select.value);
  if (option === 99) {
    target.type = "text";
  } else {
    target.type = "hidden";
  }
};
