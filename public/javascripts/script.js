document.addEventListener("DOMContentLoaded", () => {
  if (window.success_msg && window.success_msg.length > 0) {
    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: window.success_msg
    });
  }

  if (window.error_msg && window.error_msg.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: window.error_msg
    });
  }
});



  window.addEventListener("load", () => {
    const cpPopup = document.getElementById("cpCallPopup");

    // Show popup after 1.5 seconds
    setTimeout(() => {
      cpPopup.classList.add("cp-show");
    }, 1500);

    // Auto hide after 12 seconds (optional)
    setTimeout(() => {
      cpPopup.classList.remove("cp-show");
    }, 10000);

    // Close button click
    closeBtn.addEventListener("click", () => {
      cpPopup.classList.remove("cp-show");
    });
  });
