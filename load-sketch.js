function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  }
  
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) {
    loadScript('sketch-mobile.js');
  } else {
    loadScript('sketch.js');
  }
  