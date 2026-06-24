// ===== MULTI-STEP FORM =====
const form = document.getElementById('ppdbForm');
const formSteps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('.step');
let currentStep = 1;
const totalSteps = formSteps.length;

// ===== NEXT BUTTON =====
document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateForm();
                if (currentStep === 4) generateConfirmation();
            }
        }
    });
});

// ===== PREV BUTTON =====
document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateForm();
        }
    });
});

// ===== UPDATE FORM DISPLAY =====
const updateForm = () => {
    formSteps.forEach(step => step.classList.remove('active'));
    stepIndicators.forEach(step => step.classList.remove('active'));

    document.querySelector(`.form-step[data-step="${currentStep}"]`)?.classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`)?.classList.add('active');

    // Scroll to top of form
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ===== VALIDATION =====
const validateStep = (step) => {
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    // Specific validations
    if (step === 1) {
        const nik = form.querySelector('[name="nik"]');
        if (nik && nik.value.length !== 16) {
            nik.style.borderColor = '#ef4444';
            alert('NIK harus 16 digit!');
            isValid = false;
        }
    }

    if (!isValid) {
        alert('Mohon lengkapi semua field yang wajib diisi!');
    }

    return isValid;
};

// ===== GENERATE CONFIRMATION =====
const generateConfirmation = () => {
    const confirmData = document.getElementById('confirmData');
    if (!confirmData) return;

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    const labels = {
        nama: 'Nama Lengkap',
        nik: 'NIK',
        tempat_lahir: 'Tempat Lahir',
        tgl_lahir: 'Tanggal Lahir',
        gender: 'Jenis Kelamin',
        hp: 'No. HP',
        alamat: 'Alamat',
        nama_ayah: 'Nama Ayah',
        pekerjaan_ayah: 'Pekerjaan Ayah',
        nama_ibu: 'Nama Ibu',
        pekerjaan_ibu: 'Pekerjaan Ibu',
        penghasilan: 'Penghasilan',
        hp_ortu: 'No. HP Ortu',
        asal_sekolah: 'Asal Sekolah',
        program: 'Program',
        nilai: 'Nilai Rapor',
        hafalan: 'Hafalan'
    };

    let html = '';
    Object.keys(labels).forEach(key => {
        if (data[key]) {
            let val = data[key];
            if (key === 'gender') val = data[key] === 'L' ? 'Laki-laki' : 'Perempuan';
            html += `<div class="confirm-row"><strong>${labels[key]}:</strong><span>${val}</span></div>`;
        }
    });

    confirmData.innerHTML = html;
};

// ===== FORM SUBMIT =====
form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const agree = form.querySelector('[name="agree"]');
    if (!agree?.checked) {
        alert('Mohon centang persetujuan terlebih dahulu!');
        return;
    }

    // Generate registration number
    const regNum = 'MUP-2026-' + String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
    document.getElementById('regNumber').textContent = regNum;

    // Show success modal
    const modal = document.getElementById('successModal');
    modal?.classList.add('active');

    // Save to localStorage (demo)
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    data.reg_number = regNum;
    data.registered_at = new Date().toISOString();

    const registrations = JSON.parse(localStorage.getItem('ppdb_registrations') || '[]');
    registrations.push(data);
    localStorage.setItem('ppdb_registrations', JSON.stringify(registrations));

    console.log('📋 Pendaftaran disimpan:', data);
});

// ===== AUTO-FORMAT INPUTS =====
form?.querySelector('[name="nik"]')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16);
});

form?.querySelector('[name="hp"]')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
});

form?.querySelector('[name="hp_ortu"]')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
});

console.log('📝 PPDB Form initialized');
