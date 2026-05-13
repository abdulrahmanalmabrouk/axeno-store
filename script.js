const PRICE = 449;
let qty = 1;

function changeQty(delta) {
  qty = Math.max(1, Math.min(10, qty + delta));
  document.getElementById('qtyDisplay').textContent = qty;
  document.getElementById('qtyInput').value = qty;
  updatePrice();
}

function updatePrice() {
  var total = PRICE * qty;
  document.getElementById('totalPrice').textContent = 'الاجمالي: ' + total + ' جنيه';
}

var form = document.getElementById('orderForm');
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  var btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'جاري الارسال...';
  var data = new FormData(form);
  try {
    var res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      form.style.display = 'none';
      document.getElementById('successMsg').classList.add('show');
    } else {
      btn.disabled = false;
      btn.textContent = 'تاكيد الطلب';
      alert('حصل خطا، حاول تاني');
    }
  } catch(err) {
    btn.disabled = false;
    btn.textContent = 'تاكيد الطلب';
    alert('تاكد من الانترنت وحاول تاني');
  }
});