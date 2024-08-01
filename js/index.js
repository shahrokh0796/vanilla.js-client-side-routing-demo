// Add event listeners to the buttons
document.addEventListener('DOMContentLoaded', () => {
  const router = new Router(routes);

  document.getElementById('homeBtn').addEventListener('click', () => { 
    router.loadRoute('');
  });
  
  document.getElementById('aboutBtn').addEventListener('click', () => { 
    router.loadRoute('about');
  });
  
  document.getElementById('contactBtn').addEventListener('click', () => { 
    router.loadRoute('contact');
  });
  
  document.getElementById('product1Btn').addEventListener('click', () => { 
    router.loadRoute('products', '1');
  });
  
  document.getElementById('product2Btn').addEventListener('click', () => { 
    router.loadRoute('products', '2');
  });
})



