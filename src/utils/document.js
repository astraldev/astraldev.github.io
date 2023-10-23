export const getPercentVisible = (el) => {
  const watchEl = document.querySelector(el);
  const viewportHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const elementOffsetTop = watchEl.offsetTop;
  const elementHeight = watchEl.offsetHeight;

  const distance = scrollTop + viewportHeight - elementOffsetTop;
  const percentage = Math.round(
    100 - distance / ((viewportHeight + elementHeight) / 100),
  );

  return percentage;
};

export const getScrollPercent = () => {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
};

export const onSizeChange = (handler) => {
  if (!handler) return;
  document.addEventListener("scroll", handler);
  window.addEventListener("resize", handler);
};

export const convertRemToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const compensateScrollDifference = (previousDocumentHeight) => {
  var currentDocumentHeight = document.documentElement.clientHeight,
    documentHeightDelta = previousDocumentHeight - currentDocumentHeight,
    currentScrollPosition = document.documentElement.scrollTop,
    newScrollPosition = currentScrollPosition - documentHeightDelta;

  return newScrollPosition;
};
