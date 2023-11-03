const script = document.createElement('script');
script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
script.setAttribute('data-client-key', process.env.MIDTRANS_CLIENT_KEY);

window.Snap = {
  pay: (token, options) => {
    window.snap.pay(token, options);
  }
};

document.head.appendChild(script);
