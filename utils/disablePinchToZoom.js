export function disablePinchToZoom() {
  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
    return false;
  });
}
