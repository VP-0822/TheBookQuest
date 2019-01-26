function toggleElementVisibility(hideId, viewId) {
    var x = document.getElementById(hideId);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

    var y = document.getElementById(viewId);
    if (y.style.display === "" || y.style.display === "none") {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
  }