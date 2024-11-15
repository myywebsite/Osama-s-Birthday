document.addEventListener("DOMContentLoaded", () => {
  // وظيفة إظهار الرسالة عند النقر أو اللمس على الظرف
  const envelopeIcon = document.getElementById("envelope-icon");
  const hiddenMessage = document.getElementById("hidden-message");

  const showHiddenMessage = (e) => {
    e.preventDefault(); // منع السلوك الافتراضي
    hiddenMessage.style.display = "block"; // عرض الرسالة
    envelopeIcon.style.display = "none"; // إخفاء الظرف
  };

  envelopeIcon.addEventListener("click", showHiddenMessage);
  envelopeIcon.addEventListener("touchstart", showHiddenMessage);

  // وظيفة لعبة كرة القدم
  let score = 0; // تتبع الأهداف المسجلة
  const ball = document.getElementById("ball");
  const goalArea = document.getElementById("goal");
  const scoreMessage = document.getElementById("score-message");
  const scoreCount = document.getElementById("score-count");
  const winMessage = document.getElementById("win-message");

  // دعم السحب والإفلات للكرة (Mouse + Touch Support)
  let isDragging = false;
  let offsetX, offsetY;

  const startDrag = (e) => {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    offsetX = clientX - ball.offsetLeft;
    offsetY = clientY - ball.offsetTop;
    if (e.touches) e.preventDefault(); // منع التكرار على الهواتف
  };

  const moveBall = (e) => {
    if (isDragging) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      ball.style.left = clientX - offsetX + "px";
      ball.style.top = clientY - offsetY + "px";
    }
  };

  const stopDrag = (e) => {
    if (e.touches) e.preventDefault(); // منع التكرار على الهواتف
    isDragging = false;

    // التحقق إذا كانت الكرة داخل منطقة الهدف
    const ballRect = ball.getBoundingClientRect();
    const goalRect = goalArea.getBoundingClientRect();

    if (
      ballRect.left < goalRect.right &&
      ballRect.right > goalRect.left &&
      ballRect.top < goalRect.bottom &&
      ballRect.bottom > goalRect.top
    ) {
      score++;
      scoreMessage.style.display = "block";
      setTimeout(() => {
        scoreMessage.style.display = "none";
      }, 1000);
      scoreCount.textContent = `Goals Scored: ${score}`;
      if (score === 5) {
        winMessage.style.display = "block";
      }
    }
  };

  // إضافة المستمعات للأحداث (الفأرة + اللمس)
  ball.addEventListener("mousedown", startDrag);
  ball.addEventListener("touchstart", startDrag);

  document.addEventListener("mousemove", moveBall);
  document.addEventListener("touchmove", moveBall);

  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
});
