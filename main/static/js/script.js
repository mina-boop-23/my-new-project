document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('registerModal');
const openBtn = document.getElementById('openRegisterModal');
const openBtnBottom = document.getElementById('openRegisterModalBottom');
const closeBtn = document.getElementById('closeModal');
const form = document.getElementById('registerForm');
const successMsg = document.getElementById('successMessage');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

openBtn.addEventListener('click', openModal);
if (openBtnBottom) {
    openBtnBottom.addEventListener('click', openModal);
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    form.style.display = 'block';
    successMsg.style.display = 'none';
    form.reset();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        form.style.display = 'block';
        successMsg.style.display = 'none';
        form.reset();
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-flex';
    
    const formData = {
        full_name: document.getElementById('full_name').value,
        field: document.getElementById('field').value,
        phone_number: document.getElementById('phone_number').value,
        degree: document.getElementById('degree').value
    };
    console.log(formData);
    try {
        const response = await fetch('/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            form.style.display = 'none';
            successMsg.style.display = 'flex';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                form.style.display = 'block';
                successMsg.style.display = 'none';
                form.reset();
            }, 3000);
        } else {
            alert('خطا در ثبت اطلاعات. لطفاً دوباره تلاش کنید.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
    } finally {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});
})