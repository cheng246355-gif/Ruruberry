// ===========================
// STATE MANAGEMENT
// ===========================

const quizState = {
    currentStep: 0,
    skinType: '',
    concerns: [],
    climate: '',
    totalSteps: 3
};

// ===========================
// PRODUCT DATABASE
// ===========================

const productDatabase = {
    cleansers: {
        oily: { name: 'Gentle Foaming Cleanser', description: 'A lightweight gel cleanser that removes excess oil without stripping, formulated with salicylic acid to keep pores clear.' },
        dry: { name: 'Creamy Hydrating Cleanser', description: 'A rich, non-foaming cleanser with ceramides and hyaluronic acid to cleanse while maintaining moisture barrier.' },
        combination: { name: 'Balancing Gel Cleanser', description: 'A pH-balanced cleanser that works for both oily and dry areas, leaving skin feeling fresh and comfortable.' },
        sensitive: { name: 'Ultra-Gentle Milk Cleanser', description: 'A soothing, fragrance-free cleanser with colloidal oatmeal to calm and cleanse delicate skin.' },
        normal: { name: 'Fresh Daily Cleanser', description: 'A gentle everyday cleanser that maintains skin\'s natural balance while removing impurities.' }
    },

    toners: {
        oily: { name: 'Pore-Refining Toner', description: 'An oil-controlling toner with witch hazel and niacinamide to minimize pores and balance sebum production.' },
        dry: { name: 'Hydrating Essence Toner', description: 'A deeply moisturizing toner with hyaluronic acid and glycerin to plump and prep skin for serums.' },
        combination: { name: 'pH Balancing Toner', description: 'A multi-functional toner that hydrates dry areas while controlling shine in the T-zone.' },
        sensitive: { name: 'Calming Rose Water Toner', description: 'A gentle, alcohol-free toner with rose water and aloe to soothe and refresh sensitive skin.' },
        normal: { name: 'Brightening Vitamin C Toner', description: 'A refreshing toner with vitamin C to enhance radiance and prep skin for better product absorption.' }
    },

    serums: {
        acne: { name: 'Clear Skin Serum', description: 'A targeted treatment with 2% salicylic acid and niacinamide to combat breakouts and reduce inflammation.' },
        aging: { name: 'Youth Renewal Retinol Serum', description: 'An advanced retinol formula with peptides to reduce fine lines, boost collagen, and improve skin texture.' },
        darkspots: { name: 'Brightening Vitamin C Serum', description: 'A potent 15% vitamin C serum with ferulic acid to fade dark spots and even skin tone.' },
        dryness: { name: 'Intense Hydration Serum', description: 'A multi-weight hyaluronic acid serum that delivers deep, lasting hydration to all skin layers.' },
        redness: { name: 'Soothing Centella Serum', description: 'A calming serum with centella asiatica and azelaic acid to reduce redness and strengthen skin barrier.' },
        dullness: { name: 'Glow Booster Niacinamide Serum', description: 'A 10% niacinamide serum with alpha arbutin to brighten, refine texture, and restore radiance.' }
    },

    moisturizers: {
        oily_humid: { name: 'Oil-Free Gel Moisturizer', description: 'A lightweight, water-based gel that hydrates without adding shine, perfect for humid climates.' },
        oily_dry: { name: 'Hydrating Lightweight Lotion', description: 'A non-comedogenic lotion that provides moisture without heaviness, ideal for dry air.' },
        oily_cold: { name: 'Protective Barrier Cream', description: 'A slightly richer formula that protects against harsh weather while controlling oil.' },

        dry_humid: { name: 'Balanced Hydration Cream', description: 'A medium-weight cream with ceramides that hydrates without feeling too heavy in humidity.' },
        dry_dry: { name: 'Rich Nourishing Cream', description: 'An ultra-hydrating cream with shea butter and squalane to combat dryness in arid climates.' },
        dry_cold: { name: 'Intense Repair Moisturizer', description: 'A deeply nourishing cream that shields skin from harsh, cold weather while locking in moisture.' },

        combination_humid: { name: 'Mattifying Hydrator', description: 'A smart moisturizer that hydrates dry areas while controlling shine in humid conditions.' },
        combination_dry: { name: 'Dual-Action Balancing Cream', description: 'A formula that adapts to different skin zones, providing targeted hydration where needed.' },
        combination_cold: { name: 'Comfort Zone Moisturizer', description: 'A versatile cream that protects and balances combination skin in cold weather.' },

        sensitive_all: { name: 'Ultra-Gentle Calming Cream', description: 'A fragrance-free, hypoallergenic moisturizer with colloidal oatmeal to soothe and protect reactive skin.' },

        normal_all: { name: 'Daily Hydration Cream', description: 'A perfectly balanced moisturizer that maintains healthy skin without heaviness or greasiness.' }
    },

    sunscreen: {
        oily: { name: 'Matte Finish SPF 50', description: ' A lightweight, oil-free sunscreen that controls shine while providing broad-spectrum protection.' },
        dry: { name: 'Hydrating SPF 50', description: 'A moisturizing sunscreen with hyaluronic acid that protects while nourishing dry skin.' },
        sensitive: { name: 'Mineral SPF 50', description: 'A gentle, fragrance-free mineral sunscreen with zinc oxide, perfect for sensitive or reactive skin.' },
        default: { name: 'Invisible Daily SPF 50', description: 'A universal sunscreen that absorbs quickly without white cast, suitable for all skin types.' }
    },

    treatments: {
        acne: { name: 'Spot Treatment Gel', description: 'An overnight treatment with 5% benzoyl peroxide to target and heal blemishes quickly.' },
        aging: { name: 'Night Repair Treatment', description: 'A concentrated retinol treatment to accelerate cell turnover and reduce signs of aging overnight.' },
        darkspots: { name: 'Brightening Night Serum', description: 'An intensive treatment with alpha arbutin and kojic acid to fade hyperpigmentation while you sleep.' },
        dryness: { name: 'Overnight Hydration Mask', description: 'A sleeping mask with ceramides and squalane to deeply nourish and repair the moisture barrier.' },
        redness: { name: 'Calming Recovery Treatment', description: 'A soothing overnight treatment with cica and niacinamide to reduce inflammation and redness.' },
        dullness: { name: 'Exfoliating AHA Treatment', description: 'A gentle overnight treatment with lactic acid to resurface skin and reveal a brighter complexion.' }
    }
};

// ===========================
// DOM ELEMENTS
// ===========================

const elements = {
    welcomeScreen: document.getElementById('welcomeScreen'),
    progressContainer: document.getElementById('progressContainer'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),

    question1: document.getElementById('question1'),
    question2: document.getElementById('question2'),
    question3: document.getElementById('question3'),

    startQuizBtn: document.getElementById('startQuizBtn'),

    nextBtn1: document.getElementById('nextBtn1'),
    nextBtn2: document.getElementById('nextBtn2'),
    submitQuizBtn: document.getElementById('submitQuizBtn'),

    backBtn1: document.getElementById('backBtn1'),
    backBtn2: document.getElementById('backBtn2'),
    backBtn3: document.getElementById('backBtn3'),

    resultsScreen: document.getElementById('resultsScreen'),
    skinProfile: document.getElementById('skinProfile'),
    morningRoutine: document.getElementById('morningRoutine'),
    eveningRoutine: document.getElementById('eveningRoutine'),
    restartQuizBtn: document.getElementById('restartQuizBtn')
};

// ===========================
// EVENT LISTENERS
// ===========================

// Start Quiz
elements.startQuizBtn.addEventListener('click', startQuiz);

// Skin Type Selection
document.querySelectorAll('input[name="skinType"]').forEach(input => {
    input.addEventListener('change', (e) => {
        quizState.skinType = e.target.value;
        elements.nextBtn1.disabled = false;
    });
});

// Concerns Selection
document.querySelectorAll('input[name="concerns"]').forEach(input => {
    input.addEventListener('change', () => {
        quizState.concerns = Array.from(document.querySelectorAll('input[name="concerns"]:checked'))
            .map(cb => cb.value);
        elements.nextBtn2.disabled = quizState.concerns.length === 0;
    });
});

// Climate Selection
document.querySelectorAll('input[name="climate"]').forEach(input => {
    input.addEventListener('change', (e) => {
        quizState.climate = e.target.value;
        elements.submitQuizBtn.disabled = false;
    });
});

// Navigation Buttons
elements.nextBtn1.addEventListener('click', () => goToStep(2));
elements.nextBtn2.addEventListener('click', () => goToStep(3));
elements.backBtn1.addEventListener('click', () => goToStep(0));
elements.backBtn2.addEventListener('click', () => goToStep(1));
elements.backBtn3.addEventListener('click', () => goToStep(2));
elements.submitQuizBtn.addEventListener('click', showResults);
elements.restartQuizBtn.addEventListener('click', resetQuiz);

// ===========================
// QUIZ FLOW FUNCTIONS
// ===========================

function startQuiz() {
    elements.welcomeScreen.classList.add('hidden');
    elements.progressContainer.classList.remove('hidden');
    goToStep(1);
}

function goToStep(step) {
    // Hide all question screens
    elements.question1.classList.remove('active');
    elements.question2.classList.remove('active');
    elements.question3.classList.remove('active');

    // Show welcome screen if step is 0
    if (step === 0) {
        elements.welcomeScreen.classList.remove('hidden');
        elements.progressContainer.classList.add('hidden');
        quizState.currentStep = 0;
        return;
    }

    // Update progress
    quizState.currentStep = step;
    updateProgress();

    // Show current question
    if (step === 1) {
        elements.question1.classList.add('active');
    } else if (step === 2) {
        elements.question2.classList.add('active');
    } else if (step === 3) {
        elements.question3.classList.add('active');
    }
}

function updateProgress() {
    const percentage = (quizState.currentStep / quizState.totalSteps) * 100;
    elements.progressFill.style.width = `${percentage}%`;
    elements.progressText.textContent = `Step ${quizState.currentStep} of ${quizState.totalSteps}`;
}

function resetQuiz() {
    quizState.currentStep = 0;
    quizState.skinType = '';
    quizState.concerns = [];
    quizState.climate = '';

    // Reset form inputs
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);

    // Disable next buttons
    elements.nextBtn1.disabled = true;
    elements.nextBtn2.disabled = true;
    elements.submitQuizBtn.disabled = true;

    // Hide results, show welcome
    elements.resultsScreen.classList.remove('active');
    elements.welcomeScreen.classList.remove('hidden');
    elements.progressContainer.classList.add('hidden');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===========================
// RECOMMENDATION ENGINE
// ===========================

function showResults() {
    // Hide quiz, show results
    elements.question3.classList.remove('active');
    elements.progressContainer.classList.add('hidden');
    elements.resultsScreen.classList.add('active');

    // Generate recommendations
    generateSkinProfile();
    generateMorningRoutine();
    generateEveningRoutine();

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generateSkinProfile() {
    const profileHTML = `
    <h3>Your Skin Profile</h3>
    <div class="profile-tags">
      <span class="tag">${capitalizeFirst(quizState.skinType)} Skin</span>
      ${quizState.concerns.map(concern => `<span class="tag">${formatConcern(concern)}</span>`).join('')}
      <span class="tag">${capitalizeFirst(quizState.climate)} Climate</span>
    </div>
  `;
    elements.skinProfile.innerHTML = profileHTML;
}

function generateMorningRoutine() {
    const routine = [];
    let step = 1;

    // Step 1: Cleanser
    const cleanser = productDatabase.cleansers[quizState.skinType];
    routine.push(createProductCard(step++, cleanser.name, cleanser.description));

    // Step 2: Toner
    const toner = productDatabase.toners[quizState.skinType];
    routine.push(createProductCard(step++, toner.name, toner.description));

    // Step 3: Serum (based on primary concern)
    if (quizState.concerns.length > 0) {
        const primaryConcern = quizState.concerns[0];
        const serum = productDatabase.serums[primaryConcern];
        if (serum) {
            routine.push(createProductCard(step++, serum.name, serum.description));
        }
    }

    // Step 4: Moisturizer
    const moisturizer = getMoisturizer();
    routine.push(createProductCard(step++, moisturizer.name, moisturizer.description));

    // Step 5: Sunscreen (always in morning routine)
    const sunscreen = getSunscreen();
    routine.push(createProductCard(step++, sunscreen.name, sunscreen.description));

    elements.morningRoutine.innerHTML = routine.join('');
}

function generateEveningRoutine() {
    const routine = [];
    let step = 1;

    // Step 1: Cleanser
    const cleanser = productDatabase.cleansers[quizState.skinType];
    routine.push(createProductCard(step++, cleanser.name, cleanser.description));

    // Step 2: Toner
    const toner = productDatabase.toners[quizState.skinType];
    routine.push(createProductCard(step++, toner.name, toner.description));

    // Step 3: Treatment Serum (based on concerns)
    if (quizState.concerns.length > 0) {
        quizState.concerns.forEach((concern, index) => {
            if (index < 2) { // Max 2 serums in evening routine
                const serum = productDatabase.serums[concern];
                if (serum) {
                    routine.push(createProductCard(step++, serum.name, serum.description));
                }
            }
        });
    }

    // Step 4: Moisturizer
    const moisturizer = getMoisturizer();
    routine.push(createProductCard(step++, moisturizer.name, moisturizer.description));

    // Step 5: Targeted Treatment (if applicable)
    if (quizState.concerns.length > 0) {
        const treatment = productDatabase.treatments[quizState.concerns[0]];
        if (treatment) {
            routine.push(createProductCard(step++, treatment.name, treatment.description));
        }
    }

    elements.eveningRoutine.innerHTML = routine.join('');
}

function getMoisturizer() {
    const skinType = quizState.skinType;
    const climate = quizState.climate;

    // Special cases
    if (skinType === 'sensitive') {
        return productDatabase.moisturizers.sensitive_all;
    }

    if (skinType === 'normal') {
        return productDatabase.moisturizers.normal_all;
    }

    // Climate-specific moisturizers
    const key = `${skinType}_${climate}`;
    if (productDatabase.moisturizers[key]) {
        return productDatabase.moisturizers[key];
    }

    // Fallback to general climate categories
    if (climate === 'hot') {
        return productDatabase.moisturizers[`${skinType}_humid`] || productDatabase.moisturizers.normal_all;
    } else if (climate === 'temperate') {
        return productDatabase.moisturizers[`${skinType}_humid`] || productDatabase.moisturizers.normal_all;
    }

    return productDatabase.moisturizers.normal_all;
}

function getSunscreen() {
    if (productDatabase.sunscreen[quizState.skinType]) {
        return productDatabase.sunscreen[quizState.skinType];
    }
    return productDatabase.sunscreen.default;
}

function createProductCard(step, name, description) {
    return `
    <div class="product-card">
      <div class="product-step">${step}</div>
      <div class="product-name">${name}</div>
      <div class="product-description">${description}</div>
    </div>
  `;
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatConcern(concern) {
    const concernMap = {
        'acne': 'Acne-Prone',
        'aging': 'Anti-Aging',
        'darkspots': 'Dark Spots',
        'dryness': 'Dehydration',
        'redness': 'Sensitivity',
        'dullness': 'Dullness'
    };
    return concernMap[concern] || capitalizeFirst(concern);
}

// ===========================
// INITIALIZE
// ===========================

// Set initial state
document.addEventListener('DOMContentLoaded', () => {
    console.log('Skin Quiz App initialized');
});
