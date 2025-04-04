// Garantir que todos os elementos DOM estão acessíveis após o carregamento
document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('pattern-svg');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    const elementsInput = document.getElementById('elements');
    const sizeInput = document.getElementById('size');
    const complexityInput = document.getElementById('complexity');
    const rotationInput = document.getElementById('rotation');
    const colorThemeSelect = document.getElementById('color-theme');
    const glowEffectToggle = document.getElementById('glow-effect');
    const animationToggle = document.getElementById('animation-toggle');
    const noiseToggle = document.getElementById('noise-toggle');
    const gridToggle = document.getElementById('grid-toggle');
    const transparencyInput = document.getElementById('transparency');
    const generateBtn = document.getElementById('generate-btn');
    const randomizeBtn = document.getElementById('randomize-btn');
    const downloadBtn = document.getElementById('download-btn');
    const presetBtns = document.querySelectorAll('.preset-btn');

    // Função para sanitização de entradas, prevenindo XSS
    const sanitizeInput = (input) => {
        return input.replace(/[^a-zA-Z0-9-_ ]/g, ''); // Permite apenas caracteres alfanuméricos e alguns especiais
    };

    // Função para mostrar overlay de carregamento
    function showLoadingOverlay() {
        loadingOverlay.classList.add('active');
    }

    // Função para esconder overlay de carregamento
    function hideLoadingOverlay() {
        loadingOverlay.classList.remove('active');
    }

    // Função para desenhar o padrão SVG com base nos inputs
    function generatePattern(patternType, elements, size, complexity, rotation, transparency) {
        svg.innerHTML = ''; // Limpa o conteúdo SVG antes de gerar um novo

        // Exemplo simples de como desenhar o padrão baseado nos parâmetros
        const width = svg.getAttribute('width');
        const height = svg.getAttribute('height');

        const colors = {
            primary: '#00a2ff',
            secondary: '#00ffe1',
            accent: '#ff00d4',
            background: '#051b2c'
        };

        // Desenha elementos no SVG (exemplo básico de círculos)
        for (let i = 0; i < elements; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', Math.random() * width);
            circle.setAttribute('cy', Math.random() * height);
            circle.setAttribute('r', size);
            circle.setAttribute('fill', colors.primary);
            circle.setAttribute('opacity', transparency / 100);

            // Adiciona rotação ao padrão
            const rotateX = Math.random() * width;
            const rotateY = Math.random() * height;
            circle.setAttribute('transform', `rotate(${rotation}, ${rotateX}, ${rotateY})`);
            
            svg.appendChild(circle);
        }

        // Aplicar animações e efeitos conforme as opções
        if (glowEffectToggle.checked) {
            svg.classList.add('glow-filter');
        }

        if (animationToggle.checked) {
            svg.classList.add('animated-pulse');
        }

        if (gridToggle.checked) {
            drawGrid();
        }
    }

    // Função para desenhar uma grade no SVG
    function drawGrid() {
        const width = svg.getAttribute('width');
        const height = svg.getAttribute('height');
        const gridSpacing = 50;

        for (let x = 0; x < width; x += gridSpacing) {
            for (let y = 0; y < height; y += gridSpacing) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x);
                line.setAttribute('y1', 0);
                line.setAttribute('x2', x);
                line.setAttribute('y2', height);
                line.setAttribute('stroke', 'rgba(0, 162, 255, 0.2)');
                line.setAttribute('stroke-width', 0.5);
                svg.appendChild(line);

                const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line2.setAttribute('x1', 0);
                line2.setAttribute('y1', y);
                line2.setAttribute('x2', width);
                line2.setAttribute('y2', y);
                line2.setAttribute('stroke', 'rgba(0, 162, 255, 0.2)');
                line2.setAttribute('stroke-width', 0.5);
                svg.appendChild(line2);
            }
        }
    }

    // Evento para gerar o padrão com base nas entradas
    generateBtn.addEventListener('click', () => {
        try {
            const patternType = sanitizeInput(document.getElementById('pattern-type').value);
            const elements = parseInt(elementsInput.value);
            const size = parseInt(sizeInput.value);
            const complexity = parseInt(complexityInput.value);
            const rotation = parseInt(rotationInput.value);
            const transparency = parseInt(transparencyInput.value);

            if (isNaN(elements) || isNaN(size) || isNaN(complexity)) {
                alert('Por favor, insira valores válidos.');
                return;
            }

            showLoadingOverlay();
            generatePattern(patternType, elements, size, complexity, rotation, transparency);
            hideLoadingOverlay();
        } catch (error) {
            console.error('Erro ao gerar padrão:', error);
            alert('Ocorreu um erro inesperado.');
            hideLoadingOverlay();
        }
    });

    // Função para gerar um padrão aleatório
    function generateRandomPattern() {
        const patternType = 'circuit'; // Exemplo de tipo de padrão aleatório
        const elements = Math.floor(Math.random() * (300 - 10 + 1)) + 10;
        const size = Math.floor(Math.random() * (50 - 2 + 1)) + 2;
        const complexity = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        const rotation = Math.floor(Math.random() * 360);
        const transparency = Math.floor(Math.random() * (80 - 0 + 1)) + 0;

        showLoadingOverlay();
        generatePattern(patternType, elements, size, complexity, rotation, transparency);
        hideLoadingOverlay();
    }

    // Evento para o botão "Gerar Aleatório"
    randomizeBtn.addEventListener('click', generateRandomPattern);

    // Função para o download do SVG gerado
    downloadBtn.addEventListener('click', () => {
        const svgContent = svg.outerHTML;
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'pattern.svg';
        link.click();
    });

    // Função para aplicar um preset
    function applyPreset(presetName) {
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
            }
        };

        const preset = presets[presetName];
        if (!preset) return;

        showLoadingOverlay();

        setTimeout(() => {
            document.getElementById('pattern-type').value = preset.type;
            elementsInput.value = preset.elements;
            sizeInput.value = preset.size;
            complexityInput.value = preset.complexity;
            rotationInput.value = preset.rotation;
            transparencyInput.value = preset.transparency;

            colorThemeSelect.value = preset.colorTheme;
            glowEffectToggle.checked = preset.glow;
            animationToggle.checked = preset.animation;
            noiseToggle.checked = preset.noise;
            gridToggle.checked = preset.grid;

            generatePattern(preset.type, preset.elements, preset.size, preset.complexity, preset.rotation, preset.transparency);

            hideLoadingOverlay();
        }, 300);
    }

    // Atualizar a porcentagem exibida para o controle de transparência
transparencyInput.addEventListener('input', () => {
    transparencyValue.textContent = transparencyInput.value; // Atualiza a visualização da porcentagem
});


    // Eventos para os botões de preset
    presetBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const presetName = btn.getAttribute('data-preset');
            applyPreset(presetName);
        });
    });
});
