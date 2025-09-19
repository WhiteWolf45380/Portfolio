const video = document.querySelector('.project_video');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      video.play().catch(() => {
        console.log("Autoplay bloqué, vidéo en pause");
      });
    } else {
      video.pause();
    }
  });
});

observer.observe(video);