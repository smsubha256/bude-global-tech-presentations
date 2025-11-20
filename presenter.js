/**
 * Presenter.js - Merged Version
 * Original Animations + New Functional Components (Quiz, Chart, Video, Comparison)
 */

// Global state for quiz interactions
const quizState = {};

// --- 1. BACKGROUND ANIMATIONS (Your Original Code) ---

function createAnimatedBackground() {
    const existingBg = document.getElementById('animated-background');
    if (existingBg) existingBg.remove();

    const bgContainer = document.createElement('div');
    bgContainer.id = 'animated-background';
    bgContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;

    const shapes = ['circle', 'square', 'triangle', 'hexagon'];
    const colors = ['#0060a0', '#6f42c1', '#cb6ce6', '#23a6d5', '#23d5ab'];

    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 80 + 40;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        shape.className = `bg-shape ${shapeType}`;
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: 0.1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-${i} ${duration}s ease-in-out ${delay}s infinite;
        `;

        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (shapeType === 'triangle') {
            shape.style.background = 'transparent';
            shape.style.borderLeft = `${size / 2}px solid transparent`;
            shape.style.borderRight = `${size / 2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
            shape.style.width = '0';
            shape.style.height = '0';
        } else if (shapeType === 'hexagon') {
            shape.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)';
        }

        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes float-${i} {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg); }
                50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg); }
                75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg); }
            }
        `;
        document.head.appendChild(styleSheet);
        bgContainer.appendChild(shape);
    }
    document.body.insertBefore(bgContainer, document.body.firstChild);
}

function createFloatingShapes() {
    const colors = ['#0060a0', '#6f42c1', '#cb6ce6', '#23a6d5', '#23d5ab'];
    const shapes = ['circle', 'square', 'triangle'];
    const positions = [
        { top: '2%', left: '2%' }, { top: '2%', right: '2%' },
        { bottom: '2%', left: '2%' }, { bottom: '2%', right: '2%' },
        { top: '50%', left: '0%' }, { top: '0%', left: '50%' },
        { bottom: '50%', right: '0%' }, { bottom: '0%', right: '50%' }
    ];

    for (let i = 0; i < positions.length; i++) {
        const shape = document.createElement('div');
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 20 + 20;

        shape.classList.add('floating-shape');
        shape.style.background = type === 'triangle' ? 'transparent' : color;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        shape.style.opacity = 0.6 + Math.random() * 0.3;
        Object.assign(shape.style, positions[i]);

        if (type === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (type === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = `${size / 2}px solid transparent`;
            shape.style.borderRight = `${size / 2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
        }

        document.body.appendChild(shape);

        const randomMove = () => {
            const dx = (Math.random() - 0.5) * 80;
            const dy = (Math.random() - 0.5) * 80;
            shape.animate([
                { transform: 'translate(0, 0) rotate(0deg)' },
                { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)` }
            ], {
                duration: 6000 + Math.random() * 4000,
                direction: 'alternate',
                iterations: Infinity,
                easing: 'ease-in-out'
            });
        };
        randomMove();
    }
}

createFloatingShapes();

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(111, 66, 193, 0.4);
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(ripple);
    ripple.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(30)', opacity: 0 }
    ], { duration: 600, easing: 'ease-out' });
    setTimeout(() => ripple.remove(), 600);
}

// --- 2. STYLES & TRANSITIONS (Merged) ---

function addSlideTransitions() {
    const styles = document.createElement('style');
    styles.textContent = `
        /* YOUR ORIGINAL STYLES */
        .reveal .slides section { transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .reveal .slides section.past { transform: scale(0.8) translateX(-100px); opacity: 0; }
        .reveal .slides section.future { transform: scale(0.8) translateX(100px); opacity: 0; }
        .reveal .slides section.present { transform: scale(1) translateX(0); opacity: 1; animation: slideIn 0.6s ease-out; }
        @keyframes slideIn { 0% { transform: scale(0.9) translateY(30px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        .reveal h1, .reveal h2, .reveal h3 { animation: fadeInUp 0.8s ease-out; }
        @keyframes fadeInUp { 0% { transform: translateY(30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .reveal .box { animation: scaleIn 0.5s ease-out 0.2s both; }
        @keyframes scaleIn { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .reveal li { animation: fadeInLeft 0.5s ease-out both; }
        .reveal li:nth-child(1) { animation-delay: 0.3s; }
        .reveal li:nth-child(2) { animation-delay: 0.4s; }
        .reveal li:nth-child(3) { animation-delay: 0.5s; }
        .reveal li:nth-child(4) { animation-delay: 0.6s; }
        @keyframes fadeInLeft { 0% { transform: translateX(-20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        .reveal .emoji { display: inline-block; animation: bounce 0.6s ease-out; }
        @keyframes bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        .reveal code { animation: codeAppear 0.8s ease-out 0.4s both; }
        @keyframes codeAppear { 0% { transform: translateY(10px); opacity: 0; filter: blur(5px); } 100% { transform: translateY(0); opacity: 1; filter: blur(0); } }
        .reveal .box:hover { transform: scale(1.02); box-shadow: 0 10px 30px rgba(111, 66, 193, 0.3); transition: all 0.3s ease; }
        
        /* --- NEW COMPONENT STYLES (Minimal) --- */
        
        /* Comparison Columns */
        .comparison-container { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0; }
        .comparison-column { background: rgba(255,255,255,0.05); border-left: 4px solid var(--bude-primary, #0060a0); padding: 1.5rem; border-radius: 8px; }
        
        /* Video */
        .video-container { position: relative; width: 100%; max-width: 800px; margin: 2rem auto; }
        .video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .video-wrapper iframe, .video-wrapper video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }

        /* Quiz */
        .quiz-container { max-width: 800px; margin: 2rem auto; text-align: left; }
        .quiz-option { background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(0, 96, 160, 0.3); padding: 1rem; margin-bottom: 1rem; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
        .quiz-option:hover { transform: translateX(10px); border-color: #0060a0; }
        .quiz-option.correct { border-color: #4caf50; background: rgba(76, 175, 80, 0.2); }
        .quiz-option.incorrect { border-color: #f44336; background: rgba(244, 67, 54, 0.2); }
        .quiz-explanation { margin-top: 1.5rem; padding: 1rem; background: rgba(111, 66, 193, 0.1); border-left: 4px solid #6f42c1; display: none; }
        .quiz-explanation.show { display: block; animation: slideIn 0.5s; }

        /* Charts & Diagrams */
        .chart-container, .diagram-container { max-width: 800px; margin: 2rem auto; padding: 1rem; background: rgba(255,255,255,0.9); border-radius: 8px; }
        .chart-canvas { width: 100% !important; height: 400px !important; }
        .diagram-content { font-family: monospace; white-space: pre; overflow-x: auto; color: #333; }
    `;
    document.head.appendChild(styles);
}

// --- 3. RENDER SLIDES (Integrated) ---

async function renderSlides(data) {
    const slidesContainer = document.querySelector('.reveal .slides');
    slidesContainer.innerHTML = '';

    createAnimatedBackground();
    addSlideTransitions();

    data.presentation.topics.forEach(topic => {
        topic.slides.forEach(slide => {
            const section = createSlide(slide);
            slidesContainer.appendChild(section);

            // Trigger chart rendering if needed
            if (slide.type === 'chart') {
                setTimeout(() => renderChart(slide), 500);
            }
        });
    });

    // Initialize Reveal.js (Your Original Config)
    Reveal.initialize({
        hash: true,
        slideNumber: true,
        transition: 'slide',
        backgroundTransition: 'fade',
        controls: true,
        progress: true,
        center: true,
        width: 1920,
        height: 1080,
        margin: 0.08,
        minScale: 0.3,
        maxScale: 3.0,
        overflow: 'scroll',
        pdfSeparateFragments: false,
        pdfMaxPagesPerSlide: 1,
        keyboard: {
            40: () => { /* Your existing scroll/down logic */ Reveal.down(); },
            38: () => { /* Your existing scroll/up logic */ Reveal.up(); },
            72: () => { if (confirm('Return to homepage?')) location.reload(); }
        }
    });

    Reveal.on('slidechanged', event => {
        if (event.currentSlide.classList.contains('center')) {
            document.body.classList.add('hide-watermark');
        } else {
            document.body.classList.remove('hide-watermark');
        }
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        // Using your particle effect from outside this function (ensure createParticleEffect exists globally or inside)
       // createParticleEffect(centerX, centerY);
       // createRipple(centerX, centerY);

        const shapes = document.querySelectorAll('.bg-shape');
        shapes.forEach(shape => {
            shape.style.transition = 'transform 0.6s ease-out';
            shape.style.transform = (shape.style.transform || '') + ' scale(1.2)';
            setTimeout(() => { shape.style.transform = shape.style.transform.replace(' scale(1.2)', ''); }, 600);
        });
    });

    const initialSlide = document.querySelector('.reveal .slides section.present');
    if (initialSlide && initialSlide.classList.contains('center')) {
        document.body.classList.add('hide-watermark');
    }
}

// --- 4. CREATE SLIDE (Merged Switch/If logic) ---

function createSlide(slideData) {
    const section = document.createElement('section');

    // --- EXISTING TYPES ---
    if (slideData.type === 'title') {
        section.classList.add('center', 'gradient-bg');
        section.innerHTML = `
            <center><img src="assets/images/budeglobal_logo.png" alt="BUDE Logo" class="bude-logo" style="animation: float 3s ease-in-out infinite;"></center>
            <h1 style="font-size: 3em; margin: 0.5em 0;">${slideData.title}</h1>
            <h3 style="color: var(--bude-primary); font-size: 1.4em; margin: 0.5em 0;">${slideData.subtitle}</h3>
        `;
    } else if (slideData.type === 'presenter') {
        section.classList.add('center', 'gradient-bg');
        section.innerHTML = `
        <div style="display: flex; align-items: center; gap: 3em; max-width: 900px;">
            <div style="flex-shrink: 0;">
                <div style="width: 250px; height: 250px; border-radius: 50%; background: linear-gradient(135deg, #0060a0, #6f42c1); display: flex; align-items: center; justify-content: center; color: white; font-size: 4em; font-weight: bold; border: 5px solid white; box-shadow: 0 4px 20px rgba(0,0,0,0.15); animation: float 3s ease-in-out infinite;">
                    AGP
                </div>
            </div>
            <div style="text-align: left;">
                <h2 style="margin: 0 0 0.5em 0; font-size: 2.5em;">${slideData.name}</h2>
                <div style="font-size: 1.1em; line-height: 1.8;">
                    <p style="margin: 0.5em 0;"><span class="emoji">👔</span> ${slideData.title}</p>
                    <p style="margin: 0.5em 0;"><span class="emoji">💻</span> ${slideData.experience}</p>
                    <p style="margin: 0.5em 0;"><span class="emoji">🌟</span> ${slideData.oss_experience}</p>
                    <p style="margin: 1em 0 0.3em 0;"><span class="emoji">🔗</span> <a href="${slideData.github}" target="_blank" style="color: #6f42c1;">github.com/aravind-govindhasamy</a></p>
                    <p style="margin: 0.3em 0;"><span class="emoji">🌐</span> <a href="${slideData.website}" target="_blank" style="color: #6f42c1;">aravind-govindhasamy.github.io</a></p>
                </div>
            </div>
        </div>`;
    } else if (slideData.type === 'topic-title') {
        section.classList.add('center');
        section.innerHTML = `
            <h2>${slideData.title}</h2>
            ${slideData.box ? createBox(slideData.box) : ''}
            ${slideData.note ? `<p class="small-text" style="margin-top: ${slideData.note.centered ? '2em; text-align: center' : '1.5em'};">${slideData.note.text}</p>` : ''}
        `;
    } else if (slideData.type === 'content') {
        const emoji = slideData.emoji ? `<span class="emoji">${slideData.emoji}</span> ` : '';
        section.innerHTML = `
            <h3>${emoji}${slideData.title}</h3>
            ${slideData.box ? createBox(slideData.box) : ''}
            ${slideData.list ? createList(slideData.list) : ''}
            ${slideData.note ? `<p class="small-text" style="margin-top: 1.5em;">${slideData.note.text}</p>` : ''}
        `;
    } else if (slideData.type === 'qa') {
        section.classList.add('center', 'gradient-bg');
        section.innerHTML = `
            <h1>${slideData.title}</h1>
            <p style="margin-top: 1.5em; font-size: 1.2em; color: var(--text-primary);">
                ${slideData.content}
            </p>
        `;
    } else if (slideData.type === 'thank-you') {
        section.classList.add('center', 'gradient-bg');
        section.innerHTML = `
            <h1>${slideData.title}</h1>
            <div class="box" style="margin-top: 2em; max-width: 800px; margin-left: auto; margin-right: auto;">
                <p style="font-size: 1.1em; margin-bottom: 1em;">${slideData.box.content}</p>
                <p class="small-text" style="margin-top: 1em;">${slideData.box.note}</p>
            </div>
            <div style="margin-top: 2em;">
                <p style="font-size: 1.2em;"><span class="emoji">🏢</span> <strong style="color: #0060a0;">${slideData.footer.org}</strong></p>
                <p style="margin-top: 0.5em; color: #6f42c1;">${slideData.footer.tagline}</p>
            </div>
        `;

        // --- NEW TYPES ADDED HERE ---

    } else if (slideData.type === 'comparison') {
        section.innerHTML = `
            <h3>${slideData.title || 'Comparison'}</h3>
            <div class="comparison-container">
                <div class="comparison-column">
                    <h4>${slideData.leftTitle}</h4>
                    <ul>${slideData.leftPoints.map(point => `<li>${point}</li>`).join('')}</ul>
                </div>
                <div class="comparison-column">
                    <h4>${slideData.rightTitle}</h4>
                    <ul>${slideData.rightPoints.map(point => `<li>${point}</li>`).join('')}</ul>
                </div>
            </div>
        `;
    } else if (slideData.type === 'video') {
        let videoEmbed = '';
        if (slideData.videoUrl.includes('youtube') || slideData.videoUrl.includes('youtu.be')) {
            const vidId = slideData.videoUrl.split(/v\/|u\/\w\/|embed\/|watch\?v=|\&v=/)[1].split(/[#\&\?]/)[0];
            videoEmbed = `<iframe src="https://www.youtube.com/embed/${vidId}" allowfullscreen></iframe>`;
        } else {
            videoEmbed = `<video controls><source src="${slideData.videoUrl}" type="video/mp4"></video>`;
        }
        section.innerHTML = `
            <h3>${slideData.title || 'Video'}</h3>
            <div class="video-container">
                <div class="video-wrapper">${videoEmbed}</div>
                ${slideData.caption ? `<p class="video-caption">${slideData.caption}</p>` : ''}
            </div>
        `;
    } else if (slideData.type === 'quiz') {
        const quizId = `quiz-${Date.now()}-${Math.random()}`;
        quizState[quizId] = { correctAnswer: slideData.correctAnswer, answered: false };
        section.innerHTML = `
            <div class="quiz-container" data-quiz-id="${quizId}">
                <div class="quiz-question"><h3>${slideData.question}</h3></div>
                <div class="quiz-options">
                    ${slideData.options.map((option, index) => `
                        <div class="quiz-option" onclick="handleQuizAnswer('${quizId}', ${index})">
                            ${String.fromCharCode(65 + index)}. ${option}
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-explanation" id="explanation-${quizId}">
                    <strong>Explanation:</strong> ${slideData.explanation}
                </div>
            </div>
        `;
    } else if (slideData.type === 'chart') {
        const chartId = `chart-${Date.now()}-${Math.random()}`;
        section.innerHTML = `
            <h3>${slideData.title || 'Chart'}</h3>
            <div class="chart-container">
                <canvas id="${chartId}" class="chart-canvas" data-chart-type="${slideData.chartType}" data-labels='${JSON.stringify(slideData.labels)}' data-data='${JSON.stringify(slideData.data)}'></canvas>
            </div>
        `;
    } else if (slideData.type === 'diagram') {
        section.innerHTML = `
            <h3>${slideData.title || 'Diagram'}</h3>
            <div class="diagram-container">
                <div class="diagram-content">${escapeHtml(slideData.content)}</div>
            </div>
        `;
    }

    return section;
}

// --- 5. NEW LOGIC (Quiz & Charts) ---

window.handleQuizAnswer = function (quizId, selectedIndex) {
    const state = quizState[quizId];
    if (state.answered) return;

    const container = document.querySelector(`[data-quiz-id="${quizId}"]`);
    const options = container.querySelectorAll('.quiz-option');
    const explanation = document.getElementById(`explanation-${quizId}`);

    options[selectedIndex].classList.add('selected');

    setTimeout(() => {
        if (selectedIndex === state.correctAnswer) {
            options[selectedIndex].classList.remove('selected');
            options[selectedIndex].classList.add('correct');
        } else {
            options[selectedIndex].classList.remove('selected');
            options[selectedIndex].classList.add('incorrect');
            options[state.correctAnswer].classList.add('correct');
        }
        explanation.classList.add('show');
        state.answered = true;
    }, 300);
};

function renderChart(slideData) {
    const canvas = document.querySelector(`canvas[data-chart-type="${slideData.chartType}"]`);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const labels = slideData.labels;
    const data = slideData.data;

    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const colors = ['#0060a0', '#6f42c1', '#cb6ce6', '#23a6d5', '#23d5ab'];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px Arial';

    if (slideData.chartType === 'bar') {
        const maxValue = Math.max(...data);
        const barWidth = chartWidth / labels.length - 10;
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + index * (barWidth + 10);
            const y = padding + chartHeight - barHeight;
            ctx.fillStyle = colors[index % colors.length];
            ctx.fillRect(x, y, barWidth, barHeight);
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], x + barWidth / 2, padding + chartHeight + 20);
            ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
        });
    } else if (slideData.chartType === 'line') {
        const maxValue = Math.max(...data);
        const stepX = chartWidth / (labels.length - 1);
        ctx.strokeStyle = '#0060a0';
        ctx.lineWidth = 3;
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = padding + index * stepX;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            ctx.fillStyle = '#6f42c1';
            // Draw dot later so lines connect first
        });
        ctx.stroke();
        data.forEach((value, index) => {
            const x = padding + index * stepX;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#6f42c1';
            ctx.fill();
            ctx.fillStyle = '#333';
            ctx.fillText(labels[index], x, padding + chartHeight + 20);
            ctx.fillText(value.toString(), x, y - 10);
        });
    } else if (slideData.chartType === 'pie') {
        const total = data.reduce((a, b) => a + b, 0);
        let startAngle = -Math.PI / 2;
        const centerX = canvas.width / 2, centerY = canvas.height / 2, radius = Math.min(canvas.width, canvas.height) / 2 - 40;
        data.forEach((value, index) => {
            const sliceAngle = (value / total) * Math.PI * 2;
            ctx.fillStyle = colors[index % colors.length];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.fill();
            // Label
            const mid = startAngle + sliceAngle / 2;
            const lx = centerX + Math.cos(mid) * (radius + 20);
            const ly = centerY + Math.sin(mid) * (radius + 20);
            ctx.fillStyle = '#333';
            ctx.fillText(`${labels[index]}: ${value}`, lx, ly);
            startAngle += sliceAngle;
        });
    }
}

// --- 6. HELPER FUNCTIONS ---

function createBox(boxData) {
    let html = '<div class="box">';
    if (boxData.title) html += `<p><strong>${boxData.title}</strong></p>`;
    if (boxData.content) html += `<p>${boxData.content}</p>`;
    if (boxData.list && Array.isArray(boxData.list)) {
        html += '<ul>';
        boxData.list.forEach(item => {
            if (typeof item === 'object' && item.emoji) {
                html += `<li><span class="emoji">${item.emoji}</span> ${item.text}</li>`;
            } else {
                html += `<li>${item}</li>`;
            }
        });
        html += '</ul>';
    }
    if (boxData.code) {
        html += `<div class="code-block"><pre><code class="language-python">${escapeHtml(boxData.code)}</code></pre></div>`;
    }
    html += '</div>';
    return html;
}

function createList(listData) {
    let html = '<ul style="margin-top: 1.5em;">';
    listData.forEach(item => {
        if (typeof item === 'object' && item.emoji) {
            html += `<li><span class="emoji">${item.emoji}</span> ${item.text}</li>`;
        } else {
            html += `<li>${item}</li>`;
        }
    });
    html += '</ul>';
    return html;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- 7. CANVAS PARTICLES (Your Original Footer Script) ---
const canvas = document.getElementById('futuristic-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Generate floating particles
    function createParticleEffect(x, y) { /* Helper wrapper */ }
    // Note: We are repurposing this loop for the background
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.8,
            dy: (Math.random() - 0.5) * 0.8,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 12;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > width) p.dx *= -1;
            if (p.y < 0 || p.y > height) p.dy *= -1;
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// Add vertical glowing lines (Your Original)
for (let i = 0; i < 5; i++) {
    const line = document.createElement('div');
    line.classList.add('glow-line');
    line.style.left = `${Math.random() * 100}%`;
    line.style.animationDelay = `${Math.random() * 8}s`;
    document.body.appendChild(line);
}