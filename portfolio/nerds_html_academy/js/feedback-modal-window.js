function openFeedbackModal() {
  var feedbackModal = document.getElementById("feedback-modal")
  var windowClosed = feedbackModal.classList.contains("close-window")

  if (windowClosed == true) {
    feedbackModal.classList.remove("close-window");
    feedbackModal.classList.add("open-window");
  }
  feedbackModal.classList.add("open-window");
}

function closeFeedbackModal() {
  var feedbackModal = document.getElementById("feedback-modal")

  feedbackModal.classList.remove("open-window")
  feedbackModal.classList.add("close-window")
}
