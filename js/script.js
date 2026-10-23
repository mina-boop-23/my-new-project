const modal = document.getElementById('registerModal');
const openBtn = document.getElementById('openRegisterModal');
const closeBtn = document.getElementById('closeModal');
const form = document.getElementById('registerForm');
const successMsg = document.getElementById('successMessage');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

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
        fullName: document.getElementById('fullName').value,
        field: document.getElementById('field').value,
        phone: document.getElementById('phone').value,
        degree: document.getElementById('degree').value
    };

    try {
        const response = await fetch('http://localhost:8095', {
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