// Referências para elementos DOM
const svg = document.getElementById('pattern-svg');
const patternTypeSelect = document.getElementById('pattern-type');
const elementsInput = document.getElementById('elements');
const elementsValue = document.getElementById('elements-value');
const sizeInput = document.getElementById('size');
const sizeValue = document.getElementById('size-value');
const complexityInput = document.getElementById('complexity');
const complexityValue = document.getElementById('complexity-value');
const rotationInput = document.getElementById('rotation');
const rotationValue = document.getElementById('rotation-value');
const colorThemeSelect = document.getElementById('color-theme');
const customColorsDiv = document.getElementById('custom-colors');
const primaryColorInput = document.getElementById('primary-color');
const secondaryColorInput = document.getElementById('secondary-color');
const accentColorInput = document.getElementById('accent-color');
const backgroundColorInput = document.getElementById('background-color');
const glowEffectToggle = document.getElementById('glow-effect');
const animationToggle = document.getElementById('animation-toggle');
const noiseToggle = document.getElementById('noise-toggle');
const gridToggle = document.getElementById('grid-toggle');
const transparencyInput = document.getElementById('transparency');
const transparencyValue = document.getElementById('transparency-value');
const generateBtn = document.getElementById('generate-btn');
const randomizeBtn = document.getElementById('randomize-btn');
const downloadBtn = document.getElementById('download-btn');
const presetBtns = document.querySelectorAll('.preset-btn');
const loadingOverlay = document.getElementById('loading-overlay');

// Configurações padrão para temas de cores
const colorThemes = {
    cyberpunk: {
        primary: '#ff2a6d',
        secondary: '#05d9e8',
        accent: '#ff00ff',
        background: '#0d0221'
    },
    matrix: {
        primary: '#00ff41',
        secondary: '#008f11',
        accent: '#003b00',
        background: '#0d0208'
    },
    blueprint: {
        primary: '#0f5e9c',
        secondary: '#2389da',
        accent: '#89c4f4',
        background: '#06121e'
    },
    neon: {
        primary: '#fe00fe',
        secondary: '#00ff00',
        accent: '#00ffff',
        background: '#000000'
    },
    holo: {
        primary: '#ff1493',
        secondary: '#00bfff',
        accent: '#7b68ee',
        background: '#000222'
    },
    tech: {
        primary: '#4285f4',
        secondary: '#34a853',
        accent: '#ea4335',
        background: '#050e1b'
    }
};

// Configurações predefinidas para presets
const presets = {
    circuitBoard: {
        type: 'circuit',
        elements: 80,
        size: 25,
        complexity: 7,
        rotation: 0,
        colorTheme: 'tech',
        glow: true,
        animation: false,
        noise: false,
        grid: true,
        transparency: 20
    },
    neuralNetwork: {
        type: 'network',
        elements: 120,
        size: 15,
        complexity: 8,
        rotation: 0,
        colorTheme: 'neon',
        glow: true,
        animation: true,
        noise: false,
        grid: false,
        transparency: 30
    },
    cyberGrid: {
        type: 'hexGrid',
        elements: 100,
        size: 35,
        complexity: 6,
        rotation: 0,
        colorTheme: 'cyberpunk',
        glow: true,
        animation: false,
        noise: true,
        grid: true,
        transparency: 15
    },
    dataStream: {
        type: 'dataFlow',
        elements: 150,
        size: 10,
        complexity: 4,
        rotation: 45,
        colorTheme: 'matrix',
        glow: true,
        animation: true,
        noise: true,
        grid: false,
        transparency: 40
    },
    techBlueprint: {
        type: 'blueprint',
        elements: 70,
        size: 30,
        complexity: 9,
        rotation: 0,
        colorTheme: 'blueprint',
        glow: false,
        animation: false,
        noise: false,
        grid: true,
        transparency: 10
    },
    aiVision: {
        type: 'matrix',
        elements: 200,
        size: 8,
        complexity: 10,
        rotation: 0,
        colorTheme: 'holo',
        glow: true,
        animation: true,
        noise: true,
        grid: true,
        transparency: 50
    }
};

// Atualiza valores exibidos
elementsInput.addEventListener('input', () => {
    elementsValue.textContent = elementsInput.value;
});

sizeInput.addEventListener('input', () => {
    sizeValue.textContent = sizeInput.value;
});

complexityInput.addEventListener('input', () => {
    complexityValue.textContent = complexityInput.value;
});

rotationInput.addEventListener('input', () => {
    rotationValue.textContent = rotationInput.value;
});

transparencyInput.addEventListener('input', () => {
    transparencyValue.textContent = transparencyInput.value;
});

// Exibe/oculta paleta de cores personalizada
colorThemeSelect.addEventListener('change', () => {
    if (colorThemeSelect.value === 'custom') {
        customColorsDiv.style.display = 'block';
    } else {
        customColorsDiv.style.display = 'none';
        updateColorInputs(colorThemeSelect.value);
    }
});

// Atualiza inputs de cores quando seleciona um tema
function updateColorInputs(themeName) {
    const theme = colorThemes[themeName];
    if (theme) {
        primaryColorInput.value = theme.primary;
        secondaryColorInput.value = theme.secondary;
        accentColorInput.value = theme.accent;
        backgroundColorInput.value = theme.background;
    }
}

// Aplica um preset ao gerador
function applyPreset(presetName) {
    const preset = presets[presetName];
    if (!preset) return;
    
    // Mostrar overlay de carregamento
    showLoadingOverlay();
    
    // Atualizar seletores e inputs com valores do preset
    setTimeout(() => {
        patternTypeSelect.value = preset.type;
        elementsInput.value = preset.elements;
        elementsValue.textContent = preset.elements;
        sizeInput.value = preset.size;
        sizeValue.textContent = preset.size;
        complexityInput.value = preset.complexity;
        complexityValue.textContent = preset.complexity;
        rotationInput.value = preset.rotation;
        rotationValue.textContent = preset.rotation;
        colorThemeSelect.value = preset.colorTheme;
        
        // Atualizar cores se não for o tema personalizado
        if (preset.colorTheme !== 'custom') {
            customColorsDiv.style.display = 'none';
            updateColorInputs(preset.colorTheme);
        } else {
            customColorsDiv.style.display = 'block';
        }
        
        // Atualizar checkboxes e outros controles
        glowEffectToggle.checked = preset.glow;
        animationToggle.checked = preset.animation;
        noiseToggle.checked = preset.noise;
        gridToggle.checked = preset.grid;
        transparencyInput.value = preset.transparency;
        transparencyValue.textContent = preset.transparency;
        
        // Gerar padrão com os valores do preset
        generatePattern();
        
        // Esconder overlay de carregamento
        hideLoadingOverlay();
    }, 300);
}

// Mostrar overlay de carregamento
function showLoadingOverlay() {
    loadingOverlay.classList.add('active');
}

// Esconder overlay de carregamento
function hideLoadingOverlay() {
    loadingOverlay.classList.remove('active');
}

// Gera um número aleatório entre min e max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Gera uma cor aleatória
function randomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
}

// Cria um filtro de brilho para o SVG
function createGlowFilter(color) {
    const filterId = 'glow-effect';
    
    // Remove filtro anterior se existir
    const existingFilter = svg.querySelector(`#${filterId}`);
    if (existingFilter) {
        existingFilter.remove();
    }
    
    // Criar novo filtro
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', filterId);
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '2');
    feGaussianBlur.setAttribute('result', 'blur');
    
    const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    feColorMatrix.setAttribute('in', 'blur');
    feColorMatrix.setAttribute('type', 'matrix');
    feColorMatrix.setAttribute('values', '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0');
    feColorMatrix.setAttribute('result', 'glow');
    
    const feFlood = document.createElementNS('http://www.w3.org/2000/svg', 'feFlood');
    feFlood.setAttribute('flood-color', color);
    feFlood.setAttribute('result', 'color');
    
    const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite.setAttribute('in', 'color');
    feComposite.setAttribute('in2', 'glow');
    feComposite.setAttribute('operator', 'in');
    feComposite.setAttribute('result', 'glow-colored');
    
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'glow-colored');
    
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feColorMatrix);
    filter.appendChild(feFlood);
    filter.appendChild(feComposite);
    filter.appendChild(feMerge);
    
    const defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    if (!svg.querySelector('defs')) {
        svg.appendChild(defs);
    }
    
    defs.appendChild(filter);
    
    return filterId;
}

// Adiciona ruído digital ao SVG
function addNoiseEffect(count, size) {
    const width = parseInt(svg.getAttribute('width'));
    const height = parseInt(svg.getAttribute('height'));
    let noise = '';
    
    for (let i = 0; i < count; i++) {
        const x = random(0, width);}}